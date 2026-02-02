"use client";
import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/enums";
import { logoutAction } from "@/lib/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import LogOut from "@/components/icons/LogOut";

const AuthLinks = ({
  firstname,
  lastname,
}: {
  firstname: string | null;
  lastname: string | null;
}) => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      const res = await logoutAction();
      if (res.status === 204) {
        toast.success("You are logout successusfully");
        router.push(`/${Pages.LOGIN}`);
      }

      if (res.status === 500) {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <li>
        <Link href={`/${Pages.PROFILE}`} className="flex items-center gap-1.5">
          <span className="uppercase h-8 w-8 rounded-[50%] flex items-center justify-center bg-[#A5DEEF] text-[#0b0d16] font-semibold">
            {firstname && lastname ? `${firstname[0]}${lastname[0]}` : "AB"}
          </span>
          <span className="text-[20px] leading-[32px] font font-semibold">
            {firstname ? firstname : "name"}
          </span>
        </Link>
      </li>
      <li>
        <Button
          onClick={logoutHandler}
          className="cursor-pointer"
          variant={"link"}
          type="button"
        >
          <LogOut className="transform scale-150" />
        </Button>
      </li>
    </>
  );
};

export default AuthLinks;
