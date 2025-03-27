"use client";

import { useBlackData } from "@/context/BlackDataContext";
import OtherWorkWidget from "@/components/pageAssembly/OtherWorkWidget";
import BreadcrumbNavigation from "@/components/ui/breadcrumbNavigation";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SetPurchaseWidget from "@/components/ui/SetPurchaseWidget";
import HaveQuestionsWidget from "@/components/ui/HaveQuestionsWidget";
import SizingComponent from "@/components/ui/SizingComponent";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

interface DrawingWork {
  title: string;
  creationDate: string;
  gicleePrice: string;
  originalPrice: string;
  fullDescription: string;
  originalDimensions: string;
  gicleeDimensions: string;
  imagePreview: string;
  imagePath: string;
  gicleeDescription: string;
  originalDescription: string;
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

interface GicleeData {
  name: string;
  paper: string;
  ink: string;
  paperSize: string;
  imageArea: string;
  margins: string;
  price: string;
  editionInfo: string;
}

type DetailId = {
  exampleId: number;
};

export default function DrawingDetailPage({ exampleId }: DetailId) {
  const { data } = useBlackData();
  const router = useRouter();
  const backTextAnimation = useAnimation();
  const nextTextAnimation = useAnimation();
  const [drawingData, setDrawingData] = useState<DrawingWork | null>(null);
  const [totalDrawings, setTotalDrawings] = useState(0);
  const [gicleeSizes, setGicleeSizes] = useState<GicleeData[]>([]);
  const [selectedGicleeSize, setSelectedGicleeSize] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [selectedOption, setSelectedOption] = useState<"giclee" | "original">(
    "giclee",
  );

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
      // Set Drawing info ==================================
      const drawingData = data[0].drawings;
      if (drawingData.items && drawingData.items.length > 0) {
        setTotalDrawings(drawingData.items.length);
        const drawingWorks = {
          ...drawingData.items[exampleId],
          height: parseInt(drawingData.items[exampleId].height, 10),
        };
        setDrawingData(drawingWorks);
      }
      // Set Giclee info ===================================
      const targetKey = drawingData.items[exampleId].originalDimensions.slice(
        0,
        -1,
      );
      if (drawingData.gicleeSizes && drawingData.gicleeSizes[targetKey]) {
        setGicleeSizes(drawingData.gicleeSizes[targetKey]);

        if (drawingData.gicleeSizes[targetKey].length > 0) {
          setSelectedGicleeSize(drawingData.gicleeSizes[targetKey][0].name);
        }
      }
    }
  }, [data, exampleId]);

  useEffect(() => {
    if (drawingData && gicleeSizes.length > 0) {
      console.log("Drawing Data:", drawingData);
      console.log("Giclee Sizes:", gicleeSizes);
      console.log("Total drawings:", totalDrawings);

      if (
        drawingData.gicleeDimensions &&
        gicleeSizes.some((size) => size.name === drawingData.gicleeDimensions)
      ) {
        setSelectedGicleeSize(drawingData.gicleeDimensions);
      }
    }
  }, [drawingData, gicleeSizes, totalDrawings]);

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

  const handleSelectGicleeSize = (sizeName: string) => {
    setSelectedGicleeSize(sizeName);
    console.log(`Selected giclee size: ${sizeName}`);
  };

  // Get the selected giclee size data
  const selectedGicleeSizeData = gicleeSizes.find(
    (size) => size.name === selectedGicleeSize,
  );

  /* +++++++++++++++++++++++++++++++++++++++++++++ */
  /* Magnifier Functions ************************* */
  /* +++++++++++++++++++++++++++++++++++++++++++++ */

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
      !drawingData?.images?.[selectedThumb]?.name
    )
      return;

    const backgroundPosX = `${cursorPosition.x * 100}%`;
    const backgroundPosY = `${cursorPosition.y * 100}%`;

    // Set background image of the magnified area
    magnifiedImageRef.current.style.backgroundImage = `url(/images/drawings/main/${drawingData.images[selectedThumb].name})`;
    magnifiedImageRef.current.style.backgroundSize = "200%"; // Zoom level - adjust as needed
    magnifiedImageRef.current.style.backgroundPosition = `${backgroundPosX} ${backgroundPosY}`;
  };

  /* +++++++++++++++++++++++++++++++++++++++++++++ */
  /* Page Jump Navigation ************************ */
  /* +++++++++++++++++++++++++++++++++++++++++++++ */

  const hoverStart = (target: string) => {
    if (target === "back") {
      backTextAnimation.start({ color: "#110000" });
    } else {
      nextTextAnimation.start({ color: "#110000" });
    }
  };

  const hoverEnd = (target: string) => {
    if (target === "back") {
      backTextAnimation.start({ color: "#94a3b8" });
    } else {
      nextTextAnimation.start({ color: "#94a3b8" });
    }
  };

  const handleClick = (target: string) => {
    const currentId = exampleId + 1;
    let targetId;

    if (target === "back") {
      if (currentId > 1) {
        targetId = currentId - 1;
      } else {
        targetId = totalDrawings;
      }
    } else {
      if (currentId < totalDrawings) {
        targetId = currentId + 1;
      } else {
        targetId = 1;
      }
    }
    router.push(`/drawings/${targetId}`);
  };

  return (
    <div className="flex flex-col w-full h-full mt-[135px] mb-[50px] mobile:mt-[115px] max-w-[1280px] mx-auto">
      <BreadcrumbNavigation pages={pages} />
      <div
        id="forwardBackButtons"
        className="flex w-full h-[80px] font-Outfit text-[10pt] items-center justify-between"
      >
        <motion.div
          id="backButton"
          className="flex w-[200px] h-full items-center pl-[32px] cursor-pointer select-none"
          onHoverStart={() => hoverStart("back")}
          onHoverEnd={() => hoverEnd("back")}
          onClick={() => handleClick("back")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fill-current"
          >
            <path d="m12 19-7-7 7-7" fill="#94a3b8" />
            <path d="M19 12H5" fill="#94a3b8" />
          </svg>
          <motion.div
            id="backText"
            className="ml-[5px] text-[#94a3b8]"
            animate={backTextAnimation}
          >
            Previous Example
          </motion.div>
        </motion.div>
        <motion.div
          id="forwardButton"
          className="flex w-[200px] h-full items-center justify-end pr-[32px] cursor-pointer select-none"
          onHoverStart={() => hoverStart("forward")}
          onHoverEnd={() => hoverEnd("forward")}
          onClick={() => handleClick("forward")}
        >
          <motion.div
            id="nextText"
            className="mr-[5px] text-[#94a3b8]"
            animate={nextTextAnimation}
          >
            Next Example
          </motion.div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right-icon lucide-arrow-right"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </motion.div>
      </div>
      <div
        id="drawingEntry"
        className="grid grid-cols-2 mobile:grid-cols-1 w-full max-w-[1280px] mx-auto gap-8"
      >
        <div id="drawingEntryImages" className="w-full mb-[80px] mobile:mb-0">
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
                  {drawingData &&
                    drawingData.images &&
                    drawingData.images.length > 0 && (
                      <Image
                        src={`/images/drawings/main/${drawingData.images[0].name}`}
                        alt={`Recent work Example: ${drawingData.title}`}
                        width={640}
                        height={drawingData.height || 640}
                        className="relative object-cover shadow-md shadow-gray-800/70 w-full"
                        sizes="(max-width: 640px) 100vw, 640px"
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => {
                          console.error("Failed to load image:", e);
                          console.log(
                            "Attempted path:",
                            `/images/drawings/main/${drawingData.images[0].name}`,
                          );
                        }}
                        priority
                      />
                    )}
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
              {(drawingData?.images?.length ?? 0) > 1 && (
                <div
                  id="imageThumbnails"
                  className="w-full flex flex-row justify-start items-center pt-[10px] gap-2 ml-[8px]"
                >
                  {drawingData?.images.map((image, index) => (
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
                        src={`/images/drawings/thumb/${image.thumb ?? ""}`}
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
          id="drawingInfo"
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
                {drawingData?.title}
              </h2>
              {selectedOption === "original" && (
                <div
                  id="drawingSize"
                  className="font-normal font-sans text-[10pt] text-gray-400"
                >
                  {drawingData?.originalDimensions}
                </div>
              )}
              <div
                id="pricing"
                className="font-bold font-sans text-[16pt] text-gray-400 my-[5px]"
              >
                $
                {selectedOption === "giclee"
                  ? selectedGicleeSizeData?.price || drawingData?.gicleePrice
                  : drawingData?.originalPrice}
              </div>
              <div className="mt-4 mb-2 text-[11pt] font-Outfit">
                <div className="flex flex-row items-center space-x-6 font-Outfit">
                  <label className="inline-flex items-center ">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-gray-600"
                      name="drawing-type"
                      value="giclee"
                      checked={selectedOption === "giclee"}
                      onChange={() => setSelectedOption("giclee")}
                    />
                    <span className="ml-2 text-gray-700">Giclée Print</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-gray-600"
                      name="drawing-type"
                      value="original"
                      checked={selectedOption === "original"}
                      onChange={() => setSelectedOption("original")}
                    />
                    <span className="ml-2 text-gray-700">Original Drawing</span>
                  </label>
                </div>
              </div>

              {/* SIZE SELECTION BUTTONS - only visible when Giclee Print is selected */}
              {selectedOption === "giclee" && gicleeSizes.length > 0 && (
                <SizingComponent
                  sizes={gicleeSizes}
                  selectedSize={selectedGicleeSize}
                  onSelectSize={handleSelectGicleeSize}
                />
              )}

              <div
                id="dividingLine"
                className="mt-4 border-t-2 border-gray-400/50"
              />

              {/* Display selected size details below the purchase widget */}
              {selectedOption === "giclee" && selectedGicleeSizeData && (
                <div className="mt-8 font-Outfit">
                  <h3 className="text-[11pt] font-medium text-blue-600 mb-2">
                    Selected Size Details:
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">Paper:</span>{" "}
                      {selectedGicleeSizeData.paper}
                    </p>
                    <p>
                      <span className="font-semibold">Ink:</span>{" "}
                      {selectedGicleeSizeData.ink}
                    </p>
                    <p>
                      <span className="font-semibold">Paper size:</span>{" "}
                      {selectedGicleeSizeData.paperSize}
                    </p>
                    <p>
                      <span className="font-semibold">Image area:</span>{" "}
                      {selectedGicleeSizeData.imageArea}
                    </p>
                    <p>
                      <span className="font-semibold">Margins:</span>{" "}
                      {selectedGicleeSizeData.margins}
                    </p>
                  </div>
                  <h3 className="text-[11pt] mt-[20px] font-medium text-blue-600 mb-2">
                    Edition information:
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>{selectedGicleeSizeData.editionInfo}</p>
                  </div>
                </div>
              )}

              {selectedOption === "original" && selectedGicleeSizeData && (
                <div className="mt-8 font-Outfit">
                  <h3 className="text-[11pt] font-medium text-blue-600 mb-2">
                    Creation Date:
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-[10px]">
                    <p>{drawingData?.creationDate}</p>
                  </div>
                  <h3 className="text-[11pt] font-medium text-blue-600 mb-2">
                    Details:
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-[10px]">
                    <p>{drawingData?.originalDescription}</p>
                  </div>
                </div>
              )}

              <HaveQuestionsWidget />
              <div
                id="dividingLine"
                className="mt-4 border-t-2 border-gray-400/50"
              />
              <SetPurchaseWidget
                productId={drawingData?.productId}
                selectedOption={selectedOption}
                selectedSize={
                  selectedOption === "giclee" ? selectedGicleeSize : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>
      <OtherWorkWidget currentExample={drawingData?.title} />
    </div>
  );
}
