import { getDashboardData } from "./dashboard-data";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardProfile } from "./DashboardProfile";
import { DashboardQuickActions } from "./DashboardQuickActions";
import { DashboardStats } from "./DashboardStats";
import { IncomingOrders } from "./IncomingOrders";

type DashboardProps = {
  name: string;
  email: string;
  image?: string | null;
};

export default async function Dashboard({
  name,
  email,
  image,
}: DashboardProps) {
  const dashboardData = await getDashboardData(email);

  return (
    <section className="relative flex-1 overflow-hidden bg-background pb-16 pt-28 md:pb-20 md:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.08),transparent_68%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <DashboardHeader name={name} />
        <DashboardProfile name={name} email={email} image={image} />
        <DashboardStats
          listingCount={dashboardData.listingCount}
          bookingCount={dashboardData.bookingCount}
          pendingOrderCount={dashboardData.pendingOrderCount}
          confirmedOrderCount={dashboardData.confirmedOrderCount}
        />
        <DashboardQuickActions />
        <IncomingOrders
          orders={dashboardData.incomingOrders}
          pendingCount={dashboardData.pendingOrderCount}
          loadError={dashboardData.orderLoadError}
        />
      </div>
    </section>
  );
}
