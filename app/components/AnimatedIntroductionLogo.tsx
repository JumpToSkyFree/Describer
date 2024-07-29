import { animate, AnimationSequence, stagger } from "framer-motion";
import { useEffect, useRef } from "react";
import Logo from "./Base/Logo";

export default function AnimatedIntroductionLogo() {
  const lineRef = useRef<SVGPathElement>();
  const lettersRefs = useRef<Array<SVGPathElement>>([]);

  useEffect(() => {
    if (lineRef.current && lettersRefs.current) {
      const sequence: AnimationSequence = [
        [
          lettersRefs.current,
          { opacity: [0, 1] },
          { duration: 1, delay: stagger(0.1) },
        ],
        [
          lineRef.current,
          {
            opacity: [0, 1],
            pathLength: [0, 1],
            // d: ["M143.128 76.957H143}.531", "M143.128 76.957H284.531"],
          },
          { delay: 1, duration: 0.5, at: 1 },
        ],
      ];
      animate(sequence, {
        delay: 1,
      });
    }
  }, []);

  return (
    <Logo
      lineRef={lineRef}
      lettersRefs={lettersRefs}
      className="col-start-1 my-2"
    />
  );
}
