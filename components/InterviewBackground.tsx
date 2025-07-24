import { motion } from "framer-motion";

export default function InterviewBackground() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ duration: 2, delay: 1 }}
      className="fixed inset-0 pointer-events-none"
    >
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="w-full h-full"
      />
    </motion.div>
  );
}
