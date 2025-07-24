import { motion } from "motion/react";

export const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-charcoal/5 flex-row space-x-2 z-0"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-lg bg-vioBlue/30 p-4 border-2 border-r-4 border-b-4 border-slateBlue flex flex-col items-center justify-center"
      >
        <div className="rounded-full h-10 w-10 bg-gradient-to-r from-vioBlue to-charmPink flex items-center justify-center text-white font-bold text-xs">
          📚
        </div>
        <p className="sm:text-sm text-xs text-center font-semibold text-slateBlue mt-4">
          "This book changed my perspective on life!"
        </p>
        <p className="border-2 border-r-4 border-b-4 border-slateBlue bg-charmPink/80 text-slateBlue text-xs rounded-lg px-2 py-0.5 mt-4 font-bold">
          ⭐⭐⭐⭐⭐
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-lg bg-charmPink/30 p-4 border-2 border-r-4 border-b-4 border-slateBlue flex flex-col items-center justify-center">
        <div className="rounded-full h-10 w-10 bg-gradient-to-r from-charmPink to-vioBlue flex items-center justify-center text-white font-bold text-xs">
          🖋️
        </div>
        <p className="sm:text-sm text-xs text-center font-semibold text-slateBlue mt-4">
          "A masterpiece of modern literature"
        </p>
        <p className="border-2 border-r-4 border-b-4 border-slateBlue bg-vioBlue/80 text-white text-xs rounded-lg px-2 py-0.5 mt-4 font-bold">
          ⭐⭐⭐⭐⭐
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-lg bg-slateBlue/30 p-4 border-2 border-r-4 border-b-4 border-slateBlue flex flex-col items-center justify-center"
      >
        <div className="rounded-full h-10 w-10 bg-gradient-to-r from-slateBlue to-vioBlue flex items-center justify-center text-white font-bold text-xs">
          📖
        </div>
        <p className="sm:text-sm text-xs text-center font-semibold text-slateBlue mt-4">
          "Couldn't put it down - stayed up all night!"
        </p>
        <p className="border-2 border-r-4 border-b-4 border-slateBlue bg-slateBlue/80 text-white text-xs rounded-lg px-2 py-0.5 mt-4 font-bold">
          ⭐⭐⭐⭐
        </p>
      </motion.div>
    </motion.div>
  );
};
