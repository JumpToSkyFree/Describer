import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { AnimatePresence, motion, TargetAndTransition } from "framer-motion";
import Teaser from "~/components/Teaser";
import { useMachine } from "@xstate/react";
import { userCategorizationUIMachine } from "~/machines/userCategorizationUIMachine";
import UserCategorizationMachineCtx from "~/contexts/UserCategorizationMachineCtx";
import JoinWaitingList from "~/components/JoinWaitingList";

export const meta: MetaFunction = () => {
  return [
    { title: "Describer" },
    {
      name: "description",
      content:
        "Describer is a social network for artists, designers, brands, everyone.",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const { fullname, email } = await request.formData();
  return json({
    fullname: fullname,
    email: email,
  });
}

export default function Index() {
  const [state, send] = useMachine(userCategorizationUIMachine);
  return (
    <div className="h-screen flex flex-col justify-center">
      <UserCategorizationMachineCtx.Provider value={{ state, send }}>
        <div className="grid lg:grid-cols-12 gap-4 m-[20px]">
          <AnimatePresence>
            {!state.matches("hideIntro") && !state.matches("hiddenIntro") && (
              <motion.div
                key="categorization"
                onAnimationComplete={(definition) => {
                  if ((definition as TargetAndTransition).opacity === 0) {
                    send({
                      type: "categorization.ui.introHidden",
                    });
                  }
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 1, ease: "easeOut" },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 1, ease: "easeOut" },
                }}
                className="lg:col-start-4 bg-cnt-light dark:bg-cnt-dark lg:col-end-10 border border-gray-1 dark:border-gray-9 rounded-[20px] grid gap-[20px] overflow-hidden"
              >
                <Teaser />
              </motion.div>
            )}
          </AnimatePresence>
          {state.matches("hiddenIntro") && <JoinWaitingList />}
        </div>
      </UserCategorizationMachineCtx.Provider>
    </div>
  );
}
