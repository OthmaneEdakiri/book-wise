import Link from "next/link";
import React from "react";
import BookWise from "./icons/BookWise";

const BookWiseLogo = () => {
  return (
    <Link href={'/'} className="logo flex gap-1.5 items-center">
        <BookWise />

      <span className="text-white font-semibold text-[28px] leading-[24px]">
        BookWise
      </span>
    </Link>
  );
};

export default BookWiseLogo;
