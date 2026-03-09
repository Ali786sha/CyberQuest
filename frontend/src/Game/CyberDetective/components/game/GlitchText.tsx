import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
  return (
    <motion.div
      className={`relative font-cyber ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <span className="relative inline-block">
        <span className="relative z-10">{text}</span>
        <span
          className="absolute top-0 left-0 z-0 opacity-70 neon-text-blue"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
            transform: "translate(-2px, -1px)",
            color: "hsl(180, 100%, 50%)",
          }}
          aria-hidden
        >
          {text}
        </span>
        <span
          className="absolute top-0 left-0 z-0 opacity-70"
          style={{
            clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
            transform: "translate(2px, 1px)",
            color: "hsl(140, 100%, 50%)",
          }}
          aria-hidden
        >
          {text}
        </span>
      </span>
    </motion.div>
  );
};

export default GlitchText;
