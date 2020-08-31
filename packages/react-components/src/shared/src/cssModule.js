export function cssModule(moduleName, ...values) {
    const classes = values
        .filter(Boolean)
        .map(x => `${moduleName}-${x}`)
        .join(" ");

    return `${moduleName} ${classes}`;
}
