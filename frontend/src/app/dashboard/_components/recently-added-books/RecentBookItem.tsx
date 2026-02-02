import CalendarDays from "@/components/icons/admin/CalendarDays";
import { Book } from "@/types/book";
import Image from "next/image";
import React from "react";

const RecentBookItem = ({ book }: { book: Book }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-[75px] w-[55px] relative">
        <Image src={book.image} alt="" fill={true} />
      </div>
      <div className="">
        <h2 className="font-semibold leading-[130%]">{book.title}</h2>
        <p className="text-[14px] leading-[180%] text-[#64748B]">
          By {book.author} . {book.genre}
        </p>
        <div className="flex items-center gap-0.5">
          <CalendarDays />

          <span className="text-[12px] text-[#3A354E]">
            {new Date(book.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentBookItem;
