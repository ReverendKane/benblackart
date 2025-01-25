import WorkThumbnail from "@/components/ui/WorkThumbnail";
import { useBlackData } from "@/context/BlackDataContext";
import React, { useEffect, useState } from "react";
import _ from "lodash";

interface ProcessedWork {
  title: string;
  description: string;
  path: string;
  destinationPage: string;
}

type WidgetProps = {
  currentExample: string | undefined;
};

export default function OtherWorkWidget({ currentExample }: WidgetProps) {
  const { data } = useBlackData();
  const [workData, setWorkData] = useState<ProcessedWork[]>([]);

  useEffect(() => {
    if (data?.[0]) {
      // Define work types with their specific paths and preview patterns
      const workTypes = {
        linocuts: {
          dirName: "linocut",
          displayName: "Linocut",
          path: "/linocuts",
          previewPattern: /^featured_.*\.webp$/,
        },
        drawings: {
          dirName: "drawings",
          displayName: "Drawing",
          path: "/drawings",
          previewPattern: /^the.*_preview\.webp$/,
        },
        etchings: {
          dirName: "etchings",
          displayName: "Etching",
          path: "/etchings",
          previewPattern: /^(rainyDays|theWave)_preview\.webp$/,
        },
        lasercuts: {
          dirName: "lasercut",
          displayName: "Lasercut",
          path: "/3dlaser",
          previewPattern: /^(theEclipse|stainedGlass)_preview\.webp$/,
        },
      };

      // Create pool of works with proper validation
      const allWorks = Object.entries(workTypes).flatMap(([type, config]) => {
        const items = data[0][type]?.items || [];
        return items
          .filter((work) => work.title !== currentExample)
          .map((work) => ({
            ...work,
            type,
            dirName: config.dirName,
            displayName: config.displayName,
            destinationPath: config.path,
            isValid: config.previewPattern.test(work.imagePreview),
          }))
          .filter((work) => work.isValid); // Only include works with valid preview patterns
      });

      const selectedWorks = _.sampleSize(allWorks, 3).map((work) => ({
        title: work.title,
        description: work.displayName,
        path: `/images/${work.dirName}/detail/${work.imagePreview}`,
        destinationPage: `${work.destinationPath}/${work.detailPageIndex}`,
      }));

      setWorkData(selectedWorks);
    }
  }, [data, currentExample]);

  return (
    <div
      id="otherWork"
      className="flex flex-col items-start w-full bg-white max-w-[1280px] mx-auto mt-[80px] mobile:mt-[20px]"
    >
      <div
        id="otherWorkTitle"
        className="items-start font-bold font-sans text-2xl text-[#333] mb-[10px] ml-[8px] mobile:text-[20px] mobile:mb-[5px]"
      >
        You Might Also Like
      </div>
      <div
        id="otherWorkThumbnails"
        className="grid grid-cols-3 mobile:grid-cols-1 gap-5 mobile:gap-[20px] w-full"
      >
        {workData.map((work, index) => (
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
  );
}
