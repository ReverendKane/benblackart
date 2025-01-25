"use client";

import { useBlackData } from "@/context/BlackDataContext";
import WorkThumbnail from "@/components/ui/WorkThumbnail";
import React, { useState, useEffect } from "react";
import BreadcrumbNavigation from "@/components/ui/breadcrumbNavigation";

interface DrawingWork {
  title: string;
  imagePreview: string;
  imagePath: string;
  description: string;
  detailPageIndex: string;
}

const pages = [{ name: "Drawings", href: "/drawings", current: false }];

export default function DrawingsPage() {
  const { data } = useBlackData();
  const [drawingData, setDrawingData] = useState<DrawingWork[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const drawingsData = data[0]?.drawings;
      if (drawingsData) {
        const drawingWorks = drawingsData.items || [];
        setDrawingData(drawingWorks);
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col w-full h-full mt-[135px] mb-[50px] mobile:mt-[115px] max-w-[1280px] mx-auto">
      <BreadcrumbNavigation pages={pages} />
      <div
        id="drawingsThumbnails"
        className="grid grid-cols-3 mobile:grid-cols-1 gap-5 mobile:gap-[10px] w-full p-2 my-[50px]"
      >
        {drawingData.map((work, index) => (
          <WorkThumbnail
            key={index}
            targetPage={`/drawings/${work.detailPageIndex}`}
            path={`/images/drawings/detail/${work.imagePreview}`}
            description="Drawing"
            title={work.title}
          />
        ))}
      </div>
    </div>
  );
}
