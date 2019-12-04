export function getPreviousMonthFirstDay(date) {
    const previousMonth = date.subtract(1, "months");

    return previousMonth.startOf("month");
}

export function getNextMonthLastDay(date) {
    const nextMonth = date.add(1, "months");

    return nextMonth.endOf("month");
}

export function getMonthFirstDay(date) {
    return date.startOf("month");
}

export function getMonthLastDay(date) {
    return date.endOf("month");
}
