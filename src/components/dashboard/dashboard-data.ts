import {
  getMyBookingsData,
  getMyListingsData,
  getMyOrdersData,
} from "@/components/data/getData";
import type { BookingStatus } from "@/components/type/booking.type";
import type { IStudio } from "@/components/type/studio.type";

export type DashboardOrder = {
  id: string;
  creator: string;
  creatorEmail: string;
  studioTitle: string;
  studioLocation: string;
  startAt: string | null;
  durationHours: number | null;
  guestCount: number | null;
  totalPrice: number | null;
  status: BookingStatus;
};

export type DashboardData = {
  listingCount: number | null;
  bookingCount: number | null;
  incomingOrders: DashboardOrder[];
  pendingOrderCount: number | null;
  confirmedOrderCount: number | null;
  orderLoadError: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeStatus(value: unknown): BookingStatus | null {
  if (typeof value !== "string") return null;
  switch (value.trim().toLowerCase()) {
    case "pending":
      return "Pending";
    case "confirmed":
      return "Confirmed";
    case "completed":
      return "Completed";
    case "cancelled":
    case "canceled":
      return "Cancelled";
    default:
      return null;
  }
}

function asString(...values: unknown[]): string {
  const value = values.find(
    (candidate): candidate is string =>
      typeof candidate === "string" && candidate.trim().length > 0,
  );
  return value?.trim() ?? "";
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asDateString(value: unknown): string | null {
  if (isRecord(value) && typeof value.$date === "string") {
    return asDateString(value.$date);
  }
  if (!(value instanceof Date) && typeof value !== "string") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function asId(value: unknown): string {
  if (typeof value === "string") return value;
  if (!isRecord(value)) return "";
  if (typeof value.$oid === "string") return value.$oid;
  if ("toString" in value && typeof value.toString === "function") {
    const id = value.toString();
    return id === "[object Object]" ? "" : id;
  }
  return "";
}

function getNestedRecord(
  value: Record<string, unknown>,
  key: string,
): Record<string, unknown> {
  const nested = value[key];
  return isRecord(nested) ? nested : {};
}

function getListingCount(value: IStudio[] | IStudio | null): number | null {
  if (Array.isArray(value)) return value.length;
  if (value && typeof value === "object" && "_id" in value) return 1;
  return value === null ? null : 0;
}

function toDashboardOrder(value: unknown): DashboardOrder | null {
  if (!isRecord(value)) return null;

  const studio = getNestedRecord(value, "studio");
  const creatorObject = getNestedRecord(value, "user");
  const status = normalizeStatus(value.status);
  const id = asId(value._id) || asId(value.id);
  if (!id || !status) return null;

  const durationHours = asNumber(value.durationHours);
  const hourlyRate = asNumber(studio.hourlyRate) ?? asNumber(value.hourlyRate);

  return {
    id,
    creator:
      asString(
        value.guestName,
        value.bookedby,
        value.creator,
        creatorObject.name,
      ) || "Creator",
    creatorEmail: asString(value.guestEmail, value.email, creatorObject.email),
    studioTitle:
      asString(value.studioTitle, studio.title, value.title) || "Studio",
    studioLocation: asString(
      value.studioLocation,
      studio.location,
      value.location,
    ),
    startAt: asDateString(value.startAt),
    durationHours,
    guestCount: asNumber(value.guestCount),
    totalPrice:
      asNumber(value.totalPrice) ??
      (hourlyRate !== null && durationHours !== null
        ? hourlyRate * durationHours
        : null),
    status,
  };
}

function getRecords(value: unknown): unknown[] | null {
  if (Array.isArray(value)) return value;
  if (!isRecord(value)) return null;
  if (Array.isArray(value.data)) return value.data;
  if (Array.isArray(value.orders)) return value.orders;
  if (Array.isArray(value.bookings)) return value.bookings;
  return null;
}

export async function getDashboardData(email: string): Promise<DashboardData> {
  const normalizedEmail = email.trim().toLocaleLowerCase();
  const [listingsResult, bookingsResult, ordersResult] =
    await Promise.allSettled([
      getMyListingsData(normalizedEmail),
      getMyBookingsData(normalizedEmail),
      getMyOrdersData(normalizedEmail),
    ]);

  const listingCount =
    listingsResult.status === "fulfilled"
      ? getListingCount(listingsResult.value)
      : null;
  const bookingRecords =
    bookingsResult.status === "fulfilled"
      ? getRecords(bookingsResult.value)
      : null;
  const orderRecords =
    ordersResult.status === "fulfilled"
      ? getRecords(ordersResult.value)
      : null;

  if (bookingRecords === null || orderRecords === null) {
    const error =
      bookingsResult.status === "rejected"
        ? bookingsResult.reason
        : ordersResult.status === "rejected"
          ? ordersResult.reason
          : new Error("The booking API returned an unexpected response.");
    console.error("getDashboardData: unable to load booking data:", error);

    return {
      listingCount,
      bookingCount: bookingRecords?.length ?? null,
      incomingOrders: [],
      pendingOrderCount: null,
      confirmedOrderCount: null,
      orderLoadError: "Unable to load your booking activity right now.",
    };
  }

  const incomingOrders = orderRecords
    .map(toDashboardOrder)
    .filter(
      (order): order is DashboardOrder =>
        order !== null && order.status !== "Cancelled",
    );

  return {
    listingCount,
    bookingCount: bookingRecords.length,
    incomingOrders,
    pendingOrderCount: incomingOrders.filter(
      (order) => order.status === "Pending",
    ).length,
    confirmedOrderCount: incomingOrders.filter(
      (order) => order.status === "Confirmed",
    ).length,
    orderLoadError: "",
  };
}
