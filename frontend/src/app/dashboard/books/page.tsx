import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { getBooks } from "@/lib/db/book";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteBookButton from "./_components/DeleteBookButton";
import Pagination from "../_components/Pagination";
import Plus from "@/components/icons/admin/Plus";
import { Book } from "@/types/book";
import Pencil from "@/components/icons/admin/Pencil";

const BooksPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const token = (await cookies()).get("access_token")?.value;
  const { page } = await searchParams;
  const data = await getBooks(Number(page) || 1, token);

  return (
    <div className="bg-white p-5 rounded-[14px] space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-[20px] leading-[26px] font-semibold text-[#1E293B]">
          All Books {page}
        </h2>
        <Link
          className={`${buttonVariants()} !bg-[#25388C] h-8`}
          href={`/${Routes.DASHBOARD}/${Pages.BOOKS}/${Pages.CREATE}`}
        >
            <Plus fill={"white"} />

          Create a New Book
        </Link>
      </div>

      <table className="admin-custom-table">
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data?.data) && data.data.length > 0 ? (
            <>
              {data?.data.map((book: Book) => (
                <BookDetails key={book.id} book={book} />
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                There is no books to diplay
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination path={`/${Routes.DASHBOARD}/${Pages.BOOKS}`} meta={data.meta} />
    </div>
  );
};

const BookDetails = ({ book }: { book: Book }) => {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-1.5">
          <div className="w-[29px] h-[40px] relative">
            <Image alt="" fill={true} src={book?.image || ""} />
          </div>

          <Link
            className="hover:underline"
            href={`/${Routes.DASHBOARD}/${Pages.BOOKS}/${book.id}`}
          >
            {book.title}
          </Link>
        </div>
      </td>
      <td>{book.author}</td>
      <td>{book.genre}</td>
      <td>
        {new Date(book.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </td>
      <td>
        <div className="">
          <Link
            href={`/${Routes.DASHBOARD}/${Pages.BOOKS}/${book.id}/${Pages.EDIT}`}
            className={buttonVariants({ variant: "link" })}
            type="button"
          >
           <Pencil className="transform scale-140" />
          </Link>
          <DeleteBookButton bookId={book.id} />
        </div>
      </td>
    </tr>
  );
};

export default BooksPage;
