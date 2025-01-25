"use client";

import { useBlackData } from "@/context/BlackDataContext";
import OtherWorkWidget from "@/components/pageAssembly/OtherWorkWidget";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import BreadcrumbNavigation from "@/components/ui/breadcrumbNavigation";
import SetPurchaseWidget from "@/components/ui/SetPurchaseWidget";
import HaveQuestionsWidget from "@/components/ui/HaveQuestionsWidget";

interface LinocutWork {
  title: string;
  price: string;
  imagePreview: string;
  imagePath: string;
  description: string;
  fullDescription: string;
  dimensions: string;
  productId: number;
  width: number;
  height: number;
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

export default function LinocutDetailPage({ exampleId }: DetailId) {
  const { data } = useBlackData();
  const [linocutData, setLinocutData] = useState<LinocutWork | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
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
      <BreadcrumbNavigation pages={pages} />
      <div
        id="linocutEntry"
        className="flex flex-row mobile:flex-col w-full max-w-[1280px] mx-auto gap-4 items-stretch mt-[50px]"
      >
        <div id="linocutEntryImages" className="flex-1 relative">
          <div id="productImages" className="w-full flex flex-col items-center">
            <div className="w-full max-w-[640px] relative">
              <div
                id="heroImage"
                className="w-full relative overflow-visible"
                style={{
                  height: linocutData?.height
                    ? `${linocutData.height}px`
                    : "auto",
                }}
              >
                <Image
                  src={`/images/linocut/main/${linocutData?.images?.[selectedThumb]?.name ?? ""}`}
                  alt={`Recent work Example: ${linocutData?.title ?? "Unknown"}`}
                  width={640}
                  height={linocutData?.height || 640}
                  className="object-cover shadow-md shadow-gray-800/70"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => console.error("Failed to load image")}
                />
              </div>
              <div
                id="imageThumbnails"
                className="w-full flex flex-row justify-start items-center pt-[10px] gap-2 ml-[8px]"
              >
                {(linocutData?.images ?? []).map((image, index) => (
                  <div
                    key={index}
                    className={`h-[80px] w-[80px] cursor-pointer transition-all duration-200 ${
                      selectedThumb === index
                        ? "ring-2 ring-gray-900"
                        : "hover:ring-2 hover:ring-gray-400"
                    }`}
                    onClick={() => setSelectedThumb(index)}
                  >
                    <Image
                      src={`/images/linocut/thumb/${image.thumb ?? ""}`}
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
        {/*<div id="linocutEntryImages" className="flex-1 relative">*/}
        {/*  <div id="productImages" className="w-full flex flex-col items-center">*/}
        {/*    <div className="w-full max-w-[640px] relative">*/}
        {/*      <div id="heroImage" className="w-full relative overflow-visible">*/}
        {/*        <Image*/}
        {/*          src={`/images/linocut/main/${linocutData?.images?.[exampleId]?.name ?? ""}`}*/}
        {/*          alt={`Recent work Example: ${linocutData?.title ?? "Unknown"}`}*/}
        {/*          width={640}*/}
        {/*          height={linocutData?.height || 640}*/}
        {/*          className="object-cover shadow-md shadow-gray-800/70"*/}
        {/*          sizes="(max-width: 640px) 100vw, 33vw"*/}
        {/*          onLoad={() => setImageLoaded(true)}*/}
        {/*          onError={() => console.error("Failed to load image")}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*      <div*/}
        {/*        id="imageThumbnails"*/}
        {/*        className="w-full flex flex-row justify-start items-center pt-[10px] gap-2 ml-[8px]"*/}
        {/*      >*/}
        {/*        {(linocutData?.images ?? []).map((image, index) => (*/}
        {/*          <div*/}
        {/*            key={index}*/}
        {/*            className="h-[80px] w-[80px] bg-gray-300 hover:bg-gray-400 cursor-pointer"*/}
        {/*          >*/}
        {/*            <Image*/}
        {/*              src={`/images/linocut/thumb/${linocutData?.images?.[index]?.thumb ?? ""}`}*/}
        {/*              alt={`Thumbnail ${index + 1}`}*/}
        {/*              width={80}*/}
        {/*              height={80}*/}
        {/*              className="object-cover"*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div id="linocutInfo" className="flex-1 flex flex-col h-full ">
          <div id="topInfoContainer" className="flex flex-col px-[8px]">
            <div className="flex flex-col w-full mt-[10px] mobile:mt-[10px]">
              <h2 className="text-[20pt] font-sans font-bold">
                {linocutData?.title}
              </h2>
              <div
                id="materials"
                className="font-normal font-sans text-[10pt] text-gray-400"
              >
                {linocutData?.description}
              </div>
              <div
                id="drawingSize"
                className="font-normal font-sans text-[10pt] text-gray-400"
              >
                {linocutData?.dimensions}
              </div>
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
              <SetPurchaseWidget productId={linocutData?.productId} />
              <div className="font-bold font-sans text-[#aaa] text-[12pt] mt-[40px]">
                Description
              </div>
              <p className="text-sm text-gray-600">
                {linocutData?.fullDescription}
              </p>
              <HaveQuestionsWidget />
            </div>
          </div>
        </div>
      </div>
      <OtherWorkWidget currentExample={linocutData?.title} />
    </div>
  );
}
