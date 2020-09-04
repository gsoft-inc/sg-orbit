export function cssModule(moduleName, ...values) {
    const classes = values
        .filter(Boolean)
        .map(x => `${moduleName}-${x}`);

    classes.unshift(moduleName);

    return classes.join(" ");
}
