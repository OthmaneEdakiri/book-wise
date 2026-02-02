import { cookies } from "next/headers";
import { getBooks } from "@/lib/db/book";
import Hero from "./_components/hero";
import LatestBooks from "./_components/home/LatestBooks";

export default async function Home() {
  const token = (await cookies()).get("access_token")?.value;
  const data = await getBooks(1, token);
  return (
    <main className="pb-[105px]">
      <Hero book={data.data[0]} />
      {data.data.length > 0 && <LatestBooks books={data.data} />}
    </main>
  );
}
