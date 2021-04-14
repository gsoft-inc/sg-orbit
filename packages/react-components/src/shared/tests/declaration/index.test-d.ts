import { arrayify } from "../../../../dist-types";
import { expectType } from "tsd";

expectType<string[]>(arrayify("foo"));
