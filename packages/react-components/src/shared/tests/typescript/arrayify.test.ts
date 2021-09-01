import { arrayify } from "@react-components/shared";
import { expectAssignable } from "@typescript/tests";

expectAssignable<number[]>(arrayify(1));
expectAssignable<number[]>(arrayify([1]));
expectAssignable<string[]>(arrayify(["1"]));
expectAssignable<string[]>(arrayify(["1"]));

// @ts-expect-error
expectAssignable<number[]>(arrayify(["1"]));

// @ts-expect-error
expectAssignable<number[]>(arrayify("1"));

// @ts-expect-error
expectAssignable<string[]>(arrayify([1]));
