import Plus from "@/components/icons/admin/Plus";
import { Pages, Routes } from "@/constants/enums";
import Link from "next/link";
import React from "react";

const AddBookCard = () => {
  return (
    <Link
      className="rounded-[10px] h-[76px] px-4 w-full flex items-center gap-3.5 bg-[#F8F8FF] shadow-[0px_1px_2px_0px_#1823220D]"
      href={`/${Routes.DASHBOARD}/${Pages.BOOKS}/${Pages.CREATE}`}
    >
      <div className="h-12 w-12 rounded-[50%] bg-white flex justify-center items-center">
        <Plus />
      </div>
        <span className="text-[18px] leading-[24px] tracking-[-2%] font-[500] text-[#1E293B]">Add New Book</span>
    </Link>
  );
};

export default AddBookCard;
