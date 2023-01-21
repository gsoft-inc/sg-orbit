import { ForwardedRef } from "react";
import { OmitInternalProps } from "@components/shared";
import { expectAssignable } from "@test-utils";

interface FirstType {
    a: string;
    b: string;
    forwardedRef: ForwardedRef<any>;
}

expectAssignable<OmitInternalProps<FirstType>>({ a: "", b: "" });
expectAssignable<OmitInternalProps<FirstType, "b">>({ a: "" });

// @ts-expect-error
expectAssignable<OmitInternalProps<FirstType>>({ a: "", b: "", forwardedRef: null });

// @ts-expect-error
expectAssignable<OmitInternalProps<FirstType, "b">>({ a: "", b: "" });
