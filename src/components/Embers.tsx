import { motion } from "framer-motion";

export default function Embers() {
  return (
    /* The "fixed inset-0" here is what makes the flames follow your scroll */
    <div className="fixed inset-0 w-full h-screen pointer-events-none z-[0] overflow-hidden">
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-t from-[#ED1D24] to-[#F8E825] rounded-full shadow-[0_0_10px_#ED1D24]"
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 6 + 4 + "px",
            left: Math.random() * 100 + "%",
          }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 1, 1, 0],
            x: Math.random() * 100 - 50 
          }}
          transition={{
            duration: Math.random() * 5 + 5, 
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5, 
          }}
        />
      ))}
    </div>
  );
}