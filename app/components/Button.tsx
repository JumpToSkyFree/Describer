/* eslint-disable react/display-name */
import { forwardRef, PropsWithChildren } from "react";
import { motion } from "framer-motion";
import ButtonBase, { ButtonProps } from "./Base/Button";

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  ({ children, ...props }, ref) => {
    return (
      <ButtonBase ref={ref} {...props}>
        {children}
      </ButtonBase>
    );
  }
);

const ButtonMotion = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(({ children, ...props }, ref) => {
  return (
    <ButtonBase ref={ref} buttonComponent={motion.div} {...props}>
      {children}
    </ButtonBase>
  );
});

export { Button, ButtonMotion };
