import { motion } from "motion/react";

export const SkeletonOne = () => {
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
        className="flex flex-row rounded-lg border-2 border-r-4 border-b-4 border-slateBlue p-2 items-center space-x-2 bg-vioBlue/20"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-vioBlue to-charmPink shrink-0" />
        <div className="w-full bg-slateBlue/20 h-4 rounded-full" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-lg border-2 border-r-4 border-b-4 border-slateBlue p-2 items-center space-x-2 w-3/4 ml-auto bg-charmPink/20"
      >
        <div className="w-full bg-slateBlue/20 h-4 rounded-full" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-charmPink to-vioBlue shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-lg border-2 border-r-4 border-b-4 border-slateBlue p-2 items-center space-x-2 bg-vioBlue/20"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-vioBlue to-charmPink shrink-0" />
        <div className="w-full bg-slateBlue/20 h-4 rounded-full" />
      </motion.div>
    </motion.div>
  );
};
