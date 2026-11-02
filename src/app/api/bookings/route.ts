import { ObjectId } from "mongodb";
import { headers } from "next/headers";

import { getStudioById } from "@/components/data/getData";
import { db, auth } from "@/lib/auth";

export const runtime = "nodejs";

const bookings = db.collection("bookings");

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return Response.json({ error: "Authentication required." }, { status: 401 });
  }

  try {
    const guestEmail = session.user.email.trim().toLocaleLowerCase();
    const records = await bookings
      .find({ guestEmail })
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(
      records.map((booking) => ({
        ...booking,
        _id: booking._id.toString(),
        startAt: booking.startAt.toISOString(),
        endAt: booking.endAt.toISOString(),
        createdAt: booking.createdAt.toISOString(),
        cancelledAt: booking.cancelledAt?.toISOString(),
      })),
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    console.error("GET /api/bookings failed:", error);
    return Response.json(
      { error: "Unable to load bookings." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return Response.json({ error: "Authentication required." }, { status: 401 });
  }

  let payloadValue: unknown;
  try {
    payloadValue = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request." }, { status: 400 });
  }

  if (
    !payloadValue ||
    typeof payloadValue !== "object" ||
    Array.isArray(payloadValue)
  ) {
    return Response.json({ error: "Invalid booking request." }, { status: 400 });
  }

  const payload = payloadValue as Record<string, unknown>;
  const studioId =
    typeof payload.studioId === "string" ? payload.studioId.trim() : "";
  const startAtValue =
    typeof payload.startAt === "string" ? payload.startAt : "";
  const durationHours = Number(payload.durationHours);
  const guestCount = Number(payload.guestCount);
  const startAt = new Date(startAtValue);

  if (
    !studioId ||
    !startAtValue ||
    !Number.isFinite(startAt.getTime()) ||
    !Number.isInteger(durationHours) ||
    durationHours < 1 ||
    durationHours > 12 ||
    !Number.isInteger(guestCount) ||
    guestCount < 1
  ) {
    return Response.json(
      { error: "Please provide a valid date, duration, and guest count." },
      { status: 400 },
    );
  }

  if (startAt.getTime() <= Date.now()) {
    return Response.json(
      { error: "Choose a future date and time." },
      { status: 400 },
    );
  }

  try {
    const studio = await getStudioById(studioId);

    if (!studio) {
      return Response.json({ error: "Studio not found." }, { status: 404 });
    }

    if (guestCount > studio.maxCapacity) {
      return Response.json(
        { error: `This studio allows up to ${studio.maxCapacity} guests.` },
        { status: 400 },
      );
    }

    const endAt = new Date(
      startAt.getTime() + durationHours * 60 * 60 * 1000,
    );
    const overlappingBooking = await bookings.findOne({
      studioId,
      status: { $in: ["Pending", "Confirmed"] },
      startAt: { $lt: endAt },
      endAt: { $gt: startAt },
    });

    if (overlappingBooking) {
      return Response.json(
        { error: "This studio already has a booking during that time." },
        { status: 409 },
      );
    }

    const guestEmail = session.user.email.trim().toLocaleLowerCase();
    const booking = {
      studioId,
      studioTitle: studio.title,
      studioImageUrl: studio.imageUrl ?? "",
      studioLocation: studio.location,
      guestName: session.user.name,
      guestEmail,
      ownerEmail: studio.ownerEmail?.trim().toLocaleLowerCase() ?? "",
      startAt,
      endAt,
      durationHours,
      guestCount,
      hourlyRate: studio.hourlyRate,
      totalPrice: studio.hourlyRate * durationHours,
      status: "Pending" as const,
      createdAt: new Date(),
    };

    const result = await bookings.insertOne(booking);

    return Response.json(
      {
        ...booking,
        _id: result.insertedId.toString(),
        startAt: startAt.toISOString(),
        endAt: endAt.toISOString(),
        createdAt: booking.createdAt.toISOString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/bookings failed:", error);
    return Response.json(
      { error: "Unable to create the booking. Please try again." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return Response.json({ error: "Authentication required." }, { status: 401 });
  }

  let payloadValue: unknown;
  try {
    payloadValue = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request." }, { status: 400 });
  }

  if (
    !payloadValue ||
    typeof payloadValue !== "object" ||
    Array.isArray(payloadValue)
  ) {
    return Response.json(
      { error: "Invalid cancellation request." },
      { status: 400 },
    );
  }

  const payload = payloadValue as Record<string, unknown>;
  if (
    !["cancel", "confirmed", "completed", "cancelled"].includes(
      String(payload.action),
    ) ||
    typeof payload.bookingId !== "string" ||
    !ObjectId.isValid(payload.bookingId)
  ) {
    return Response.json(
      { error: "Invalid booking status request." },
      { status: 400 },
    );
  }

  try {
    const email = session.user.email.trim().toLocaleLowerCase();
    const bookingId = new ObjectId(payload.bookingId);
    const action = payload.action;
    const isHostAction =
      action === "confirmed" || action === "completed" || action === "cancelled";
    const fromStatuses =
      action === "confirmed"
        ? ["Pending"]
        : action === "completed"
          ? ["Confirmed"]
          : action === "cancelled"
            ? ["Pending", "Confirmed"]
            : ["Pending"];

    const result = await bookings.updateOne(
      {
        _id: bookingId,
        ...(isHostAction ? { ownerEmail: email } : { guestEmail: email }),
        status: { $in: fromStatuses },
      },
      {
        $set: {
          status: action === "cancel" ? "Cancelled" : action,
          ...(action === "cancel" || action === "cancelled"
            ? { cancelledAt: new Date() }
            : {}),
          ...(action === "completed" ? { completedAt: new Date() } : {}),
        },
      },
    );

    if (result.matchedCount === 0) {
      return Response.json(
        {
          error: isHostAction
            ? "Order not found or it is no longer in the required status."
            : "Pending booking not found for this account.",
        },
        { status: 404 },
      );
    }

    return Response.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error("PATCH /api/bookings failed:", error);
    return Response.json(
      { error: "Unable to cancel the booking. Please try again." },
      { status: 500 },
    );
  }
}
