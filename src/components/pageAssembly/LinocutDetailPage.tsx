"use client";

import { useBlackData } from "@/context/BlackDataContext";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { HomeIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import WorkThumbnail from "@/components/ui/WorkThumbnail";
import { Combobox } from "@headlessui/react";

interface LinocutWork {
  title: string;
  price: string;
  imagePreview: string;
  imagePath: string;
  description: string;
  detailPageIndex: string;
  images: {
    imageExample: string;
    imageDescription: string;
    name: string;
    thumb: string;
    imageWidth: string;
    imageHeight: string;
  }[];
}

type DetailId = {
  exampleId: number;
};

const amount = [
  { id: 1, total: "1" },
  { id: 2, total: "2" },
  { id: 3, total: "3" },
  { id: 4, total: "4" },
  { id: 5, total: "5" },
];

export default function LinocutDetailPage({ exampleId }: DetailId) {
  const { data } = useBlackData();
  const [linocutData, setLinocutData] = useState<LinocutWork | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [selectedThumb, setSelectedThumb] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      const linocutData = data[0].linocuts;
      if (linocutData.items && linocutData.items.length > 0) {
        const linocutWorks = linocutData.items[exampleId];
        setLinocutData(linocutWorks);
      }
    }
  }, [data]);

  useEffect(() => {
    console.log("All: ", linocutData);
    console.log("Example: ", linocutData?.images[0].name);
  }, [linocutData]);

  const pages = [
    { name: "Linocuts", href: "/linocuts", current: false },
    ...(linocutData
      ? [
          {
            name: linocutData.title,
            href: `/linocuts/${exampleId}`,
            current: true,
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col w-full h-full mt-[135px] mb-[50px] mobile:mt-[115px] max-w-[1280px] mx-auto">
      <nav
        aria-label="Breadcrumb"
        className="flex w-full items-start ml-[28px]"
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
      </nav>
      <div
        id="linocutTitle"
        className="items-start font-bold font-sans text-2xl text-[#333] mb-[20px] ml-[8px] mt-[20px] mobile:text-[20px] mobile:mb-[5px]"
      >
        Linocut Prints
      </div>
      <div
        id="linocutEntry"
        className="flex flex-row mobile:flex-col w-full max-w-[1280px] mx-auto gap-4 items-stretch"
      >
        <div id="linocutEntryImages" className="flex-1 relative">
          <div id="productImages" className="w-full flex flex-col items-center">
            <div className="w-full max-w-[640px] relative">
              <div
                id="heroImage"
                className="w-full aspect-[3/4] bg-black relative overflow-hidden"
              >
                {/*<Image*/}
                {/*  src={`/images/linocut/main/${linocutData?.images?.[exampleId]?.name ?? ""}`}*/}
                {/*  alt={`Recent work Example: ${linocutData?.title ?? "Unknown"}`}*/}
                {/*  width={640}*/}
                {/*  height={700}*/}
                {/*  className="object-cover"*/}
                {/*  sizes="(max-width: 640px) 100vw, 33vw"*/}
                {/*  onLoad={() => setImageLoaded(true)}*/}
                {/*  onError={() => console.error("Failed to load image")}*/}
                {/*/>*/}
              </div>
              <div
                id="imageThumbnails"
                className="w-full flex flex-row justify-start items-center pt-[10px] gap-2 ml-[8px]"
              >
                {(linocutData?.images ?? []).map((image, index) => (
                  <div
                    key={index}
                    className="h-[80px] w-[80px] bg-gray-300 hover:bg-gray-400 cursor-pointer"
                  >
                    <Image
                      src={`/images/linocut/thumb/${linocutData?.images?.[index]?.thumb ?? ""}`}
                      alt={`Thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="linocutInfo" className="flex-1 flex flex-col h-full ">
          <div id="topInfoContainer" className="flex flex-col px-[8px]">
            <div className="flex flex-col w-full mt-[30px] mobile:mt-[10px]">
              <h2 className="text-xl font-sans font-bold">
                {linocutData?.title} Linocut Print
              </h2>
              <div
                id="dividingLine"
                className="mt-4 border-t-2 border-gray-400/50"
              />
              <div
                id="pricing"
                className="font-bold font-sans text-[19pt] text-gray-400 my-[5px]"
              >
                ${linocutData?.price}
              </div>
              <div id="setQuantityWidget" className="flex mt-[10px]">
                <div
                  id="quantityWidget"
                  className="flex outline-gray-300 w-[114px] h-[35px] rounded-md items-center font-sans text-[12pt] outline outline-1"
                >
                  <div
                    id="downIncrement"
                    className="flex bg-gray-200 w-full h-full items-center justify-center rounded-l-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="gray"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>
                  </div>
                  <div
                    id="totalQuantity"
                    className="flex bg-white w-full h-full text-black font-medium font-sans items-center justify-center text-[12pt]"
                  >
                    {selectedAmount}
                  </div>
                  <div
                    id="upIncrement"
                    className="flex items-center justify-center w-full h-full bg-gray-200 rounded-r-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="gray"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </div>
                <div id="addToCart" className="ml-[15px]">
                  <button
                    type="submit"
                    className="flex w-[110px] h-[35px] flex-1 items-center justify-center rounded-md bg-indigo-600 text-[11pt] outline outline-1 outline-indigo-700 font-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add to cart
                  </button>
                </div>
              </div>

              {/*  <div*/}
              {/*    id="quantityLabel"*/}
              {/*    className="font-bold font-sans text-[#aaa] text-[12pt] mt-[20px]"*/}
              {/*  >*/}
              {/*    Quantity*/}
              {/*  </div>*/}
              {/*  <div className="inline-grid w-full max-w-16 grid-cols-1 mt-[4px]">*/}
              {/*    <select*/}
              {/*      id={`quantity-${exampleId}`}*/}
              {/*      name={`quantity-${exampleId}`}*/}
              {/*      aria-label={`Quantity, ${exampleId}`}*/}
              {/*      className="col-start-1 row-start-1 appearance-none font-sans rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"*/}
              {/*    >*/}
              {/*      <option value={1}>1</option>*/}
              {/*      <option value={2}>2</option>*/}
              {/*      <option value={3}>3</option>*/}
              {/*      <option value={4}>4</option>*/}
              {/*      <option value={5}>5</option>*/}
              {/*    </select>*/}
              {/*    <ChevronDownIcon*/}
              {/*      aria-hidden="true"*/}
              {/*      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"*/}
              {/*    />*/}
              {/*  </div>*/}
              <div className="font-bold font-sans text-[#aaa] text-[12pt] mt-[40px]">
                Description
              </div>
              <p className="text-sm text-gray-600">
                {linocutData?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        id="recentWork"
        className="flex flex-col items-start w-full bg-white max-w-[1280px] mx-auto mt-[80px] mobile:mt-[20px]"
      >
        <div
          id="recentWorkTitle"
          className="items-start font-bold font-sans text-2xl text-[#333] mb-[10px] ml-[8px] mobile:text-[20px] mobile:mb-[5px]"
        >
          You Might Also Like
        </div>
        <div
          id="recentWorkThumbnails"
          className="grid grid-cols-3 mobile:grid-cols-1 gap-5 mobile:gap-[20px] w-full"
        >
          {/*{worksData.map((work, index) => (*/}
          {/*  <WorkThumbnail*/}
          {/*    key={index}*/}
          {/*    targetPage={work.destinationPage}*/}
          {/*    path={work.path}*/}
          {/*    description={work.description}*/}
          {/*    title={work.title}*/}
          {/*  />*/}
          {/*))}*/}
        </div>
      </div>
    </div>
  );
}
