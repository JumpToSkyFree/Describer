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
          "px-[20px] transition-all sm:text-[16px] py-[6px] rounded-[8px]",
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

export default ButtonBase;
