import Search from "@/components/icons/admin/Search";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

      <div className="relative w-full max-w-[450px]">
        <Label
          htmlFor="searsh-input"
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
        >
          <Search />
        </Label>

        <Input
          className="w-full h-[52px] ps-[52px] text-[16px] placeholder:text-[16px] leading-[24px] border-[#CBD5E1] text-[#64748B] bg-[#F9FAFB] shadow-none"
          id="searsh-input"
          type="text"
          placeholder="Search users, books by title, author, or genre."
        />
      </div>
    </div>
  );
};

export default Header;
