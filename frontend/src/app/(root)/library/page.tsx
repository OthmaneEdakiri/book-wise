import React from "react";
import SearchNotFound from "./_components/SearchNotFound";
import { getBooks } from "@/lib/db/book";
import { cookies } from "next/headers";
import BooksList from "./_components/BooksList";
import SearchForm from "./_components/SearchForm";

const LibraryPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; sort?:string };
}) => {
 const token = (await cookies()).get("access_token")?.value;
  const page = Number(searchParams.page) || 1;
  const query = searchParams.search || "";
  const sort = searchParams.sort || "newest";

const data = await getBooks(page, token, query, sort);


  return (
    <main>
        <div className="container">
          <div className="pt-[30px] pb-20 space-y-[70px]">
            <SearchForm />

            {data.data.length > 0 ? (
              <BooksList meta={data?.meta} books={data?.data} />
            ) : (
              <SearchNotFound />
            )}
          </div>
        </div>
    </main>
  );
};

export default LibraryPage;
