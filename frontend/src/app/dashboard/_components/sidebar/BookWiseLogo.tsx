import BookWise from "@/components/icons/admin/BookWise";
import { Routes } from "@/constants/enums";
import Link from "next/link";
import React from "react";

const BookWiseLogo = () => {
  return (
    <Link href={`/${Routes.DASHBOARD}`} className="flex items-center gap-[5px] h-[77px]">
      <BookWise />
      <span className="text-[26px] leading-[24px] font-semibold text-[#25388C]">BookWise</span>
    </Link>
  );
};

export default BookWiseLogo;
