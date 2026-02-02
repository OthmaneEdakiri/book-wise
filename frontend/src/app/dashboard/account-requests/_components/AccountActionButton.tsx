"use client";
import X from "@/components/icons/admin/X";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UserRole, UserStatus } from "@/constants/enums";
import { updateUserStatusAction } from "@/lib/actions/user";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const AccountActionButton = ({
  current_status,
  userId,
  type,
}: {
  current_status: UserStatus;
  userId: string;
  type: UserRole;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateStatusHandler = async () => {
    setIsLoading(true);
    const res = await updateUserStatusAction(userId, type, current_status);

    if (res.status === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setTimeout(() => setIsLoading(false), 600);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {isLoading ? (
          <Loader2 className="!w-7 !h-7 animate-spin" />
        ) : (
          <Button
            className={`px-3 rounded-[6px] font-[600] ${
              current_status !== UserStatus.APPROVED
                ? "bg-[#ECFDF3] text-[#027A48] hover:bg-[#D1F7E0] hover:text-[#027A48]"
                : "bg-[#FDF2FA] text-[#C11574] hover:bg-[#F8DFF0] hover:text-[#C11574]"
            }`}
          >
            {current_status !== UserStatus.APPROVED
              ? "Approve Account"
              : "Revoke Account"}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[20px] leading-[26px] font-semibold text-center">
            {current_status !== UserStatus.APPROVED
              ? "Approve Book Request"
              : "Deny Account Request"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[16px] leading-[24px] text-center">
            {current_status !== UserStatus.APPROVED
              ? "Approve the student’s account request and grant access. Aconfirmation email will be sent upon approval."
              : "Denying this request will notify the student they’re not eligible due to unsuccessful ID card verification."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={() => setOpen(false)}
            variant={"link"}
            size={"icon"}
            className="absolute right-5 top-5"
          >
            <X />
          </Button>
          <AlertDialogAction
            onClick={updateStatusHandler}
            className={`w-full h-[52px] rounded-[12px] text-[16px] font-bold leading-[24px] text-[#F8FAFC] ${
              current_status !== UserStatus.APPROVED
                ? "bg-[#4C7B62] hover:bg-[#4C7B62]"
                : "bg-[#F46F70] hover:bg-[#F46F70]"
            }`}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AccountActionButton;
