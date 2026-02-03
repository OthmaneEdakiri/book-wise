import { Book } from "@/types/book";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import BorrowButton from "./BorrowButton";
import Start from "@/components/icons/Start";

const Hero = async ({ book }: { book?: Book }) => {
  const userStatus = (await headers()).get("x-user-status");
  return (
    <section>
      <div className="container">
        <div className="hero-content md:pt-[27px] pt-[60px] xl:mb-0 mb-12 xl:min-h-[calc(100vh-152px)] flex xl:flex-row flex-col-reverse 2xl:justify-start justify-between 2xl:gap-x-[111px] gap-y-10 2xl:pr-0 xl:pr-[120px]">
          <div className="text-box space-y-9 max-w-[645px]">
            <div className="2xl:space-y-[26px] space-y-4">
              <h1 className="book-title 2xl:text-[72px] text-[62px] font-semibold leading-[110%] text-white">
                {book?.title ?? "Origin"}
              </h1>
              <ul className="book-info 2xl:text-[20px] text-[18px] leading-[28px] flex flex-wrap gap-5">
                <li className="flex items-center gap-1.5">
                  By{" "}
                  <span className="font-semibold text-gold">
                    {book?.author ?? "Dan Brown"}
                  </span>
                </li>
                <li className="flex items-center gap-1.5">
                  Category:{" "}
                  <span className="font-semibold text-gold">
                    {book?.genre ?? "Thriller / Suspense"}
                  </span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Start />
                </li>
                <li className="flex items-center gap-1.5">
                  Total books:
                  <span className="font-semibold text-gold">
                    {book?.total_copies ?? "100"}
                  </span>
                </li>
                <li className="flex items-center gap-1.5">
                  Available books:
                  <span className="font-semibold text-gold">
                    {book?.available_copies ?? "42"}
                  </span>
                </li>
              </ul>
              <p className="book-desc 2xl:text-[20px] text-[18px] leading-[32px]">
                {book?.description ??
                  `Origin is a 2017 mystery-thriller novel by American author Dan
                Brown. It is the fifth installment in the Robert Langdon series,
                following previous bestsellers such as The Da Vinci Code and
                Angels & Demons.`}
              </p>
            </div>
            {book?.available_copies && book?.available_copies > 0 && (
              <BorrowButton book_id={book.id} userStatus={userStatus ?? ""} />
            )}
          </div>
          <div className="md:w-[275px] w-[200px] md:h-[385px] h-[285px] relative">
            <Image
              className="relative z-10"
              fill={true}
              alt=""
              src={book?.image ?? "/images/book.png"}
            />
            <Image
              className="blur-sm transform md:translate-x-[140px] translate-x-[115px] md:translate-y-[25px] translate-y-[15px] rotate-[9deg]"
              fill={true}
              alt=""
              src={book?.image ?? "/images/book.png"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
