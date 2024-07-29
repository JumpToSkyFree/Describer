// import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Form } from "@remix-run/react";
import { Input } from "./Input";
import { useEffect, useRef } from "react";
import Logo from "./Base/Logo";
import { AnimationSequence, animate, ElementOrSelector } from "framer-motion";
import { Button } from "./Button";
// import { animate } from "framer-motion";

export default function JoinWaitingList() {
  const { t } = useTranslation();
  const ref = useRef<HTMLFormElement | null>(null);
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
      className="lg:col-start-5 lg:col-end-9 grid gap-[24px]"
    >
      <Logo />
      <div className="w-full flex flex-col justify-center items-center">
        <span className="text-[32px] select-none">Join waiting list</span>
      </div>
      <Input
        className="capitalize placeholder:capitalize"
        type="text"
        name="fullname"
        placeholder="Full name"
        required
      />
      <Input name="email" type="email" placeholder="Email" required />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
