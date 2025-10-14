"use client";
import { motion } from "framer-motion";

export default function Hero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center"
      {...fadeInUp}
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          Hi, I'm Your Name
        </h1>
        <p className="text-xl text-gray-600">
          Full Stack Developer
        </p>
      </div>
    </motion.section>
  );
}
