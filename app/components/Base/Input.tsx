/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { ComponentProps, forwardRef, ForwardRefExoticComponent } from "react";
import classNames from "~/utils/classNames";

export type InputProps = {
  inputComponent?: ForwardRefExoticComponent<any>;
  disabled?: boolean;
} & Omit<ComponentProps<"input">, "ref">;

const InputBase = forwardRef<HTMLInputElement, InputProps>(
  ({ inputComponent, children, className, disabled, ...props }, ref) => {
    let Component: ForwardRefExoticComponent<any> | string = "input";

    if (inputComponent) {
      Component = inputComponent;
    }

    return (
      <Component
        ref={ref}
        disabled={disabled}
        className={classNames(
          "px-[20px] transition-colors sm:text-[16px] py-[6px] rounded-[8px] placeholder:text-[#0000003d] dark:placeholder:text-[#ffffff3d] placeholder:font-normal focus-visible:outline-none focus:outline-none",
          {
            "bg-gray-0.5 dark:bg-gray-9.5": !disabled,
            "": disabled,
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

export default InputBase;
