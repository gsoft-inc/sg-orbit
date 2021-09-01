import { ReactNode } from "react";
import { expectAssignable } from "@typescript/tests";
import { getSlots } from "@react-components/shared";

const node: ReactNode = null;

const result = getSlots(node, {
    _: {
        defaultWrapper: null,
        required: ["text"]
    },
    icon: {
        className: "o-ui-accordion-icon"
    },
    text: {
        className: "o-ui-accordion-title",
        size: "inherit"
    }
});

expectAssignable<keyof typeof result>("icon");
expectAssignable<keyof typeof result>("text");

// @ts-expect-error
expectAssignable<keyof typeof result>("other");
