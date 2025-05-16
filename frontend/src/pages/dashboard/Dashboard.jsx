import React from "react";
import SideNav from "./SideNav";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <main className="w-full min-h-screen flex bg-[#F6F6F6]">
      <section className="flex-shrink-0 w-3xs h-screen sticky top-0 overflow-y-auto">
        <SideNav />
      </section>
      <section className="w-full px-4 py-2">
        <Outlet />
      </section>
    </main>
  );
}
