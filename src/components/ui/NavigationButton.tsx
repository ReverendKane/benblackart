import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

interface NavButtonProps {
  section: string;
  activeSection: string;
  targetPage: string;
  onClick: () => void;
}

export default function NavigationButton({
  section,
  activeSection,
  targetPage,
  onClick,
}: NavButtonProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const textAnimation = useAnimation();
  const lineAnimation = useAnimation();

  useEffect(() => {
    if (section === activeSection) {
      console.log(`ACTIVE:::> ${activeSection}`);
      setIsEnabled(true);
    } else {
      console.log(`INACTIVE:::> ${section}`);
      setIsEnabled(false);
    }
  }, [activeSection]);

  useEffect(() => {
    if (isEnabled) {
      handleHoverEnd();
    } else {
      console.log(`Disabled::: ${section}`);
    }
  }, [isEnabled]);

  /*****************
     MOUSE ACTIONS
     *****************/

  const handleHoverStart = () => {
    if (isEnabled) {
      textAnimation.start({ color: "#000" });
      lineAnimation.start({ scaleX: 1 });
    }
  };

  const handleHoverEnd = () => {
    if (isEnabled) {
      textAnimation.start({ color: "#aaa" });
      lineAnimation.start({ scaleX: 0 });
    }
  };

  const handleRedirect = () => {
    if (isEnabled) {
      onClick();
    }
  };

  /*****************
     JSX
     *****************/

  return (
    <Link href={targetPage} passHref={true}>
      <motion.div
        id="navigationButton"
        className="flex flex-col w-full h-[25px] mt-[6px]"
        onHoverStart={() => handleHoverStart()}
        onHoverEnd={() => handleHoverEnd()}
        onClick={handleRedirect}
      >
        <motion.div
          id="buttonText"
          animate={textAnimation}
          className="text-[#aaa] font-sans font-bold text-[10pt] cursor-pointer select-none"
        >
          {section}
        </motion.div>
        {isEnabled ? (
          <motion.div
            id="underline"
            className="w-full h-[2px] mt-[-1px] bg-[#ff0000]"
            initial={{ scaleX: 0 }}
            animate={lineAnimation}
          />
        ) : (
          ""
        )}
      </motion.div>
    </Link>
  );
}
