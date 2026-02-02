"use client";
import BookOpenSolid from "@/components/icons/BookOpenSolid";
import { Button } from "@/components/ui/button";
import { Pages, UserStatus } from "@/constants/enums";
import { createBorrowRequest } from "@/lib/actions/borrow-request";
import { Bebas_Neue } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const BorrowButton = ({
  userStatus,
  book_id,
}: {
  userStatus: string;
  book_id: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const borrowHandler = async () => {
    setIsLoading(true);
    if (userStatus === UserStatus.APPROVED) {
      const data = await createBorrowRequest(book_id);

      switch (data.status) {
        case 200:
          setIsLoading(false);
          toast.success(data.message);
          router.push(`/${Pages.PROFILE}`)
          break;
        case 409:
          setIsLoading(false);
          toast.success(data.message);
          break;
        case 500:
          setIsLoading(false);
          toast.error(data.message);
          break;

        default:
          setIsLoading(false);
          toast.error("An unexpected server error occurred.");
          break;
      }
    } else {
      setIsLoading(false);
      toast.error(
        "You are not allowed to borrow this book until your account is approved"
      );
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={borrowHandler}
      type="button"
      className={`text-[20px] tracking-[2%] bg-[#EED1AC] hover:bg-[#EED1AC] flex items-center gap-1.5 text-[#16191E] h-[54px] px-5 uppercase rounded-[5px] ${bebas.className}`}
    >
      <BookOpenSolid />
      Borrow Book Request
    </Button>
  );
};

export default BorrowButton;
