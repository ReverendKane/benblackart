"use client";

import { useBlackData } from "@/context/BlackDataContext";
import OtherWorkWidget from "@/components/pageAssembly/OtherWorkWidget";
import BreadcrumbNavigation from "@/components/ui/breadcrumbNavigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SetPurchaseWidget from "@/components/ui/SetPurchaseWidget";
import HaveQuestionsWidget from "@/components/ui/HaveQuestionsWidget";

interface DrawingWork {
  title: string;
  price: string;
  dimensions: string;
  imagePreview: string;
  imagePath: string;
  description: string;
  productId: number;
  detailPageIndex: string;
  width: string;
  height: number;
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

export default function DrawingDetailPage({ exampleId }: DetailId) {
  const { data } = useBlackData();
  const [drawingData, setDrawingData] = useState<DrawingWork | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedThumb, setSelectedThumb] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      const drawingData = data[0].drawings;
      if (drawingData.items && drawingData.items.length > 0) {
        const drawingWorks = {
          ...drawingData.items[exampleId],
          height: parseInt(drawingData.items[exampleId].height, 10),
        };
        setDrawingData(drawingWorks);
      }
    }
  }, [data, exampleId]);

  useEffect(() => {
    console.log("All: ", drawingData);
    console.log("Example: ", drawingData?.images[0].name);
  }, [drawingData]);

  const pages = [
    { name: "Drawings", href: "/drawings", current: false },
    ...(drawingData
      ? [
          {
            name: drawingData.title,
            href: `/drawings/${exampleId}`,
            current: true,
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col w-full h-full mt-[135px] mb-[50px] mobile:mt-[115px] max-w-[1280px] mx-auto">
      <BreadcrumbNavigation pages={pages} />
      <div
        id="drawingEntry"
        className="flex flex-row mobile:flex-col w-full max-w-[1280px] mx-auto gap-4 items-stretch mt-[50px]"
      >
        <div id="drawingEntryImages" className="flex-1 relative">
          <div id="productImages" className="w-full flex flex-col items-center">
            <div className="w-full max-w-[640px] relative">
              <div
                id="heroImage"
                className="w-full relative overflow-visible"
                style={{
                  height: drawingData?.height
                    ? `${drawingData.height}px`
                    : "auto",
                }}
              >
                <Image
                  src={`/images/drawings/main/${drawingData?.images?.[selectedThumb]?.name ?? ""}`}
                  alt={`Recent work Example: ${drawingData?.title ?? "Unknown"}`}
                  width={640}
                  height={drawingData?.height || 640}
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
                {(drawingData?.images ?? []).map((image, index) => (
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

        <div id="linocutInfo" className="flex-1 flex flex-col h-full">
          <div id="topInfoContainer" className="flex flex-col px-[8px]">
            <div className="flex flex-col w-full mt-[10px] mobile:mt-[10px]">
              <h2 className="text-[20pt] font-sans font-bold">
                {drawingData?.title}
              </h2>
              <div
                id="materials"
                className="font-normal font-sans text-[10pt] text-gray-400"
              >
                {drawingData?.description}
              </div>
              <div
                id="drawingSize"
                className="font-normal font-sans text-[10pt] text-gray-400"
              >
                {drawingData?.dimensions}
              </div>
              <div
                id="dividingLine"
                className="mt-4 border-t-2 border-gray-400/50"
              />
              <div
                id="pricing"
                className="font-bold font-sans text-[19pt] text-gray-400 my-[5px]"
              >
                ${drawingData?.price}
              </div>
              <SetPurchaseWidget productId={drawingData?.productId} />
              <div className="font-bold font-sans text-[#aaa] text-[12pt] mt-[40px]">
                Description
              </div>
              <p className="text-sm text-gray-600">
                {drawingData?.description}
              </p>
              <HaveQuestionsWidget />
            </div>
          </div>
        </div>
      </div>
      <OtherWorkWidget currentExample={drawingData?.title} />
    </div>
  );
}
