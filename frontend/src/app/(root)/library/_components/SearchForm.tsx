"use client";
import Search from "@/components/icons/Search";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pages } from "@/constants/enums";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchFromUrl = searchParams.get("search") || "";
  const [query, setQuery] = useState(searchFromUrl);

  useEffect(() => {
    setQuery(searchFromUrl);
  }, [searchFromUrl]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (query.trim()) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    router.push(`/${Pages.LIBRARY}?${params.toString()}`);
  };
  return (
    <form onSubmit={handleSearch} className="space-y-8 max-w-[630px] mx-auto">
      <div className="space-y-3.5 text-center">
        <p className="md:text-[18px] text-[16px] font-semibold leading-[28px] uppercase">
          Discover Your Next Great Read
        </p>
        <h2 className="md:text-[56px] text-[48px] md:leading-[64px] leading-[54px] font-semibold text-white">
          Explore and Search for <span className="text-gold">Any Book</span> In
          Our Library
        </h2>
      </div>
      <div className="relative">
        <Label
          className="absolute left-[30px] top-[50%] transform -translate-[50%]"
          htmlFor="search-input"
        >
          <Search />
        </Label>
        <Input
          id="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="rounded-[10px] md:h-[68px] h-[60px] ps-[58px] font-semibold !text-[20px] leading-[24px] text-white bg-[#232839] border-none"
        />
      </div>
    </form>
  );
};

export default SearchForm;
