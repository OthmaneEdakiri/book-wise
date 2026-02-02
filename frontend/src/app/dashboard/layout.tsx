import React from "react";
import Header from "./_components/header";
import SideBar from "./_components/sidebar";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-[#F8F8FF]">
      <div className="w-[288px] bg-white h-screen sticky top-0">
        <div className="p-4 flex flex-col justify-between h-full">
          <SideBar />
        </div>
      </div>
      <div className="flex-1 ps-6 pe-[30px] pb-20 min-h-screen border border-[#EDF1F1">
        <Header />
        {children}
      </div>
    </div>
  );
}
