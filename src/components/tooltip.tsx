import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ITooltip {
  text: string;
  children: ReactNode;
  visible?: boolean;
}

export const Tooltip = ({ text, children, visible = true }: ITooltip) => {
  const [hovered, setHovered] = useState(false);

  if (!visible) return <>{children}</>;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
              px-3 py-1.5 text-xs text-white bg-black/80 rounded-lg shadow-lg
              whitespace-nowrap z-50"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-black/80"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};