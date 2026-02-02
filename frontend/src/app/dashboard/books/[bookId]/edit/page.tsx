import { getBook } from "@/lib/db/book";
import { cookies } from "next/headers";
import React from "react";
import BookForm from "../../_components/BookForm";
import { notFound } from "next/navigation";

const EditBookPage = async ({ params }: { params: { bookId: string } }) => {
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
      <BookForm type="UPDATE" {...book} />
    </div>
  );
};

export default EditBookPage;
