export function bemify(cssModule, ...values) {
    const classes = values
        .filter(Boolean)
        .map(x => cssModule + x)
        .join(" ");

    return `${cssModule} ${classes}`;
}
