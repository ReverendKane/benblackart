import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

export default function HaveQuestionsWidget() {
  const hoverAnimation = useAnimation();

  const hoverStart = () => {
    hoverAnimation.start({ backgroundColor: "#1a1a1a" });
  };

  const hoverEnd = () => {
    hoverAnimation.start({ backgroundColor: "#fff" });
  };

  const handleClick = () => {};

  return (
    <div>
      <div className="font-bold font-sans text-[#aaa] text-[10pt] mt-[25px]">
        Have questions about this item?
      </div>
      <Link href="/contact" passHref={true}>
        <motion.div
          id="sendMessageButton"
          className="flex w-[130px] h-[30px] outline outline-2 outline-[#aaa] rounded-sm text-[10pt] text-[#aaa] font-sans font-bold items-center justify-center mt-[8px] mb-[25px] cursor-pointer"
          animate={hoverAnimation}
          onHoverStart={() => hoverStart()}
          onHoverEnd={() => hoverEnd()}
          onClick={handleClick}
        >
          SEND MESSAGE
        </motion.div>
      </Link>
    </div>
  );
}
