"use client";

import { useBlackData } from "@/context/BlackDataContext";
import { HomeIcon } from "@heroicons/react/20/solid";
import WorkThumbnail from "@/components/ui/WorkThumbnail";
import React, { useState, useEffect } from "react";

interface LinocutWork {
  title: string;
  imagePreview: string;
  imagePath: string;
  description: string;
  detailPageIndex: string;
}

const pages = [{ name: "Linocuts", href: "/linocuts", current: false }];

export default function LinocutsPage() {
  const { data } = useBlackData();
  const [linocutData, setLinocutData] = useState<LinocutWork[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const linocutsData = data[0]?.linocuts;
      if (linocutsData) {
        const linocutWorks = linocutsData.items || [];
        setLinocutData(linocutWorks);
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col w-full h-full mt-[135px] mb-[50px] mobile:mt-[115px] max-w-[1280px] mx-auto">
      <nav
        aria-label="Breadcrumb"
        className="flex w-full items-start ml-[28px]"
      >
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <a href="/" className="text-gray-400 hover:text-gray-500">
                <HomeIcon className="size-5 shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </a>
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
      </nav>
      <div
        id="linocutTitle"
        className="items-start font-bold font-sans text-2xl text-[#333] mb-[20px] ml-[8px] mt-[20px] mobile:text-[20px] mobile:mb-[5px]"
      >
        Linocut Prints
      </div>
      <div
        id="linocutThumbnails"
        className="grid grid-cols-3 mobile:grid-cols-1 gap-5 mobile:gap-[20px] w-full"
      >
        {linocutData.map((work, index) => (
          <WorkThumbnail
            key={index}
            targetPage={`/linocuts/${work.detailPageIndex}`}
            path={`/images/linocut/detail/${work.imagePreview}`}
            description="Linocut Print"
            title={work.title}
          />
        ))}
      </div>
    </div>
  );
}
