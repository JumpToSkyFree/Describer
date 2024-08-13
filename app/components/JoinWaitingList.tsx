// import { useTranslation } from "react-i18next";
import { Form } from "@remix-run/react";
import { Input } from "./Input";
import { useEffect, useLayoutEffect, useRef } from "react";
import Logo from "./Base/Logo";
import { AnimationSequence, animate, ElementOrSelector } from "framer-motion";
import { Button } from "./Button";
import { useConsumeServerContext } from "describer-server-context";
import { JoinWaitingListServerContext } from "./interfaces";
import useLocalStorageState from "use-local-storage-state";

function checkUserRegistered(response: JoinWaitingListServerContext) {
  return response && "success" in response;
}

export default function JoinWaitingList() {
  const ref = useRef<HTMLFormElement | null>(null);
  const [registered, setRegistered] = useLocalStorageState(
    "registeredInNewsletter",
    {
      defaultValue: false,
    }
  );

  const [context] =
    useConsumeServerContext<JoinWaitingListServerContext>("joinWaitingList");

  useLayoutEffect(() => {
    console.log(context);
    if (checkUserRegistered(context)) setRegistered(true);
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
        className="capitalize placeholder:capitalize"
        type="text"
        name="fullname"
        placeholder="Full name"
        required
      />
      <Input name="email" type="email" placeholder="Email" required />
      <Button
        disabled={registered || checkUserRegistered(context)}
        type="submit"
      >
        {registered || checkUserRegistered(context)
          ? "Registered successfully"
          : "Submit"}
      </Button>
    </Form>
  );
}
