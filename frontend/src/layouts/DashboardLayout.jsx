import SideNav from "../features/dashboard/components/SideNav";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <main className="w-full min-h-screen flex bg-[#F6F6F6]">
      <section className="flex-shrink-0 w-3xs h-screen sticky top-0 overflow-y-auto">
        <SideNav />
      </section>
      <section className="w-full">
        <Outlet />
      </section>
    </main>
  );
}

export default DashboardLayout;
