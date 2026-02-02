"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SearchNotFound = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const clearSearchHandler = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");

    router.push(`/library?${params.toString()}`);
  };

  return (
    <div className="space-y-[70px]">
      <h2 className="text-[30px] leading-[100%] font-semibold">
        Search Result for <span className="text-gold">{search}</span>
      </h2>

      <div className="max-w-[360px] mx-auto space-y-6">
        <div className="h-[200px] w-[200px] mx-auto relative">
          <Image src={"/images/livre-not-found.png"} alt="" fill />
        </div>

        <div className="space-y-3.5 text-center">
          <h3 className="text-white font-semibold text-[24px] leading-[100%]">
            No Results Found
          </h3>
          <p>
            We couldn’t find any books matching your search. Try using different
            keywords or check for typos.
          </p>
        </div>

        <Button
          onClick={clearSearchHandler}
          className="!bg-gold !text-[#16191E] uppercase !h-[48px] !rounded-[5px] !text-[20px] cursor-pointer !w-full"
        >
          Clear Search
        </Button>
      </div>
    </div>
  );
};

export default SearchNotFound;
