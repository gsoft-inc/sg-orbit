import { A } from "@react-components/html";
import { ComponentProps, createRef } from "react";
import { expectAssignable } from "@typescript/tests";

expectAssignable<ComponentProps<typeof A>>({ href: "https://www.google.com", rel: "external", target: "_blank" });

expectAssignable<ComponentProps<typeof A>>({ width: "100px", display: "block", color: "red" });

expectAssignable<ComponentProps<typeof A>>({ ref: createRef() });
