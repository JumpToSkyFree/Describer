import { Form } from "@remix-run/react";
import { Input } from "./Input";
import { useEffect, useLayoutEffect, useRef } from "react";
import Logo from "./Base/Logo";
import { AnimationSequence, animate, ElementOrSelector } from "framer-motion";
import { Button } from "./Button";
import { useConsumeServerContext } from "describer-server-context";
import {
  FieldsResponseErrors,
  JoinWaitingListServerContext,
  WaitingListUserInformations,
} from "./interfaces";
import useLocalStorageState from "use-local-storage-state";

function checkUserRegistered(response: JoinWaitingListServerContext): boolean {
  // if (response && isFieldsResponseErrors(response)) {
  //   return response.errors["email"].codes.at(0) === "already_exists";
  // }

  return (
    response !== null && response && "success" in response && response.success
  );
}

export default function JoinWaitingList() {
  const ref = useRef<HTMLFormElement | null>(null);
  const [registered, setRegistered] =
    useLocalStorageState<WaitingListUserInformations>(
      "registeredInNewsletter",
      {
        defaultValue: null,
      }
    );

  const [context] =
    useConsumeServerContext<JoinWaitingListServerContext>("joinWaitingList");

  useLayoutEffect(() => {
    if (checkUserRegistered(context)) {
      setRegistered({
        fullname: (context as WaitingListUserInformations)?.fullname,
        email: (context as WaitingListUserInformations)?.email,
      } as WaitingListUserInformations);
      return;
    }

    if (context && "errors" in context) {
      setRegistered({
        fullname: (context as FieldsResponseErrors<WaitingListUserInformations>)
          .data?.fullname,
        email: (context as FieldsResponseErrors<WaitingListUserInformations>)
          .data?.email,
      } as WaitingListUserInformations);
    }
  }, [context]);

  // TODO: Make a mechanism for better error handling.
  // TODO: Make a component for handling errors.
  // TODO: Make a type conditional rendering.

  useEffect(() => {
    const sequence: AnimationSequence = [
      [ref.current as ElementOrSelector, { opacity: [0, 1] }, { duration: 1 }],
    ];
    sequence.at(0);
    animate(sequence);
  }, []);

  return (
    <Form
      ref={ref}
      method="post"
      action="/?index"
      className="lg:col-start-5 lg:col-end-9 grid gap-[16px]"
    >
      <Logo />
      <div className="w-full flex flex-col justify-center items-center">
        <span className="text-[1.5rem] sm:text-[2rem] select-none">
          Join waiting list
        </span>
      </div>
      <Input
        readOnly={registered !== null}
        disabled={registered !== null}
        className="capitalize placeholder:capitalize"
        type="text"
        name="fullname"
        placeholder="Full name"
        required
        value={registered !== null ? registered.fullname : undefined}
      />
      <Input
        readOnly={registered !== null}
        className="flex justify-center items-center"
        disabled={registered !== null}
        name="email"
        type="email"
        placeholder="Email"
        required
        value={registered !== null ? registered.email : undefined}
      />
      <Button disabled={registered !== null} type="submit">
        {registered !== null ? "Already joined waiting list" : "Submit"}
      </Button>
    </Form>
  );
}
