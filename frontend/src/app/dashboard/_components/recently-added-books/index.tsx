import { Pages, Routes } from "@/constants/enums";
import Link from "next/link";
import React, { Suspense } from "react";
import AddBookCard from "./AddBookCard";
import { getBooks } from "@/lib/db/book";
import { cookies } from "next/headers";
import RecentBookItem from "./RecentBookItem";
import { Book } from "@/types/book";

const RecentlyAddedBooks = async ({books}:{books:Book[]}) => {

  return (
      <div className="relative max-h-[746px] p-4 bg-white rounded-[14px] space-y-[30px] overflow-hidden">
        <div className="space-y-3.5">
          <div className="flex justify-between items-center">
            <div className="text-[20px] leading-[26px] font-semibold">
              Recently Added Books
            </div>
            <Link
              className={`bg-[#F8F8FF] text-[#25388C] h-9 px-3 flex items-center font-semibold text-[14px] leading-[20px] rounded-[6px]`}
              href={`/${Routes.DASHBOARD}/${Pages.BOOKS}`}
            >
              View all
            </Link>
          </div>

          <AddBookCard />
        </div>

        <div className="space-y-[30px]">
          {books.map((book: Book) => (
            <RecentBookItem key={book.id} book={book} />
          ))}
        </div>

        {books.length >= 6 && (
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)",
            }}
          />
        )}
      </div>
  );
};

export default RecentlyAddedBooks;
