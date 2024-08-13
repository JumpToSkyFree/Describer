import {
  ComponentProps,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useMotionValue } from "framer-motion";
import classNames from "~/utils/classNames";
import languages from "../../public/languages.json";
import i18nSettings from "../i18n";
import { useChangeLanguage, useLocale } from "remix-i18next/react";
import i18next, { changeLanguage } from "i18next";

type LanguagePickerProps = ComponentProps<"div">;

// eslint-disable-next-line react/display-name
const LanguagePicker = ({ className, ...props }: LanguagePickerProps) => {
  const languagesElements = useRef<Array<HTMLSpanElement>>(new Array(4));

  const [activeLanguage, setActiveLanguage] = useState(useLocale());
  const posX = useMotionValue(0);
  const [x, setX] = useState(0);

  // useChangeLanguage(activeLanguage);

  const availableLanguages = useMemo(() => {
    return languages.filter((lang: { code: string }) =>
      i18nSettings.supportedLngs.includes(lang.code)
    );
  }, []);

  function getIndexOfActiveLanguage() {
    let index = 0;
    languagesElements.current?.forEach((el, _index) => {
      const dataLang = el.getAttribute("data-lang");
      if (dataLang === activeLanguage) {
        index = _index;
      }
    });

    return index;
  }

  function nextLanguage() {
    const activeLang = getIndexOfActiveLanguage();

    if (posX.get() <= -50 && activeLang < i18nSettings.supportedLngs.length) {
      setX(
        -languagesElements.current[activeLang].getBoundingClientRect().width -
          30
      );

      changeLanguage(
        languagesElements.current[activeLang + 1].getAttribute(
          "data-lang"
        ) as string,
        (error) => {
          if (!error) {
            setActiveLanguage(
              languagesElements.current[activeLang + 1].getAttribute(
                "data-lang"
              ) as string
            );
          }
        }
      );
    } else if (posX.get() > 50 && activeLang >= 0) {
      setX(
        languagesElements.current[activeLang].getBoundingClientRect().width + 30
      );

      changeLanguage(
        languagesElements.current[activeLang - 1].getAttribute(
          "data-lang"
        ) as string,
        (error) => {
          if (!error) {
            setActiveLanguage(
              languagesElements.current[activeLang + 1].getAttribute(
                "data-lang"
              ) as string
            );
          }
        }
      );
    }
  }

  return (
    <div
      className={classNames(
        className,
        "w-[270px] h-[37.72px] hover:cursor-pointer border rounded-[12px] bg- border-gray-1 bg-cnt-light dark:border-gray-9 dark:bg-cnt-dark flex flex-row items-center overflow-hidden"
      )}
      // ref={ref}
      {...props}
    >
      <motion.div
        className="p-[16px] flex items-center h-full gap-[30px]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{
          x: posX,
        }}
        animate={{
          translateX: `${x}px`,
        }}
        draggable="false"
        onDragEnd={() => {
          nextLanguage();
        }}
      >
        {availableLanguages.map(
          (lang: { code: string; native: string }, index: number) => {
            return (
              <span
                ref={(el) => {
                  if (el) languagesElements.current[index] = el;
                }}
                data-lang={lang.code}
                className={classNames({
                  "opacity-20": activeLanguage !== lang.code,
                })}
                key={index}
              >
                {lang.native}
              </span>
            );
          }
        )}
      </motion.div>
    </div>
  );
};

export default LanguagePicker;
