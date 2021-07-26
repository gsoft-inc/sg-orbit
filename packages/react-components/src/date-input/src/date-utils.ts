import { isNil } from "../../shared";

export function areEqualDates(x: Date, y: Date) {
    return x?.getTime() === y?.getTime();
}

export function toMidnightDate(date: Date) {
    if (!isNil(date)) {
        const newDate = new Date(date.getTime());
        newDate.setHours(0, 0, 0, 0);

        return newDate;
    }

    return null;
}
