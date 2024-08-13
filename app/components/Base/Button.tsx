/* eslint-disable react/display-name */
import { ComponentProps, forwardRef, ForwardRefExoticComponent } from "react";
import classNames from "~/utils/classNames";

export type ButtonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttonComponent?: ForwardRefExoticComponent<any>;
  disabled?: boolean;
} & Omit<ComponentProps<"button">, "ref">;

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ buttonComponent, children, className, disabled, ...props }, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let Component: ForwardRefExoticComponent<any> | string = "button";

    if (buttonComponent) {
      Component = buttonComponent;
    }

    return (
      <Component
        ref={ref}
        disabled={disabled}
        className={classNames(
          "px-[20px] transition-all text-[0.8750rem] sm:text-[1rem] py-[6px] rounded-[8px]",
          {
            "bg-gray-1 dark:bg-gray-9 cursor-pointer": !disabled,
            "bg-[#FBFBFB] dark:bg-[#0F0F0F] text-[#00000033] dark:text-[#ffffff33] cursor-not-allowed":
              disabled,
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

export default ButtonBase;
