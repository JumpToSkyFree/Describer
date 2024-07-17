import { ComponentProps, PropsWithChildren, useEffect, useRef } from "react";
import { animate, AnimationSequence, motion, stagger } from "framer-motion";
import Logo from "./Base/Logo";
import { Button } from "./Button";
import classNames from "~/utils/classNames";

function AnimatedIntroductionLogo() {
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
            // d: ["M143.128 76.957H143.531", "M143.128 76.957H284.531"],
          },
          { duration: 0.5, at: 1 },
        ],
      ];
      animate(sequence);
    }
  }, []);
  return (
    <Logo lineRef={lineRef} lettersRefs={lettersRefs} className="col-start-1" />
  );
}

interface TeaserSubContainerProps {
  borderTop?: boolean;
  paddingTop?: boolean;
  // paddingBottom?: boolean;
}

function TeaserSubContainer({
  borderTop,
  paddingTop,
  // paddingBottom,
  className,
  ...props
}: PropsWithChildren<object> &
  ComponentProps<"div"> &
  TeaserSubContainerProps) {
  return (
    <div
      className={classNames(
        "grid gap-[20px]",
        {
          "border-t border-gray-1 dark:border-gray-9": borderTop,
          "pt-[20px]": paddingTop,
          // "pb-[20px]": paddingBottom,
        },
        className
      )}
      {...props}
    ></div>
  );
}

export default function Teaser() {
  return (
    <div className="lg:col-start-4 lg:col-end-10 border border-gray-1 dark:border-gray-9 p-[20px] rounded-[20px] grid gap-[20px] overflow-hidden">
      <TeaserSubContainer>
        <AnimatedIntroductionLogo />
        <p className="text-[16px] leading-[150%] text-justify font-light text-gray-5">
          Introducing &ldquo;Describer&ldquo;, a game-changing social media
          platform designed specifically for high-end brands, artists, and
          designers. This cutting-edge platform is engineered to showcase
          refined and sophisticated content, allowing users to experience the
          art of storytelling at lightning-fast speeds. With its unique ability
          to instantaneously deliver high-quality visual content, Describer is
          poised to revolutionize the way we consume and interact with content.
        </p>
      </TeaserSubContainer>
      <TeaserSubContainer paddingTop borderTop>
        <div className="flex flex-row justify-center items-center gap-[8px] flex-wrap">
          <span className="text-gray-5">Are you</span>
          <Button>A Viewer</Button>
          <Button>A Brand</Button>
          <Button>An Artist</Button>
          <Button>A New Citizen Of Describer 😏</Button>
          <Button>Other</Button>
        </div>
      </TeaserSubContainer>
      <TeaserSubContainer paddingTop borderTop></TeaserSubContainer>
    </div>
  );
}
