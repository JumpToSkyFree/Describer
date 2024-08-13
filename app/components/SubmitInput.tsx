/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { ComponentProps, forwardRef, ForwardRefExoticComponent } from "react";
import classNames from "~/utils/classNames";

export type InputProps = {
  inputComponent?: ForwardRefExoticComponent<any>;
  disabled?: boolean;
} & Omit<ComponentProps<"input">, "ref" | "type">;

const SubmitButton = forwardRef<HTMLInputElement, InputProps>(
  ({ inputComponent, children, className, disabled, ...props }, ref) => {
    let Component: ForwardRefExoticComponent<any> | string = "input";

    if (inputComponent) {
      Component = inputComponent;
    }

    return (
      <Component
        ref={ref}
        disabled={disabled}
        type="submit"
        className={classNames(
          "px-[20px] transition-all text-[0.8750rem] sm:text-[1rem] py-[6px] rounded-[8px] cursor-pointer",
          {
            "bg-gray-1 dark:bg-gray-9": !disabled,
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

export default SubmitButton;
