/* eslint-disable react/display-name */
import { forwardRef, PropsWithChildren } from "react";
import { motion } from "framer-motion";
// import ButtonBase, { ButtonProps } from "./Base/Button";
import InputBase, { InputProps } from "./Base/Input";

const Input = forwardRef<HTMLInputElement, PropsWithChildren<InputProps>>(
  ({ children, ...props }, ref) => {
    return (
      <InputBase ref={ref} {...props}>
        {children}
      </InputBase>
    );
  }
);

const InputMotion = forwardRef<HTMLInputElement, PropsWithChildren<InputProps>>(
  ({ children, ...props }, ref) => {
    return (
      <InputBase ref={ref} inputComponent={motion.div} {...props}>
        {children}
      </InputBase>
    );
  }
);

export { Input, InputMotion };
