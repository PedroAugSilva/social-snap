"use client";
import cn from "classnames";
import { Check } from "lucide-react";
import * as Bar from "@radix-ui/react-progress";
import { motion } from "framer-motion";

interface ToastProps {
  position?:
    | "top"
    | "bottom"
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left";
  message: string;
  setOpen: (isOpen: boolean) => void;
  open: boolean;
}

const progress = 50;
const time = 500;

export const Toast = ({
  position = "top",
  message,
  setOpen,
  open,
}: ToastProps) => {
  setTimeout(() => {
    setOpen(false);
  }, time * 10);

  return (
    <div
      data-visible={open}
      className={cn(
        "data invisible absolute m-5 flex items-center justify-center data-[visible=true]:visible",
        {
          "top-0 w-full": position === "top",
        },
      )}
    >
      <motion.div
        className="flex w-72 -translate-y-4 flex-col justify-between overflow-hidden rounded-md border-2 border-gray-300 bg-white opacity-0 shadow-lg shadow-black/10"
        layout
        animate={{
          translateY: 10,
          opacity: 1,
        }}
        exit={{
          translateY: 16,
          opacity: 0,
        }}
      >
        <div className="flex w-full flex-row items-center justify-between px-4 py-3">
          <div>{message}</div>
          <button className="text-sm text-emerald-500">
            <Check size={20} />
          </button>
        </div>
        <Bar.Root className="h-1 w-full" value={progress}>
          <Bar.Indicator asChild>
            <motion.div
              layout
              animate={{
                translateX: -300,
                transition: {
                  duration: time / 82,
                },
              }}
              className="h-full  bg-emerald-400"
            ></motion.div>
          </Bar.Indicator>
        </Bar.Root>
      </motion.div>
    </div>
  );
};
