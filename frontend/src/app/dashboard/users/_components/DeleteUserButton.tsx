"use client";
import Trash from "@/components/icons/admin/Trash";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/constants/enums";
import { deleteUserAction } from "@/lib/actions/user";
import React from "react";
import { toast } from "sonner";

const DeleteUserButton = ({
  userId,
  userType,
}: {
  userId: string;
  userType: UserRole;
}) => {
  const deleteHandler = async () => {
    const res = await deleteUserAction(userId, userType);
    switch (res.status) {
      case 200:
        toast.success(res.message);
        break;

      default:
        toast.error(res.message);
        break;
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"link"} type="button">
          <Trash className="transform scale-140" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this user
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-[6px] px-3 h-8 font-[500]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteHandler}
            className="bg-[#25388C] rounded-[6px] px-3 h-8 font-[500]"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserButton;
