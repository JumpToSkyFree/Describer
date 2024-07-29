import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { useContext } from "react";
import UserCategorizationMachineCtx from "~/contexts/UserCategorizationMachineCtx";
import { motion } from "framer-motion";
// import useMediaQuery from "~/hooks/useMediaQuery";

const categories = [
  {
    identifier: "viewer",
    translation: "UserCategorization.viewer",
  },
  {
    identifier: "brand",
    translation: "UserCategorization.brand",
  },
  {
    identifier: "artist",
    translation: "UserCategorization.artist",
  },
  {
    identifier: "citizen",
    translation: "UserCategorization.citizen",
  },
];

export default function UserCategorization() {
  const { t } = useTranslation();
  // const otherButtonRef = useRef<HTMLButtonElement | null>(null);
  const { send } = useContext(UserCategorizationMachineCtx);
  // const [otherCategorySelected, setOtherCategorySelected] = useState(false);

  return (
    <div className="flex flex-row justify-center items-center gap-[8px] flex-wrap overflow-hidden">
      <motion.div className="flex sm:flex-row flex-col justify-center items-center gap-[8px] flex-wrap">
        <span className="text-gray-5">Are you</span>
        {categories.map((category, index) => {
          return (
            <Button
              onClick={() => {
                send({
                  type: "categorization.picked",
                  value: category.identifier,
                });
              }}
              key={index}
            >
              {t(category.translation)}
            </Button>
          );
        })}
        <Button
          onClick={() => {
            send({
              type: "categorization.ui.otherClicked",
            });
          }}
          className="capitalize"
        >
          {t("other")}
        </Button>
      </motion.div>
    </div>
  );
}
