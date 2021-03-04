export function cssModule(moduleName: string, ...values: (false | string)[]) {
    const classes = values
        .filter(Boolean)
        .map(x => `${moduleName}-${x}`);

    classes.unshift(moduleName);

    return classes.join(" ");
}
