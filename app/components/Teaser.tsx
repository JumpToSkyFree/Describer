import {
  ComponentProps,
  PropsWithChildren,
  useContext,
  // useState,
} from "react";
import classNames from "~/utils/classNames";
import Marquee from "react-fast-marquee";
// import UserCategorization from "./UserCategorization";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import UserCategorizationMachineCtx from "~/contexts/UserCategorizationMachineCtx";
import AnimatedIntroductionLogo from "./AnimatedIntroductionLogo";

function TeaserIntroduction() {
  const { t } = useTranslation();

  return (
    <>
      <AnimatedIntroductionLogo />
      <p className="sm:block text-[0.8750rem] sm:text-[1rem] leading-[150%] text-justify font-light text-gray-5">
        {t("description")}
      </p>
    </>
  );
}

interface TeaserSubContainerProps {
  borderTop?: boolean;
  paddingTop?: boolean;
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
        "gap-[20px]",
        {
          "border-t border-gray-1 dark:border-gray-9": borderTop,
          "pt-[20px]": paddingTop,
        },
        className
      )}
      {...props}
    ></div>
  );
}

export default function Teaser() {
  const { t } = useTranslation();
  const { send } = useContext(UserCategorizationMachineCtx);
  return (
    <>
      <TeaserSubContainer
        key={0}
        className="flex flex-col gap-[20px] mt-[20px] mx-[20px]"
      >
        <TeaserIntroduction />
      </TeaserSubContainer>
      <TeaserSubContainer key={1} className="px-[20px]" paddingTop borderTop>
        <Button
          className="w-full"
          onClick={() =>
            send({
              type: "categorization.ui.joinWaitingListClicked",
            })
          }
        >
          Join waiting list
        </Button>
      </TeaserSubContainer>
      <TeaserSubContainer
        key={2}
        className="flex flex-row mb-[20px] overflow-hidden"
        paddingTop
        borderTop
      >
        <Marquee autoFill>
          <span className="ml-[30px] mr-[30px] text-[42px] lg:text-[50px] font-light select-none cursor-default uppercase">
            {t("coming-soon")}
          </span>
        </Marquee>
      </TeaserSubContainer>
    </>
  );
}
