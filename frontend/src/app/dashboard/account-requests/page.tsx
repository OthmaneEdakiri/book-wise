import { getUsers } from "@/lib/db/user";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import AccountActionButton from "./_components/AccountActionButton";
import { UserRole } from "@/constants/enums";

const AccountRequestsPage = async () => {
  const token = (await cookies()).get("access_token")?.value;
  const users = await getUsers(token);
  return (
    <div className="bg-white p-5 rounded-[14px] space-y-5">
        <h2 className="text-[20px] leading-[26px] font-semibold text-[#1E293B]">
          Account Registration Requests
        </h2>

      <table className="admin-custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Joined</th>
            <th>University ID No </th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(users) &&
            users.filter(user=> user.role === UserRole.USER).map((user, index) => (
              <tr key={index}>
                <td className="flex items-center gap-2">
                  <div className="h-[40px] w-[40px] relative rounded-[50%] overflow-hidden">
                    <Image src={user.profile_image} alt="" fill={true} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold tracking-[-1%] text-[14px] leading-[20px]">
                      {user.firstname} {user.lastname}
                    </span>
                    <span className="text-[#64748B] tracking-[-1%] text-[14px] leading-[20px]">
                      {user.email}
                    </span>
                  </div>
                </td>
                <td>
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>

                <td>{user.university_id}</td>
                <td>
                  <AccountActionButton type={user.role} current_status={user.status} userId={user.id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountRequestsPage;
