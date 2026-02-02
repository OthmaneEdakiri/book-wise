import { Pages, Routes } from "@/constants/enums";
import Link from "next/link";
import React from "react";
import BorrowRequestItem from "./BorrowRequestItem";
import { BorrowRequestWithRelation } from "@/types/borrow-request";

const BorrowRequests = async ({
  borrowRequests,
}: {
  borrowRequests: BorrowRequestWithRelation[];
}) => {
  return (
    <div className="relative max-h-[390px] p-4 bg-white rounded-[14px] space-y-3.5 overflow-hidden">
      <div className="flex justify-between items-center">
        <div className="text-[20px] leading-[26px] font-semibold">
          Borrow Requests
        </div>
        <Link
          className={`bg-[#F8F8FF] text-[#25388C] h-9 px-3 flex items-center font-semibold text-[14px] leading-[20px] rounded-[6px]`}
          href={`/${Routes.DASHBOARD}/${Pages.BORROW_REQUESTS}`}
        >
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {borrowRequests.length > 0 ? (
          borrowRequests.map((br: BorrowRequestWithRelation) => (
            <BorrowRequestItem key={br.id} borrowRequest={br} />
          ))
        ) : (
          <NotFound />
        )}
      </div>

      {borrowRequests.length >= 3 && (
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)",
          }}
        />
      )}
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="pt-9 pb-16">
      <div className="max-w-[430px] mx-auto space-y-2 text-center">
        <h2 className="font-semibold">No Pending Book Requests</h2>
        <p className="text-[#64748B] text-[14px]">
          There are no borrow book requests awaiting your review at this time.
        </p>
      </div>
    </div>
  );
};

export default BorrowRequests;
