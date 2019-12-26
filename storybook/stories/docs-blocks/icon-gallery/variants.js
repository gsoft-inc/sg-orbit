import { func, string } from "prop-types";

export const VARIANT_SHAPE = {
    size: string.isRequired,
    cssClasses: string,
    getCopyValue: func
};
