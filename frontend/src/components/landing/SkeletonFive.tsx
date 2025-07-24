import { motion } from "motion/react";

export const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-charcoal/5 flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-lg border-2 border-r-4 border-b-4 border-slateBlue p-2 items-start space-x-2 bg-charmPink/20"
      >
        <div className="rounded-full h-10 w-10 bg-gradient-to-r from-slateBlue to-vioBlue flex items-center justify-center text-white font-bold text-xs shrink-0">
          👤
        </div>
        <p className="text-xs text-slateBlue">
          "I just finished reading 'The Seven Husbands of Evelyn Hugo' and I'm completely blown away! The storytelling, the characters, the plot twists..."
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-lg border-2 border-r-4 border-b-4 border-slateBlue p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-vioBlue/20"
      >
        <p className="text-xs text-slateBlue font-semibold">Join the discussion! 📚</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-charmPink to-vioBlue shrink-0 flex items-center justify-center text-white text-xs">💬</div>
      </motion.div>
    </motion.div>
  );
};
