import { TupleTypes, mergeProps } from "../../src";
import { expectAssignable } from "@typescript/tests";

const a1: { a?: string; b?: string } = {};

const a2: { c: string } = { c: "value" };

const a3: { d: boolean } = { d: true };

const result = mergeProps(a1, a2, a3);

expectAssignable<{ a?: string; b?: string; c?: string; d: boolean }>(result);

const expectedType = "a" as number | boolean | string;

expectAssignable<TupleTypes<[number, boolean, string]>>(expectedType);
expectAssignable<TupleTypes<(number | boolean | string)[]>>(expectedType);
