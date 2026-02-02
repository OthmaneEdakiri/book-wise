"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import clsx from "clsx";

interface Props {
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
  path: string;
}

const Pagination = ({ meta, path }: Props) => {
  const searchParams = useSearchParams();
  if (meta.last_page === 1) return null;

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    return `${path}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-end gap-2 pt-6">
      {/* Previous */}
      <Link
        href={buildPageUrl(meta.current_page - 1)}
        className={clsx(
          "h-9 w-9 flex items-center justify-center rounded-md border",
          meta.current_page === 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-gray-100",
        )}
      >
        ‹
      </Link>

      {/* Page indicator */}
      <div className="flex items-center gap-1">
        <span className="h-9 min-w-9 px-3 rounded-md bg-primary text-white text-sm flex items-center justify-center">
          {meta.current_page}
        </span>
        <span className="text-sm text-muted-foreground">
          / {meta.last_page}
        </span>
      </div>

      {/* Next */}
      <Link
        href={buildPageUrl(meta.current_page + 1)}
        className={clsx(
          "h-9 w-9 flex items-center justify-center rounded-md border",
          meta.current_page === meta.last_page
            ? "pointer-events-none opacity-40"
            : "hover:bg-gray-100",
        )}
      >
        ›
      </Link>
    </div>
  );
};

export default Pagination;
