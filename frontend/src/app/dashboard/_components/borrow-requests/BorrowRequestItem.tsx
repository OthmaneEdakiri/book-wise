import Calendar from "@/components/icons/Calendar";
import CalendarDays from "@/components/icons/admin/CalendarDays";
import { BorrowRequestWithRelation } from "@/types/borrow-request";
import Image from "next/image";
import React from "react";

const BorrowRequestItem = ({ borrowRequest }: { borrowRequest: BorrowRequestWithRelation }) => {
  return (
    <div className="px-4 py-3.5 bg-[#F8F8FF] rounded-[10px] border border-[#F8F8FF] shadow-[0px_1px_2px_0px_#1823220D] flex gap-3.5">
      <div className="h-[76px] w-[55px] relative">
        <Image fill={true} src={borrowRequest.book.image} alt="Book image" />
      </div>
      <div className="">
        <h2 className="font-semibold mb-2">{borrowRequest.book.title}</h2>
        <div className="text-[14px] text-[#64748B] leading-[14px] mb-3">
          by {borrowRequest.book.author} . {borrowRequest.book.genre}
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-0.5">
            <div className="h-[18px] w-[18px] relative rounded-[50%] overflow-hidden">
              <Image
                src={borrowRequest.user.profile_image}
                alt="user image"
                fill={true}
              />
            </div>
            <span className="text-[14px] text-[#3A354E] leading-[14px]">
              {borrowRequest.user.firstname} {borrowRequest.user.lastname}
            </span>
          </div>

          <div className="flex items-center gap-0.5">
            <CalendarDays />

            <span className="text-[12px] text-[#3A354E]">
              {new Date(borrowRequest.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowRequestItem;
