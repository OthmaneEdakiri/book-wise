import React from "react";
import BookDetails from "../../_components/book-details";
import { getBook, getBooks } from "@/lib/db/book";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Hero from "../../_components/hero";

const Book = async ({ params }: { params: { bookId: string } }) => {
  const { bookId } = await params;
  const token = (await cookies()).get("access_token")?.value;
  const books = await getBooks(1, token)

  let book = null;
  try {
    book = await getBook(token, bookId);
  } catch (error: any) {
    if (error?.response?.status === 404) return notFound();

    throw error;
  }

  if (!book) return notFound();
  return (
    <main className="pb-[98px]">
      <Hero book={book} />
      <BookDetails books={books.data} book={book} />
    </main>
  );
};

export default Book;
