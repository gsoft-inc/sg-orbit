export function toStoryValuesPresets(presets) {
    return presets.reduce((accumulator, x) => {
        accumulator[x.text] = `${x.startDate.format("MMMM Do YYYY")} - ${x.endDate.format("MMMM Do YYYY")}`;

        return accumulator;
    }, {});
}

export function logDatesChanged(event, startDate, endDate, preset) {
    console.log("Start: ", startDate, " End: ", endDate, "Preset: ", preset);
}

export function logDateChanged(event, date) {
    console.log("Date: ", date);
}
