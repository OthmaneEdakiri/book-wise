import CalendarDays from "@/components/icons/admin/CalendarDays";
import MoveLeft from "@/components/icons/admin/MoveLeft";
import Pencil from "@/components/icons/admin/Pencil";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { getBook } from "@/lib/db/book";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const BookDetailsPage = async ({ params }: { params: { bookId: string } }) => {
  const { bookId } = await params;
  const token = (await cookies()).get("access_token")?.value;

  let book = null;

  try {
    book = await getBook(token, bookId);
  } catch (error: any) {
    if (error?.response?.status === 404) return notFound();

    throw error;
  }

  if (!book) return notFound();

  return (
    <div>
      <Link
        className={`${buttonVariants({
          variant: "outline",
        })} h-10 border-none shadow-none! text-[#3A354E] font-[500] text-[14px] tracking-[-1%] leading-[20px] mb-6`}
        href={`/${Routes.DASHBOARD}/${Pages.BOOKS}`}
      >
        <MoveLeft />
        Go back
      </Link>

      <div className="flex items-center gap-9 mb-9">
        <div className="bg-[#C4214C1A] px-16 py-6 rounded-[10px]">
          <div className="h-[173px] w-[125px] relative">
            <Image src={book.image} alt="" fill={true} />
          </div>
        </div>
        <BookDetails book={book} />
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold">Summary</h2>
        <div className="max-w-[620px] text-[#64748B]">{book.summary}</div>
      </div>
    </div>
  );
};

const BookDetails = ({
  book,
}: {
  book: {
    created_at: Date;
    author: string;
    title: string;
    genre: string;
    id: string;
  };
}) => {
  return (
    <ul className="space-y-[18px]">
      <li className="flex items-center gap-3.5 text-[#64748B]">
        <span className="text-[18px] leading-[18px]">Created at:</span>
        <span className="text-[16px] leading-[16px] flex items-center gap-1.5">
          <CalendarDays className="h-5 w-5" />
          {new Date(book.created_at).toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      </li>
      <li className="text-[24px] leading-[30px] font-semibold">{book.title}</li>
      <li className="text-[#3A354E] text-[18px] leading-[24px] font-semibold">
        By {book.author}
      </li>
      <li className="text-[#64748B]">{book.genre}</li>
      <li>
        <Link
          className={`${buttonVariants()} w-full min-w-[422px] bg-[#25388C]! rounded-[6px]! h-[44px] font-bold!`}
          href={`/${Routes.DASHBOARD}/${Pages.BOOKS}/${book.id}/${Pages.EDIT}`}
        >
            <Pencil fill={"white"} />
          Edit Book
        </Link>
      </li>
    </ul>
  );
};

export default BookDetailsPage;
