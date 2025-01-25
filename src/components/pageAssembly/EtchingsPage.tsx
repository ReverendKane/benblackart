"use client";

import { useBlackData } from "@/context/BlackDataContext";
import WorkThumbnail from "@/components/ui/WorkThumbnail";
import React, { useState, useEffect } from "react";
import BreadcrumbNavigation from "@/components/ui/breadcrumbNavigation";

interface EtchingWork {
  title: string;
  imagePreview: string;
  imagePath: string;
  description: string;
  detailPageIndex: string;
}

const pages = [{ name: "Etchings", href: "/etchings", current: false }];

export default function EtchingsPage() {
  const { data } = useBlackData();
  const [etchingData, setEtchingData] = useState<EtchingWork[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const etchingsData = data[0]?.etchings;
      if (etchingsData) {
        const etchingWorks = etchingsData.items || [];
        setEtchingData(etchingWorks);
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col w-full h-full mt-[135px] mb-[50px] mobile:mt-[115px] max-w-[1280px] mx-auto">
      <BreadcrumbNavigation pages={pages} />
      <div
        id="etchingsThumbnails"
        className="grid grid-cols-3 mobile:grid-cols-1 gap-5 mobile:gap-[10px] w-full p-2 my-[50px]"
      >
        {etchingData.map((work, index) => (
          <WorkThumbnail
            key={index}
            targetPage={`/etchings/${work.detailPageIndex}`}
            path={`/images/etchings/detail/${work.imagePreview}`}
            description="Etching"
            title={work.title}
          />
        ))}
      </div>
    </div>
  );
}
