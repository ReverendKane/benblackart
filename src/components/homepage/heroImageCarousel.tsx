import React, { useState, useEffect } from "react";
import Image from "next/image";

interface HeroImage {
  path: string;
}

interface HeroImageProps {
  heroImages: HeroImage[];
}

export default function HeroImageCarousel({ heroImages }: HeroImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const intervalDuration = 5000; // Total time each image is shown
    const transitionDuration = 1000; // Fade transition duration

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setIsTransitioning(false);
      }, transitionDuration);
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  if (!heroImages || heroImages.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[720px] overflow-hidden rounded-lg">
      {heroImages.map((image, index) => {
        const isActive = currentIndex === index;
        const isNext = (currentIndex + 1) % heroImages.length === index;

        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out 
              ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                transition: "transform 5s linear",
                transform: `scale(${isActive ? 1.05 : 1})`,
              }}
            >
              <Image
                src={image.path}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            </div>
          </div>
        );
      })}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center ">
        <div className="flex flex-col items-center max-w-6xl px-4">
          <h1 className="font-bold font-sans text-3xl text-white mx-[15px] tracking-wide text-center drop-shadow-[0_5px_5px_rgba(0,0,0,0.7)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
            Unique, handcrafted artwork designed to bring beauty to your walls.
          </h1>
          <button
            type="button"
            className="rounded-md bg-indigo-500 mt-[10px] px-2.5 py-1.5 text-sm font-semibold text-white shadow-[0_4px_8px_rgba(0,0,0,0.5)] hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-all duration-200 hover:shadow-[0_6px_12px_rgba(0,0,0,0.6)]"
          >
            View available works
          </button>
        </div>
      </div>
    </div>
  );
}
