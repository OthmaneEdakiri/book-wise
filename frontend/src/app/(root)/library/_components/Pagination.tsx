"use client";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pages } from "@/constants/enums";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({
  meta,
}: {
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
}) => {
  const searchParams = useSearchParams();
  if (meta.last_page === 1) return null;

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    return `/${Pages.LIBRARY}?${params.toString()}`;
  };
  return (
    <div className="flex items-center justify-end gap-2.5 pt-[24px]">
      {meta.current_page > 1 && (
        <Link
          className={`${buttonVariants({
            size: "icon",
          })} h-[48px] w-[48px] rounded-[4px] bg-[#232839]`}
          href={buildPageUrl(meta.current_page - 1)}
        >
            <ChevronLeft />
        </Link>
      )}

      <span className="h-[48px] w-[48px] rounded-[4px] bg-[#232839] flex justify-center items-center">
        {meta.current_page} / {meta.last_page}
      </span>

      {meta.current_page < meta.last_page && (
        <Link
          className={`${buttonVariants({
            size: "icon",
          })} h-[48px] w-[48px] rounded-[4px] bg-[#232839]`}
          href={buildPageUrl(meta.current_page + 1)}
        >
            <ChevronRight />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
