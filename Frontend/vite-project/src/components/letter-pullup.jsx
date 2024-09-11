"use client";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export default function LetterPullup({ className, words = "", delay = 0.05 }) {
  // Split the words into an array of letters, preserving spaces
  const letters = words.split("");

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * delay,
      },
    }),
  };

  return (
    <div className="flex flex-wrap justify-center">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate="animate"
          custom={i}
          className={cn(
            "font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-4xl md:leading-[5rem]",
            className,
            letter === " " ? "mr-2" : "" // Add margin to the right of spaces
          )}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}
