"use client";
import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/enums";
import { logoutAction } from "@/lib/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import LogOut from "@/components/icons/LogOut";

const LogoutButton = () => {
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
    <Button
      onClick={logoutHandler}
      className="cursor-pointer"
      variant={"link"}
      type="button"
    >
      <LogOut className="transform scale-150" />
      <span className="text-[#d6e0ff] ml-1.5 text-[20px] leading-[32px] md:hidden block">
        Logout
      </span>
    </Button>
  );
};

export default LogoutButton;
