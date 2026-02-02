import Image from "next/image";
import React from "react";
import { Book } from "@/types/book";
import Link from "next/link";
import { Pages, Routes } from "@/constants/enums";

const BookDetails = ({ book, books }: { book: Book; books: Book[] }) => {
  return (
    <div>
      <div className="container">
        <div className="flex gap-[84px]">
          <div className="max-w-[645px] w-full space-y-[60px]">
            <div className="space-y-6">
              <h3 className="font-semibold text-[30px] leading-[100%]">
                Summary
              </h3>
              <div className="text-[20px] leading-[32px]">{book?.summary}</div>
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-[24px]">
              <h3 className="font-semibold text-[30px] leading-[100%]">
                More similar books
              </h3>
              <div className="flex flex-wrap gap-x-9 gap-y-[42px]">
                {books.slice(0, 6).map((book, index) => (
                  <Link
                    key={index}
                    href={`/${Pages.BOOKS}/${book.id}`}
                    className="w-[144px] h-[200px] relative"
                  >
                    <Image fill={true} src={book.image} alt="" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
