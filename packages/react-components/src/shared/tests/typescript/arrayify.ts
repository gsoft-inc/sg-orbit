import { arrayify } from "../../src";
import { expectAssignable } from "../../../../../../typescript/tests/helpers";

expectAssignable<number[]>(arrayify(1));
expectAssignable<number[]>(arrayify([1]));

// @ts-expect-error
expectAssignable<number[]>(arrayify(["1"]));
// @ts-expect-error
expectAssignable<number[]>(arrayify("1"));

expectAssignable<string[]>(arrayify(["1"]));
expectAssignable<string[]>(arrayify(["1"]));

// @ts-expect-error
expectAssignable<string[]>(arrayify([1]));
