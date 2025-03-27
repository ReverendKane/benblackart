"use client";

import React, { useState, useEffect } from "react";
import ShoppingCart from "./ShoppingCart";
import NavigationButton from "./NavigationButton";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("HomePage");
  const sections = {
    Linocuts: "linocuts",
    Drawings: "drawings",
    "3D/LaserCut": "3dlaser",
    Etchings: "etchings",
    About: "about",
    Contact: "contact",
  };

  const checkMobile = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", checkMobile);
    checkMobile();

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    console.log("Active section: ", activeSection);
  }, [activeSection]);

  const handleSectionChange = (section: string) => {
    console.log("Received newSection: ", section);
    setActiveSection(section);
  };

  return (
    <div className="flex flex-col w-full">
      <div
        id="navigation"
        className="fixed z-50 w-full h-[110px] mobile:h-[90px] bg-white"
      >
        <div
          id="navContent"
          className="flex max-w-[1280px] mx-auto px-[15px] h-full items-center justify-between"
        >
          {isMobile ? (
            <div
              id="mobileNavigation"
              className="flex justify-between items-center w-full"
            >
              <Image
                id="logo"
                className="cursor-pointer block pr"
                src="/images/ui-framework/black_logo_vector.webp"
                alt="Black Art Logo"
                width={45}
                height={46}
                onClick={() => handleSectionChange("HomePage")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 33 23"
                width="33"
                height="23"
                className="z-10 pointer-events-none"
              >
                <rect fill="#aaa" width="33" height="5" />
                <rect fill="#aaa" y="9" width="33" height="5" />
                <rect fill="#aaa" y="18" width="33" height="5" />
              </svg>
            </div>
          ) : (
            <div
              id="desktopNavigation"
              className="flex justify-between items-center w-full"
            >
              <Link href="/">
                <Image
                  id="logo"
                  className="cursor-pointer block pr"
                  src="/images/ui-framework/black_logo_vector.webp"
                  alt="Black Art Logo"
                  width={45}
                  height={46}
                  onClick={() => handleSectionChange("HomePage")}
                />
              </Link>

              {Object.entries(sections).map(([key, section]) => (
                <div key={key}>
                  <NavigationButton
                    section={key}
                    matchKey={section}
                    activeSection={activeSection}
                    targetPage={`/${section}`}
                    onClick={() => handleSectionChange(section)}
                  />
                </div>
              ))}
              <ShoppingCart />
            </div>
          )}
        </div>
        <div
          className="w-full h-[27px] opacity-10"
          style={{
            backgroundImage: 'url("/images/ui-framework/navDropshadow.png")',
          }}
        />
      </div>
    </div>
  );
}
