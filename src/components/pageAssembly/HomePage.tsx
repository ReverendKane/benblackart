"use client";
import React, { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/20/solid";
import { useBlackData } from "@/context/BlackDataContext";
import HeroImageCarousel from "@/components/homepage/heroImageCarousel";
import WorkThumbnail from "@/components/ui/WorkThumbnail";

interface CarouselImage {
  path: string;
}

interface RecentWork {
  path: string;
  title: string;
  description: string;
  destinationPage: string;
}

const pages = [{ name: "Projects", href: "#", current: true }];

export default function HomePage() {
  const { data } = useBlackData();
  const [carouselData, setCarouselData] = useState<CarouselImage[]>([]);
  const [worksData, setWorksData] = useState<RecentWork[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const homepageData = data[0]?.homepage;
      if (homepageData) {
        const heroCarousel = homepageData.heroCarousel || [];
        const recentWorks = homepageData.recentWorks || [];
        setCarouselData(heroCarousel);
        setWorksData(recentWorks);
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center w-full h-full mt-[135px] mb-[50px] mobile:mt-[115px] max-w-[1280px] mx-auto">
      <nav
        aria-label="Breadcrumb"
        className="flex w-full items-start ml-[55px]"
      >
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <a href="#" className="text-gray-400 hover:text-gray-500">
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
        id="heroBox"
        className="flex flex-col items-center justify-center w-full h-[720px] max-w-[1280px] mx-auto mt-[20px]"
      >
        <HeroImageCarousel heroImages={carouselData} />
      </div>

      <div
        id="recentWork"
        className="flex flex-col items-start w-full bg-white max-w-[1280px] mx-auto mt-[40px] mobile:mt-[20px]"
      >
        <div
          id="recentWorkTitle"
          className="items-start font-bold font-sans text-2xl text-[#333] mb-[10px] ml-[8px] mobile:text-[20px] mobile:mb-[5px]"
        >
          Recent Works
        </div>
        <div
          id="recentWorkThumbnails"
          className="grid grid-cols-3 mobile:grid-cols-1 gap-5 mobile:gap-[20px] w-full"
        >
          {worksData.map((work, index) => (
            <WorkThumbnail
              key={index}
              targetPage={work.destinationPage}
              path={work.path}
              description={work.description}
              title={work.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
