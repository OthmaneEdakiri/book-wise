"use client"
import { Book } from "@/types/book";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import React from "react";
import BookCard from "../../_components/BookCard";
import Pagination from "./Pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  books: Book[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: any;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

const BooksList = ({ books, meta }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "newest";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1");

    router.push(`/library?${params.toString()}`);
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-[30px]">
          All Library books
        </h3>

        <Select value={sort} onValueChange={handleSortChange}>
          <SelectTrigger className="min-w-[180px] !h-[38px] bg-[#232839] border-none capitalize">
            {sort ?? "Sort by"}
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="available">Available</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-x-18 gap-y-12">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <Pagination meta={meta} />
    </div>
  );
};
export default BooksList;
