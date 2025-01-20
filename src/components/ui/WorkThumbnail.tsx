import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

type WorkThumbnailProps = {
  key: number;
  targetPage: string;
  path: string;
  description: string;
  title: string;
};

export default function WorkThumbnail({
  targetPage,
  path,
  description,
  title,
}: WorkThumbnailProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const thumbnailAnimation = useAnimation();
  const textAnimation = useAnimation();

  /*****************
     MOUSE ACTIONS
     *****************/

  const handleHoverStart = () => {
    console.log("Hover start");
    thumbnailAnimation.start({ scale: 0.95, opacity: 0.2 }, { duration: 0.2 });
    textAnimation.start({ opacity: 1 }, { duration: 0.2 });
  };

  const handleHoverEnd = () => {
    console.log("Hover end");
    thumbnailAnimation.start({ scale: 1, opacity: 1 }, { duration: 0.2 });
    textAnimation.start({ opacity: 0 }, { duration: 0.2 });
  };

  return (
    <div className="bg-black rounded-lg">
      <Link href={targetPage} passHref={true}>
        <div className="relative aspect-square w-full cursor-pointer">
          <motion.div
            id="exampleThumbnail"
            animate={thumbnailAnimation}
            className="relative aspect-square w-full"
            onHoverStart={() => handleHoverStart()}
            onHoverEnd={() => handleHoverEnd()}
          >
            <Image
              src={path}
              alt={`Recent work Example: ${targetPage}`}
              fill
              className={`object-cover rounded-lg transition-opacity pointer-events-none duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 768px) 100vw, 33vw"
              onLoad={() => setImageLoaded(true)}
              onError={() => console.error("Failed to load image:", path)}
            />
          </motion.div>
          <motion.div
            id="textOverlay"
            initial={{ opacity: 0 }}
            animate={textAnimation}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-lg z-10 pointer-events-none"
          >
            <div className="font-bold font-sans text-white text-2xl tracking-wide drop-shadow-[0_5px_5px_rgba(0,0,0,0.7)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
              {title}
            </div>
            <div className="font-bold font-sans text-gray-500 text-[12pt] tracking-wide mt-[-1px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.7)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
              {description}
            </div>
            <div className="font-black font-sans text-[#ff0000] text-[9pt] tracking-wide mt-[10px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.7)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
              VIEW
            </div>
          </motion.div>
        </div>
      </Link>
    </div>
  );
}
