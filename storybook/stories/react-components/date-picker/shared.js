export function logDatesChanged(event, startDate, endDate, preset) {
    console.log("Start: ", startDate, " End: ", endDate, "Preset: ", preset);
}

export function logDateChanged(event, date) {
    console.log("Date: ", date);
}

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

export function toStoryParametersPresets(presets) {
    return presets.reduce((accumulator, x) => {
        accumulator[x.text] = `${x.startDate.format("MMMM Do YYYY")} - ${x.endDate.format("MMMM Do YYYY")}`;

        return accumulator;
    }, {});
}

