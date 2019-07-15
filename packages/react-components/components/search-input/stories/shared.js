import { searchInputResult } from "../src";

export const GEORGE_VALUE = "George";
export const LAURIE_VALUE = "Laurie";
export const CLARA_VALUE = "Clara";
export const FELIX_VALUE = "Felix";
export const AUDREY_VALUE = "Audrey";

export const DEFAULT_RESULTS = [
    searchInputResult("1", GEORGE_VALUE),
    searchInputResult("2", LAURIE_VALUE),
    searchInputResult("3", CLARA_VALUE),
    searchInputResult("4", FELIX_VALUE),
    searchInputResult("5", AUDREY_VALUE)
];

export function logValueChanged(event, value) {
    console.log("Value: ", value);
}
