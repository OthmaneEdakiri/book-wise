import { Pages, Routes } from "@/constants/enums";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SelectStatus from "./_components/SelectStatus";
import { getAllBorrowRequests } from "@/lib/db/borrow-request";
import { cookies } from "next/headers";
import Pagination from "../_components/Pagination";
import { BorrowRequestWithRelation } from "@/types/borrow-request";

const borrowRequestsPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const token = (await cookies()).get("access_token")?.value;
  const { page } = await searchParams;
  const data = await getAllBorrowRequests(Number(page) || 1, token);
  const borrowRequests = data.data;

  return (
    <div className="bg-white p-5 rounded-[14px] space-y-5">
      <h2 className="text-[20px] leading-[26px] font-semibold text-[#1E293B]">
        Borrow Book Requests
      </h2>

      <table className="admin-custom-table">
        <thead>
          <tr>
            <th>Book</th>
            <th>User Requested</th>
            <th>Status</th>
            <th>Borrowed date</th>
            <th>Due Date</th>
            <th>Return date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(borrowRequests) && borrowRequests.length > 0 ? (
            borrowRequests.map((br, index) => (
              <BorrowRequestDetails br={br} key={index} />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                There is no borrow requests to diplay
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        path={`/${Routes.DASHBOARD}/${Pages.BORROW_REQUESTS}`}
        meta={data.meta}
      />
    </div>
  );
};

const BorrowRequestDetails = ({ br }: { br: BorrowRequestWithRelation }) => {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-1.5">
          <div className="w-[29px] h-[40px] relative">
            <Image alt="" fill={true} src={br.book?.image || ""} />
          </div>

          <Link
            className="hover:underline"
            href={`/${Routes.DASHBOARD}/${Pages.BOOKS}/${br.book.id}`}
          >
            {br.book.title}
          </Link>
        </div>
      </td>
      <td className="flex items-center gap-2">
        <div className="h-[40px] w-[40px] relative rounded-[50%] overflow-hidden">
          <Image src={br.user.profile_image} alt="" fill={true} />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold tracking-[-1%] text-[14px] leading-[20px]">
            {br.user.firstname} {br.user.lastname}
          </span>
          <span className="text-[#64748B] tracking-[-1%] text-[14px] leading-[20px]">
            {br.user.email}
          </span>
        </div>
      </td>
      <td>
        <SelectStatus currentStatus={br.status} borrowId={br.id} />
      </td>
      <td>
        {br.borrowed_date
          ? new Date(br.borrowed_date).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })
          : "___"}
      </td>
      <td>
        {br.due_date
          ? new Date(br.due_date).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })
          : "___"}
      </td>
      <td>
        {br.return_date
          ? new Date(br.return_date).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })
          : "___"}
      </td>
    </tr>
  );
};

export default borrowRequestsPage;
