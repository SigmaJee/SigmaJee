import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "./style.css"
const LoadingS = () => {
  return (
    <div className="loading-container">
      <AnimatePresence>
        <motion.div
          className="logo-circle"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="logo-text">ΣJ</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoadingS;
