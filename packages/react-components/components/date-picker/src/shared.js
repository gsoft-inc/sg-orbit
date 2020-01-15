import { isNil } from "lodash";

export const NAVIGATION_ROLE = "nav";

export function isSameDay(x, y) {
    if (isNil(x) || isNil(y)) {
        return false;
    }

    return x.date() === y.date() && x.month() === y.month() && x.year() === y.year();
}
