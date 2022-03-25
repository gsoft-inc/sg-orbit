import { CSSProperties } from "react";
import { expectAssignable } from "@typescript/tests";
import { useStylingPropsAdapter } from "@components/input";

// eslint-disable-next-line react-hooks/rules-of-hooks
const result = useStylingPropsAdapter({
    marginTop: 10,
    randomProps: "randomValue",
    wrapperProps: {
        anotherRandomProps: "anotherRandomValue"
    }
}, {
    className: "earth"
});

expectAssignable<{
    randomProps: string;
    wrapperProps: {
        anotherRandomProps: string;
        className?: string;
        style?: CSSProperties;
    };
}>(result);
