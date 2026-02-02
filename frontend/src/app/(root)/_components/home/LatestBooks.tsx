import React from "react";
import BookCard from "../BookCard";
import { Book } from "@/types/book";

const LatestBooks = ({ books }: { books: Book[] }) => {
  return (
    <section>
      <div className="container">
        <div className="space-y-12">
          <h2 className="text-[30px] font-semibold leading-[100%]">
            Latest Books
          </h2>

          <div className="flex flex-wrap justify-center gap-x-14 gap-y-11">
            {books.slice(0, 6).map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestBooks;
