export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export type Booking = {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImageUrl: string;
  studioLocation: string;
  guestName: string;
  guestEmail: string;
  ownerEmail: string;
  startAt: string;
  endAt: string;
  durationHours: number;
  guestCount: number;
  hourlyRate: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
};
