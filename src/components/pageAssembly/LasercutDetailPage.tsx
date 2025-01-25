"use client";

import { useBlackData } from "@/context/BlackDataContext";
import OtherWorkWidget from "@/components/pageAssembly/OtherWorkWidget";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import BreadcrumbNavigation from "@/components/ui/breadcrumbNavigation";
import SetPurchaseWidget from "@/components/ui/SetPurchaseWidget";
import HaveQuestionsWidget from "@/components/ui/HaveQuestionsWidget";

interface LasercutWork {
  title: string;
  price: string;
  dimensions: string;
  imagePreview: string;
  imagePath: string;
  description: string;
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

export default function LasercutDetailPage({ exampleId }: DetailId) {
  const { data } = useBlackData();
  const [lasercutData, setDrawingData] = useState<LasercutWork | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedThumb, setSelectedThumb] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      const lasercutData = data[0].lasercuts;
      if (lasercutData.items && lasercutData.items.length > 0) {
        const lasercutWorks = lasercutData.items[exampleId];
        setDrawingData(lasercutWorks);
      }
    }
  }, [data]);

  useEffect(() => {
    console.log("All: ", lasercutData);
    console.log("Example: ", lasercutData?.images[0].name);
  }, [lasercutData]);

  const pages = [
    { name: "3d/LaserCut", href: "/3dlaser", current: false },
    ...(lasercutData
      ? [
          {
            name: lasercutData.title,
            href: `/3dlaser/${exampleId}`,
            current: true,
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col w-full h-full mt-[135px] mb-[50px] mobile:mt-[115px] max-w-[1280px] mx-auto">
      <BreadcrumbNavigation pages={pages} />
      <div
        id="lasercutEntry"
        className="flex flex-row mobile:flex-col w-full max-w-[1280px] mx-auto gap-4 items-stretch mt-[50px]"
      >
        <div id="lasercutEntryImages" className="flex-1 relative">
          <div id="productImages" className="w-full flex flex-col items-center">
            <div className="w-full max-w-[640px] relative">
              <div id="heroImage" className="w-full relative overflow-visible">
                <Image
                  src={`/images/lasercut/main/${lasercutData?.images?.[selectedThumb]?.name ?? ""}`}
                  alt={`Recent work Example: ${lasercutData?.title ?? "Unknown"}`}
                  width={640}
                  height={lasercutData?.height || 640}
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
                {(lasercutData?.images ?? []).map((image, index) => (
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
                      src={`/images/drawing/thumb/${image.thumb ?? ""}`}
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
        {/*<div id="lasercutEntryImages" className="flex-1 relative">*/}
        {/*  <div id="productImages" className="w-full flex flex-col items-center">*/}
        {/*    <div className="w-full max-w-[640px] relative">*/}
        {/*      <div id="heroImage" className="w-full relative overflow-visible">*/}
        {/*        <Image*/}
        {/*          src={`/images/lasercut/main/${lasercutData?.images?.[0]?.name ?? ""}`}*/}
        {/*          alt={`Recent work Example: ${lasercutData?.title ?? "Unknown"}`}*/}
        {/*          width={640}*/}
        {/*          height={lasercutData?.height || 640}*/}
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
        {/*        {(lasercutData?.images ?? []).map((image, index) => (*/}
        {/*          <div*/}
        {/*            key={index}*/}
        {/*            className="h-[80px] w-[80px] bg-gray-300 hover:bg-gray-400 cursor-pointer"*/}
        {/*          >*/}
        {/*            <Image*/}
        {/*              src={`/images/lasercut/thumb/${lasercutData?.images?.[index]?.thumb ?? ""}`}*/}
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

        <div id="lasercutInfo" className="flex-1 flex flex-col h-full ">
          <div id="topInfoContainer" className="flex flex-col px-[8px]">
            <div className="flex flex-col w-full mt-[10px] mobile:mt-[10px]">
              <h2 className="text-[20pt] font-sans font-bold">
                {lasercutData?.title}
              </h2>
              <div
                id="materials"
                className="font-normal font-sans text-[10pt] text-gray-400"
              >
                {lasercutData?.description}
              </div>
              <div
                id="drawingSize"
                className="font-normal font-sans text-[10pt] text-gray-400"
              >
                {lasercutData?.dimensions}
              </div>
              <div
                id="dividingLine"
                className="mt-4 border-t-2 border-gray-400/50"
              />
              <div
                id="pricing"
                className="font-bold font-sans text-[19pt] text-gray-400 my-[5px]"
              >
                ${lasercutData?.price}
              </div>
              <SetPurchaseWidget productId={lasercutData?.productId} />
              <div className="font-bold font-sans text-[#aaa] text-[12pt] mt-[40px]">
                Description
              </div>
              <p className="text-sm text-gray-600">
                {lasercutData?.description}
              </p>
              <HaveQuestionsWidget />
            </div>
          </div>
        </div>
      </div>
      <OtherWorkWidget currentExample={lasercutData?.title} />
    </div>
  );
}
