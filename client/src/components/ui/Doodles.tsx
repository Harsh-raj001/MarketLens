import { motion } from "framer-motion";

export const DoodleArrow = ({ className = "w-12 h-12 text-slate-400" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      d="M20,80 Q50,20 80,40 M70,25 L80,40 L60,45" 
    />
  </svg>
);

export const DoodleUnderline = ({ className = "w-32 h-4 text-teal-400" }) => (
  <svg viewBox="0 0 100 20" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <motion.path 
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      d="M5,15 Q30,5 50,15 T95,10" 
    />
  </svg>
);

export const DoodleStar = ({ className = "w-8 h-8 text-amber-400" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <motion.path 
      initial={{ pathLength: 0, scale: 0.5, opacity: 0 }}
      whileInView={{ pathLength: 1, scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      d="M50,10 L60,40 L90,40 L65,60 L75,90 L50,70 L25,90 L35,60 L10,40 L40,40 Z" 
    />
  </svg>
);

export const DoodleCircle = ({ className = "w-16 h-16 text-rose-400" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <motion.path 
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      d="M50,10 C80,10 90,40 85,70 C80,100 40,95 20,80 C0,65 10,20 45,15" 
    />
  </svg>
);

export const DoodleCandlestick = ({ className = "w-10 h-10 text-emerald-500" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
    <motion.g 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <line x1="50" y1="15" x2="50" y2="85" />
      <rect x="35" y="30" width="30" height="40" rx="4" />
    </motion.g>
  </svg>
);

export const DoodleStickyNote = ({ className = "w-24 h-24 text-amber-200" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <motion.path 
      initial={{ opacity: 0, rotate: -10, scale: 0.9 }}
      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100 }}
      d="M10,10 L90,15 L85,95 L15,90 Z" 
    />
  </svg>
);
