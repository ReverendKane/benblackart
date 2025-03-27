"use client";

import Link from "next/link";
import { HomeIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";

type Page = {
  name: string;
  href: string;
  current: boolean;
};

type PageProps = {
  pages: Page[];
};

export default function BreadcrumbNavigation({ pages }: PageProps) {
  const [overviewPage, setOverviewPage] = useState("");

  useEffect(() => {
    if (pages && pages.length > 0) {
      const pathValue = pages[0].href;
      if (pages.length > 1) {
        setOverviewPage(pathValue);
      }
    }
  }, [pages]);

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex w-full justify-between items-start ml-[28px]"
    >
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="size-5 shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="size-5 shrink-0 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <a
                href={page.href}
                className="ml-4 text-[12px] font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
      {overviewPage && (
        <a
          id="backToOverview"
          className="flex justify-end font-Outfit font-bold text-[9pt] text-gray-400 hover:text-gray-500 mr-[65px] cursor-pointer"
          href={overviewPage}
        >
          Back to Overview
        </a>
      )}
    </nav>
  );
}
