import { Button } from "@/components/ui/button";
import { UserRole } from "@/constants/enums";
import { getUsers } from "@/lib/db/user";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import DeleteUserButton from "./_components/DeleteUserButton";

const UsersPage = async () => {
  const token = (await cookies()).get("access_token")?.value;
  const users = await getUsers(token);
  return (
    <div className="bg-white p-5 rounded-[14px] space-y-5">
        <h2 className="text-[20px] leading-[26px] font-semibold text-[#1E293B]">
          All Users
        </h2>

      <table className="admin-custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Joined</th>
            <th>Role</th>
            <th>Books Borrowed</th>
            <th>University ID No </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user, index) => (
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
                <td>
                  <span
                    className={`flex items-center w-fit h-6 px-2.5 font-[500] capitalize rounded-2xl ${
                      user.role === UserRole.ADMIN
                        ? "bg-[#ECFDF3] text-[#027A48]"
                        : "bg-[#FDF2FA] text-[#C11574]"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>{user.borrow_requests_count ?? "0"}</td>
                <td>{user.university_id}</td>
                <td>
                  <DeleteUserButton userType={user.role} userId={user.id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
