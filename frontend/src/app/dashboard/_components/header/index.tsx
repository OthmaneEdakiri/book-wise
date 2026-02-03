import { headers } from "next/headers";
import React from "react";

const Header = async () => {
  const firsName = (await headers()).get("x-user-firstname");
  return (
    <div className="h-14 mt-6 mb-10 flex justify-between items-center">
      <div className="">
        <h2 className="text-[#1E293B] text-[24px] leading-[30px] font-semibold">
          Welcome, {firsName}
        </h2>
        <p className="text-[#64748B]">
          Monitor all of your projects and tasks here
        </p>
      </div>
    </div>
  );
};

export default Header;
