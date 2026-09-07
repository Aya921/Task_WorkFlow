// PageTransition.tsx
import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, x: -24 },  // starts off-screen LEFT
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 24 },      // exits off-screen RIGHT
};

export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
   className="flex w-full flex-1 flex-col justify-between"
    variants={variants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
 
    {children}
  
  </motion.div>
);
 
