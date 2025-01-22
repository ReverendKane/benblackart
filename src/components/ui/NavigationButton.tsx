import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

interface NavButtonProps {
  section: string;
  matchKey: string;
  activeSection: string;
  targetPage: string;
  onClick: () => void;
}

export default function NavigationButton({
  section,
  matchKey,
  activeSection,
  targetPage,
  onClick,
}: NavButtonProps) {
  const [isEnabled, setIsEnabled] = useState(true);
  const textAnimation = useAnimation();
  const lineAnimation = useAnimation();

  useEffect(() => {
    if (matchKey !== activeSection) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [activeSection]);

  useEffect(() => {
    if (isEnabled) {
      handleHoverEnd();
    } else {
      textAnimation.set({ color: "#000" });
      lineAnimation.set({ scaleX: 1 });
    }
  }, [isEnabled]);

  /* *********************
   ** ANIMATION    ******** ----------------------------------------------------------------------------
   ********************* */

  const lineVariants = {
    start: {
      scaleX: 0,
      transition: {
        duration: 0,
      },
    },
  };

  /* *********************
   ** MOUSE ACTIONS    **** ----------------------------------------------------------------------------
   ********************* */

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
    console.log("Handle Redirect");
    if (isEnabled) {
      console.log(`Redirecting to ${targetPage}`);
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
        className={`flex flex-col w-full h-[25px] mt-[6px] ${!isEnabled ? "cursor-default" : "cursor-pointer"}`}
        onHoverStart={() => handleHoverStart()}
        onHoverEnd={() => handleHoverEnd()}
        onClick={handleRedirect}
      >
        <motion.div
          id="buttonText"
          animate={textAnimation}
          className={`text-[#aaa] font-sans font-bold text-[10pt] select-none`}
        >
          {section}
        </motion.div>
        <motion.div
          id="underline"
          className="w-full h-[2px] mt-[-1px] bg-[#ff0000]"
          initial={"start"}
          variants={lineVariants}
          animate={lineAnimation}
        />
      </motion.div>
    </Link>
  );
}
