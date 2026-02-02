import { User } from "@/types/user";
import Image from "next/image";
import React from "react";

const AccountRequestCard = ({ account }: { account: User }) => {
  return (
    <div className="py-3.5 px-3 flex flex-col items-center gap-3 text-center border border-[#F8F8FF] bg-[#F8F8FF] shadow-[0px_1px_2px_0px_#1823220D]">
      <div className="h-12 w-12 relative rounded-[50%] overflow-hidden">
        <Image src={account.profile_image} alt="profile image" fill={true} />
      </div>
      <div className="">
        <h3 className="font-[500] leading-[22px]">{account.firstname} {account.lastname}</h3>
        <p className="text-[14px] text-[#64748B]">{account.email}</p>
      </div>
    </div>
  );
};

export default AccountRequestCard;
