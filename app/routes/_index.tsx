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
// import { postUserInformation } from "~/fetchers/waitingList";
// import { WaitingListApiEndPoint } from "~/fetchers/Interfaces";
import { useActionData } from "@remix-run/react";
import { useServerContext, ServerContext } from "describer-server-context";
import { db } from "~/db.server";
import { z } from "zod";

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

const userInformationsValudator = z.object({
  fullname: z.string().min(1),
  email: z.string().min(1),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  try {
    const result = userInformationsValudator.parse({
      fullname: formData.get("fullname"),
      email: formData.get("email"),
    });

    db.userWaiting.create({ data: result });
    return json({ success: true });
  } catch (e) {
    const result = e as Zod.ZodError;
    console.log(result.errors);
    const response = result.errors.map((error) => ({
      field: error.path[0],
      code: error.code,
    }));

    return json(response);
  }

  // db.userWaiting.create({});

  // const data: WaitingListApiEndPoint = {
  //   fullname: formData.get("fullname") as string,
  //   email: formData.get("email") as string,
  // };

  // const response = await postUserInformation(data);

  // if (response.data["error_code"]) {
  //   return json({
  //     ...response.data,
  //   });
  // }
}

export default function Index() {
  const actionData = useActionData<typeof action>();

  const [contexts, updateContext] = useServerContext({
    initialValue: {
      joinWaitingList: actionData,
    },
    dependencies: [actionData],
  });

  const [state, send] = useMachine(userCategorizationUIMachine);

  return (
    <ServerContext.Provider
      value={{
        contexts: contexts,
        updateContext,
      }}
    >
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
    </ServerContext.Provider>
  );
}
