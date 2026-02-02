import React, { Suspense } from "react";
import DashboardStats from "./_components/dashboard-stats";
import BorrowRequests from "./_components/borrow-requests";
import RecentlyAddedBooks from "./_components/recently-added-books";
import AccountRequests from "./_components/account-requests";
import DashboardCardLoader from "./_components/DashboardCardLoader";
import { cookies } from "next/headers";
import { getDashboardStats } from "@/lib/db/dashboard";
import { getAllBorrowRequests } from "@/lib/db/borrow-request";
import { BorrowRequestWithRelation } from "@/types/borrow-request";
import { BorrowRequestStatus } from "@/constants/enums";
import { getBooks } from "@/lib/db/book";

const AdminDashboardPage = async () => {
  const token = (await cookies()).get("access_token")?.value;

  if (!token) null;

  const booksData = await getBooks(1, token);
  const books = booksData.data.slice(0, 6);
  const stats = await getDashboardStats(token);
  const borrowRequestsData = await getAllBorrowRequests(1, token);
  const borrowRequests = borrowRequestsData.data
    .filter(
      (br: BorrowRequestWithRelation) =>
        br.status === BorrowRequestStatus.PENDING,
    )
    .slice(0, 3);
  return (
    <div className="space-y-6">
      <DashboardStats stats={stats} />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-[22px]">
          <Suspense fallback={<DashboardCardLoader />}>
            <BorrowRequests borrowRequests={borrowRequests} />
          </Suspense>
          <Suspense fallback={<DashboardCardLoader />}>
            <AccountRequests />
          </Suspense>
        </div>
        <Suspense fallback={<DashboardCardLoader />}>
          <RecentlyAddedBooks books={books} />
        </Suspense>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
