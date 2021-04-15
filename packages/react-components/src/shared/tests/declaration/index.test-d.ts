import { arrayify } from ".";
import { expectType } from "tsd";

expectType<boolean[]>(arrayify("foo"));
