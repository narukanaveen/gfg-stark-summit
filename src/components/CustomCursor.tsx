import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Exact mouse coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for the outer ring (creates the mechanical follow delay)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on devices with a real mouse/pointer (hides on touch screens)
    const checkDevice = () => setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    checkDevice();
    window.addEventListener("resize", checkDevice);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // Detect if mouse is over a clickable element
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Triggers target lock on links, buttons, inputs, and anything with a cursor-pointer class
      if (target.closest('button, a, input, [class*="cursor-pointer"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener("resize", checkDevice);
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't render on mobile/touch devices
  if (!isDesktop) return null;

  return (
    <>
      {/* Hide the default operating system cursor everywhere */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* OUTER TACTICAL RING (Trails behind with spring physics) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            rotate: isHovering ? 90 : 0,
            borderColor: isHovering ? 'rgba(16, 185, 129, 0.8)' : 'rgba(237, 29, 36, 0.4)', // Emerald on hover, Red normally
            borderWidth: isHovering ? '2px' : '1px',
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-full border-dashed flex items-center justify-center relative"
        >
          {/* Target lock crosshairs that appear on hover */}
          <motion.div
            animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.5 }}
            className="absolute inset-0 flex items-center justify-center text-emerald-400"
          >
            <Plus className="w-3 h-3" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* INNER LASER DOT (Moves instantly, exact center of mouse) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 4 : 6,
          height: isHovering ? 4 : 6,
          backgroundColor: isHovering ? '#10b981' : '#ed1d24', // Emerald on hover, Red normally
          boxShadow: isHovering 
            ? '0 0 10px 2px rgba(16,185,129,0.5)' 
            : '0 0 10px 2px rgba(237,29,36,0.5)',
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}