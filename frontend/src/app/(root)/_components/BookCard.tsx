import { Pages } from "@/constants/enums";
import { Book } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const BookCard = ({ book }: { book: Book }) => {
  return (
    <Link href={`/${Pages.BOOKS}/${book.id}`} className="space-y-[18px] max-w-[160px]">
      <div className="h-[199px] w-[143px] relative">
        <Image fill={true} src={book.image} alt="" />
      </div>
      <div className="space-y-2.5">
        <h3 className="font-semibold text-[20px] leading-[24px] text-white line-clamp-2">
          {book.title} - By {book.author}
        </h3>
        <span className="italic">{book.genre}</span>
      </div>
    </Link>
  );
};

export default BookCard;
