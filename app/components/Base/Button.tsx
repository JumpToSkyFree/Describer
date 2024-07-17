import { LinksFunction } from "@remix-run/node";
import { ComponentProps, ForwardRefExoticComponent } from "react";
import classNames from "~/utils/classNames";

type ButtonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttonComponent?: ForwardRefExoticComponent<any>;
} & ComponentProps<"button">;

export default function ButtonBase({
  buttonComponent,
  children,
  className,
  ...props
}: ButtonProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Component: ForwardRefExoticComponent<any> | string = "button";

  if (buttonComponent) {
    Component = buttonComponent;
  }

  return (
    <Component
      className={classNames(
        "pl-[20px] pr-[20px] h-[32px] border border-gray-1 dark:border-gray-9 rounded-[8px]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
