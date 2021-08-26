import { ForwardedRef } from "react";
import { OmitForwardedRefProp } from "../../src";
import { expectAssignable } from "@typescript/tests";

interface FirstType {
    a: string;
    b: string;
    forwardedRef: ForwardedRef<any>;
}

expectAssignable<OmitForwardedRefProp<FirstType>>({ a: "", b: "" });
expectAssignable<OmitForwardedRefProp<FirstType, "b">>({ a: "" });

// @ts-expect-error
expectAssignable<OmitForwardedRefProp<FirstType>>({ a: "", b: "", forwardedRef: null });
// @ts-expect-error
expectAssignable<OmitForwardedRefProp<FirstType, "b">>({ a: "", b: "" });
