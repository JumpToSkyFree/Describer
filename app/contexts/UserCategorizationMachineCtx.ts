import { useMachine } from "@xstate/react";
import { createContext } from "react";
import { userCategorizationUIMachine } from "~/machines/userCategorizationUIMachine";

type IUserCategorizationMachineCtx = {
  state: ReturnType<typeof useMachine<typeof userCategorizationUIMachine>>[0];
  send: ReturnType<typeof useMachine<typeof userCategorizationUIMachine>>[1];
};

const UserCategorizationMachineCtx =
  createContext<IUserCategorizationMachineCtx>(
    {} as IUserCategorizationMachineCtx
  );

export default UserCategorizationMachineCtx;
