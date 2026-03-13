"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface PaginationProps {
  page: number;
  limit: number;
  totalCount: number;
  searchFor?: string;
}

export function PaginationAdmin({
  page,
  limit,
  totalCount,
  searchFor = "items",
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalCount / limit);

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalCount);

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (page > 3) pages.push("...");

    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }

    if (page < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex flex-col gap-3 px-4 sm:px-6 py-4 border-t sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground text-center sm:text-left">
        Showing <span className="font-semibold text-foreground">{start}</span>{" "}
        to <span className="font-semibold text-foreground">{end}</span> of{" "}
        <span className="font-semibold text-foreground">
          {totalCount.toLocaleString()}
        </span>{" "}
        {searchFor}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1 sm:justify-end">
        <button
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
          className="px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:bg-muted disabled:opacity-40"
        >
          ←
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => changePage(p as number)}
              className={`px-3 py-1.5 text-sm rounded-lg ${
                page === p
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-muted"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          disabled={page === totalPages}
          onClick={() => changePage(page + 1)}
          className="px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:bg-muted disabled:opacity-40"
        >
          →
        </button>
      </div>
    </div>
  );
}
