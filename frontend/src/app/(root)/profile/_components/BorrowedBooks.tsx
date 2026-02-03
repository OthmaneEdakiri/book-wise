import { BorrowRequestStatus, Pages } from "@/constants/enums";
import { getDaysLeft } from "@/lib/date";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BorrowRequestWithRelation } from "@/types/borrow-request";
import OctagonAlert from "@/components/icons/OctagonAlert";
import BookOpen from "@/components/icons/BookOpen";
import CircleCheck from "@/components/icons/CircleCheck";
import Calendar from "@/components/icons/Calendar";

const BorrowedBooks = async ({
  borrowRequests,
}: {
  borrowRequests: BorrowRequestWithRelation[];
}) => {
  return (
    <div className="xl:w-1/2 w-full space-y-6">
      <h3 className="font-semibold md:text-[30px] text-[24px] mb-6">
        Borrowed books
      </h3>

      {Array.isArray(borrowRequests) && borrowRequests.length > 0 ? (
        <div className="flex flex-wrap xl:justify-start justify-center gap-8">
          {borrowRequests
            .filter((br) => br.status !== BorrowRequestStatus.EXPIRED)
            .map((br) => (
              <BorrowRequestCard key={br.id} borrowRequest={br} />
            ))}
        </div>
      ) : (
        <p>There is no borrow request to display</p>
      )}
    </div>
  );
};

const BorrowRequestCard = ({
  borrowRequest,
}: {
  borrowRequest: BorrowRequestWithRelation;
}) => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #12141D 0%, #12151F 100%)",
      }}
      className="2xl:w-[280px] w-[calc(50%%-16px)] p-5 2xl:space-y-5 space-y-4 rounded-2xl relative"
    >
      {borrowRequest.status === BorrowRequestStatus.OVERDUE && (
        <OctagonAlert className="absolute -top-1 -left-1" />
      )}
      <div className="bg-[#936F4A4D] py-6 rounded-[10px]">
        <div className="2xl:h-[200px] h-[155px] 2xl:w-[144px] w-[115px] relative mx-auto">
          <Image src={borrowRequest.book?.image} alt="" fill={true} />
        </div>
      </div>
      <div className="space-y-2.5">
        <Link
          href={`/${Pages.BOOKS}/${borrowRequest.book.id}`}
          className="text-white hover:underline text-[20px] leading-[24px] font-semibold"
        >
          {borrowRequest.book.title}
        </Link>
        <p className="text-[16px] leading-[20px] italic">
          {borrowRequest.book.genre}
        </p>
      </div>
      <div className="space-y-2.5">
        <div className="flex gap-1 items-center">
          <BookOpen />
          <span>
            {borrowRequest.borrowed_date
              ? `Borrowed on ${new Date(
                  borrowRequest.borrowed_date,
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })}`
              : "Visit library to borrow"}
          </span>
        </div>
        <div className="flex gap-1 items-center">
          <BorrowStatus borrowRequest={borrowRequest} />
        </div>
      </div>
    </div>
  );
};

const BorrowStatus = ({
  borrowRequest,
}: {
  borrowRequest: BorrowRequestWithRelation;
}) => {
  const daysLeft = getDaysLeft(borrowRequest.due_date);

  switch (borrowRequest.status) {
    case BorrowRequestStatus.RETURNED:
      return (
        <>
          <CircleCheck />
          {borrowRequest.return_date && (
            <span>Returned on {formatDate(borrowRequest.return_date)}</span>
          )}
        </>
      );

    case BorrowRequestStatus.BORROWED:
      if (daysLeft === null) return null;
      return (
        <>
          <Calendar />

          <span>
            {daysLeft > 0
              ? `${daysLeft} day${daysLeft > 1 ? "s" : ""} left to due`
              : daysLeft === 0
                ? "Due today"
                : `Overdue by ${Math.abs(daysLeft)} day${
                    Math.abs(daysLeft) > 1 ? "s" : ""
                  }`}
          </span>
        </>
      );

    case BorrowRequestStatus.OVERDUE:
      return (
        <>
          <OctagonAlert className="h-[18px] w-[18px]" />
          <span className="text-[#FF6C6F]">Overdue Return</span>
        </>
      );

    default:
      return null;
  }
};

export default BorrowedBooks;
