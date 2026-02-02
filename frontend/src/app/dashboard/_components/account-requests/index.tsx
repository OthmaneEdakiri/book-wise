import { Pages, Routes, UserStatus } from "@/constants/enums";
import { getUsers } from "@/lib/db/user";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import AccountRequestCard from "./AccountRequestCard";
import { User } from "@/types/user";

const AccountRequests = async () => {
  const token = (await cookies()).get("access_token")?.value;
  const users = await getUsers(token);
  const pendingAccounts = users
    .filter((user: User) => user.status === UserStatus.PENDING)
    .slice(0, 6);
  return (
    <div className="relative max-h-[344px] p-4 bg-white rounded-[14px] space-y-3.5 overflow-hidden">
      <div className="flex justify-between items-center">
        <div className="text-[20px] leading-[26px] font-semibold">
          Account Requests
        </div>
        <Link
          className={`bg-[#F8F8FF] text-[#25388C] h-9 px-3 flex items-center font-semibold text-[14px] leading-[20px] rounded-[6px]`}
          href={`/${Routes.DASHBOARD}/${Pages.ACCOUNT_REQUESTS}`}
        >
          View all
        </Link>
      </div>

      {pendingAccounts.length > 0 ? (
        <div className="grid grid-cols-3 gap-2.5">
          {pendingAccounts.map((acc: User, index: Number) => (
            <AccountRequestCard key={index.toString()} account={acc} />
          ))}

          {pendingAccounts.length >= 4 && (
            <div
              className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)",
              }}
            />
          )}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="pt-9 pb-16">
      <div className="max-w-[430px] mx-auto space-y-2 text-center">
        <h2 className="font-semibold">No Pending Account Requests</h2>
        <p className="text-[#64748B] text-[14px]">
          There are currently no account requests awaiting approval.
        </p>
      </div>
    </div>
  );
};

export default AccountRequests;
