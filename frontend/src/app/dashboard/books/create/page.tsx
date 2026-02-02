"use client";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import Link from "next/link";
import React from "react";
import BookForm from "../_components/BookForm";
import MoveLeft from "@/components/icons/admin/MoveLeft";

const CreateBookPage = () => {
  return (
    <div className="space-y-10">
      <Link
        className={`${buttonVariants({
          variant: "outline",
        })} h-10 border-none shadow-none! text-[#3A354E] font-[500] text-[14px] tracking-[-1%] leading-[20px]`}
        href={`/${Routes.DASHBOARD}/${Pages.BOOKS}`}
      >
        <MoveLeft />
        Go back
      </Link>

      {/* <CreateForm /> */}
      <BookForm type="CREATE" />
    </div>
  );
};

export default CreateBookPage;
