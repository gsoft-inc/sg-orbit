import { A } from "@components/html";
import { ComponentProps, createRef } from "react";
import { expectAssignable } from "@test-utils";

type AProps = ComponentProps<typeof A>;

expectAssignable<AProps>({ href: "https://www.google.com", rel: "external", target: "_blank" });

expectAssignable<AProps>({ width: "6.25rem", display: "block", color: "red" });

expectAssignable<AProps>({ className: "toto", style: { border: "0.0625rem solid red" } });

expectAssignable<AProps>({ ref: createRef() });

// @ts-expect-error
expectAssignable<AProps>({ readOnly });

