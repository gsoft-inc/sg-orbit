import { expectAssignable } from "../../../../../../typescript/tests/helpers";
import { mergeProps } from "../../src";

const a1:{ a?:string; b?:string } = {};
const a2:{ c: string } = { c: "value" };
const a3:{ c: boolean; d: boolean } = { c: true, d: true };

const result = mergeProps(a1, a2, a3);
expectAssignable<{ a?:string; b?:string; c?:boolean; d: boolean }>(result);
