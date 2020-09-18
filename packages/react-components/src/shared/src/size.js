export const SIZE = {
    _3xs: "3xs",
    _2xs: "2xs",
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    _2xl: "2xl",
    _3xl: "3xl",
    _4xl: "4xl",
    _5xl: "5xl"
};

export function getSizeClass(size) {
    return size || SIZE.md;
}
