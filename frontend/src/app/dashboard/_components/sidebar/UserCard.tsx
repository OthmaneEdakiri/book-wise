"use client";
import LogOut from "@/components/icons/LogOut";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Pages } from "@/constants/enums";
import { logoutAction } from "@/lib/actions/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const UserCard = ({
  firstName,
  lastName,
  profileImage,
  email,
}: {
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  email: string | null;
}) => {
  const router = useRouter();

  const logoutHandler = async () => {
    const res = await logoutAction();
    if (res.status === 204) {
      toast.success("You are logout successusfully");
      router.push(`/${Pages.LOGIN}`);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div
      style={{ boxShadow: "0px 1px 2px 0px #1823220D" }}
      className="rounded-[62px] px-3 h-[64px] border border-[#EDF1F1] flex justify-between items-center"
    >
      <div className="relative h-[48px] w-[48px]">
        <span className="bg-[#2CC974] h-3 w-3 absolute rounded-[50%] right-0 bottom-0 z-10"></span>
        {profileImage ? (
          <Image
            className="rounded-[50%]"
            src={profileImage}
            fill={true}
            alt=""
          />
        ) : (
          <Skeleton className="h-full w-full" />
        )}
      </div>
      <div className="space-y-1">
        <h2 className="text-[#1E293B] font-[500] leading-[100%]">
          {firstName} {lastName}
        </h2>
        <span className="text-[14px] leading-[100%] text-[#8D8D8D]">
          {email}
        </span>
      </div>
      <Button
        onClick={logoutHandler}
        className="cursor-pointer"
        variant={"link"}
        type="button"
      >
        <LogOut className="transform scale-150" />
      </Button>
    </div>
  );
};

export default UserCard;
