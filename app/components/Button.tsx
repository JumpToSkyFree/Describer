import { ComponentProps } from "react";
import { motion } from "framer-motion";
import ButtonBase from "./Base/Button";

export function Button({
  children,
  ...props
}: ComponentProps<typeof ButtonBase>) {
  return <ButtonBase {...props}>{children}</ButtonBase>;
}

export function MotionButton({
  children,
  ...props
}: ComponentProps<typeof ButtonBase>) {
  return (
    <ButtonBase buttonComponent={motion.div} {...props}>
      {children}
    </ButtonBase>
  );
}
