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
import { deleteBookAction } from "@/lib/actions/book";
import React from "react";
import { toast } from "sonner";

const DeleteBookButton = ({ bookId }: { bookId: string }) => {
  const deleteHandler = async () => {
    const res = await deleteBookAction(bookId);
    switch (res.status) {
      case 200:
        toast.success("Book deleted successfully");
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
            This action cannot be undone. This will permanently delete this book
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

export default DeleteBookButton;
