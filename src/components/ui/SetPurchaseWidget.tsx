import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

type ProductIdProps = {
  productId: number | undefined;
};

const MAX_QUANTITY = 10;
const MIN_QUANTITY = 1;

export default function SetPurchaseWidget({ productId }: ProductIdProps) {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [decrementEnabled, setDecrementEnabled] = useState(false);
  const [incrementEnabled, setIncrementEnabled] = useState(true);
  const upButton = useAnimation();
  const downButton = useAnimation();
  const upSvg = useAnimation();
  const downSvg = useAnimation();

  useEffect(() => {
    setDecrementEnabled(selectedAmount > MIN_QUANTITY);
    setIncrementEnabled(selectedAmount < MAX_QUANTITY);

    // Reset down button color when disabled
    if (selectedAmount === MIN_QUANTITY) {
      downButton.start({ backgroundColor: "#e5e7eb" });
      downSvg.start({ stroke: "#9ca3af" });
    }
  }, [selectedAmount]);

  const handleDecrementStart = () => {
    if (decrementEnabled) {
      downButton.start({ backgroundColor: "#1a1a1a" });
      downSvg.start({ stroke: "#ffffff" });
    }
  };

  const handleDecrementEnd = () => {
    if (decrementEnabled) {
      downButton.start({ backgroundColor: "#e5e7eb" });
      downSvg.start({ stroke: "#969696" });
    }
  };

  const handleDecrementClick = () => {
    if (decrementEnabled) {
      setSelectedAmount((prev) => Math.max(MIN_QUANTITY, prev - 1));
    }
  };

  const handleIncrementStart = () => {
    if (incrementEnabled) {
      upButton.start({ backgroundColor: "#1a1a1a" });
      upSvg.start({ stroke: "#ffffff" });
    }
  };

  const handleIncrementEnd = () => {
    if (incrementEnabled) {
      upButton.start({ backgroundColor: "#e5e7eb" });
      upSvg.start({ stroke: "#969696" });
    }
  };

  const handleIncrementClick = () => {
    if (incrementEnabled) {
      setSelectedAmount((prev) => Math.min(MAX_QUANTITY, prev + 1));
    }
  };

  return (
    <div id="setQuantityWidget" className="flex mt-[10px]">
      <div
        id="quantityWidget"
        className="flex outline-gray-300 w-[114px] h-[35px] rounded-md items-center font-sans text-[12pt] outline outline-1"
      >
        <motion.div
          id="downIncrement"
          className={`flex bg-gray-200 w-full h-full items-center justify-center rounded-l-md ${decrementEnabled ? "cursor-pointer" : "cursor-default"}`}
          animate={downButton}
          onHoverStart={() => handleDecrementStart()}
          onHoverEnd={() => handleDecrementEnd()}
          onClick={handleDecrementClick}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={decrementEnabled ? "#000000" : "#565656"}
            className="size-6"
            animate={downSvg}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </motion.svg>
        </motion.div>
        <div
          id="totalQuantity"
          className="flex bg-white w-full h-full text-black font-medium font-sans items-center justify-center text-[12pt] select-none"
        >
          {selectedAmount}
        </div>
        <motion.div
          id="upIncrement"
          className={`flex items-center justify-center w-full h-full bg-gray-200 rounded-r-md ${incrementEnabled ? "cursor-pointer" : "cursor-default"}`}
          animate={upButton}
          onHoverStart={() => handleIncrementStart()}
          onHoverEnd={() => handleIncrementEnd()}
          onClick={handleIncrementClick}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={incrementEnabled ? "#000000" : "#565656"}
            className="size-6"
            animate={upSvg}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </motion.svg>
        </motion.div>
      </div>
      <div id="addToCart" className="ml-[15px]">
        <button
          type="submit"
          className="flex w-[110px] h-[35px] flex-1 items-center justify-center rounded-md bg-indigo-600 text-[11pt] outline outline-1 outline-indigo-700 font-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full select-none"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
