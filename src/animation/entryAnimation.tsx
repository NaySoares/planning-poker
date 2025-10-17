import { motion } from "motion/react"

export const EntryAnimationSpinner = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -5, y: 20 }}
      animate={{ opacity: 1, rotate: 0, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
