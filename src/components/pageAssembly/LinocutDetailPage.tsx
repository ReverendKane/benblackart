"use client";

import { useBlackData } from "@/context/BlackDataContext";
import OtherWorkWidget from "@/components/pageAssembly/OtherWorkWidget";
import React, { useState, useEffect, useRef } from "react";
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

  // Magnifier state
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Refs for DOM elements
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const magnifierRef = useRef<HTMLDivElement>(null);
  const magnifiedImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const linocutData = data[0].linocuts;
      if (linocutData.items && linocutData.items.length > 0) {
        const linocutWorks = linocutData.items[exampleId];
        setLinocutData(linocutWorks);
      }
    }
  }, [data, exampleId]);

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

  /* ++++++++++++++++++++++++++
         Magnifier Functions
       ************************* */

  const handleMouseEnter = () => {
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    // Get container bounds
    const containerRect = imageContainerRef.current.getBoundingClientRect();

    // Calculate cursor position relative to container
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    // Calculate magnifier dimensions
    const magnifierWidth = magnifierRef.current?.offsetWidth || 150;
    const magnifierHeight = magnifierRef.current?.offsetHeight || 150;

    // Calculate boundaries
    const maxX = containerRect.width - magnifierWidth;
    const maxY = containerRect.height - magnifierHeight;

    // Position magnifier (with boundary limits)
    const magnifierX = Math.min(Math.max(0, x - magnifierWidth / 2), maxX);
    const magnifierY = Math.min(Math.max(0, y - magnifierHeight / 2), maxY);

    setMagnifierPosition({
      x: magnifierX,
      y: magnifierY,
    });

    setCursorPosition({
      x: x / containerRect.width,
      y: y / containerRect.height,
    });

    updateMagnifiedImage();
  };

  const updateMagnifiedImage = () => {
    if (
      !magnifiedImageRef.current ||
      !imageLoaded ||
      !linocutData?.images?.[selectedThumb]?.name
    )
      return;

    const backgroundPosX = `${cursorPosition.x * 100}%`;
    const backgroundPosY = `${cursorPosition.y * 100}%`;

    // Set background image of the magnified area
    magnifiedImageRef.current.style.backgroundImage = `url(/images/linocut/main/${linocutData.images[selectedThumb].name})`;
    magnifiedImageRef.current.style.backgroundSize = "200%"; // Zoom level - adjust as needed
    magnifiedImageRef.current.style.backgroundPosition = `${backgroundPosX} ${backgroundPosY}`;
  };

  return (
    <div className="flex flex-col w-full h-full mt-[135px] mb-[50px] mobile:mt-[115px] max-w-[1280px] mx-auto">
      <BreadcrumbNavigation pages={pages} />
      <div
        id="linocutEntry"
        className="grid grid-cols-2 mobile:grid-cols-1 w-full max-w-[1280px] mx-auto gap-8 mt-[50px]"
      >
        <div id="linocutEntryImages" className="w-full mb-[80px]">
          <div id="productImages" className="w-full flex flex-col items-center">
            <div className="w-full max-w-[640px] relative">
              <div
                id="heroImage"
                className="w-full relative overflow-visible"
                style={{
                  height: "auto",
                }}
              >
                <div
                  id="imageContainer"
                  ref={imageContainerRef}
                  className="w-full relative cursor-crosshair"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                >
                  <Image
                    src={`/images/linocut/main/${linocutData?.images?.[selectedThumb]?.name ?? ""}`}
                    alt={`Recent work Example: ${linocutData?.title ?? "Unknown"}`}
                    width={640}
                    height={linocutData?.height || 640}
                    className="relative object-cover shadow-md shadow-gray-800/70 w-full"
                    sizes="(max-width: 640px) 100vw, 640px"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => console.error("Failed to load image")}
                  />
                  {showMagnifier && (
                    <div
                      id="magnifier"
                      ref={magnifierRef}
                      className="absolute w-[150px] h-[150px] bg-[#ff000030] border-[.1px] border-[#ff0000] pointer-events-none"
                      style={{
                        left: `${magnifierPosition.x}px`,
                        top: `${magnifierPosition.y}px`,
                      }}
                    ></div>
                  )}
                </div>
              </div>
              {(linocutData?.images?.length ?? 0) > 1 && (
                <div
                  id="imageThumbnails"
                  className="w-full flex flex-row justify-start items-center pt-[10px] gap-2 ml-[8px]"
                >
                  {linocutData?.images.map((image, index) => (
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
              )}
            </div>
          </div>
        </div>
        <div
          id="linocutInfo"
          className="w-full mobile:mt-0 mobile:mb-[80px] relative"
        >
          {showMagnifier && (
            <div
              id="magnifiedImage"
              ref={magnifiedImageRef}
              className="absolute inset-0 z-10 w-full h-full border border-gray-300"
              style={{
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          )}

          <div
            id="topInfoContainer"
            className={`relative flex flex-col px-[8px] ${showMagnifier ? "invisible" : "visible"}`}
          >
            <div className="flex flex-col w-full mt-[10px] mobile:mt-0">
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
              <SetPurchaseWidget
                productId={linocutData?.productId}
                selectedOption={undefined}
                selectedSize={undefined}
              />

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
