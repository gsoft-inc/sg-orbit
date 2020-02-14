import { element, string } from "prop-types";

export const MULTI_VARIANT_SHAPE = {
    icon: element.isRequired
};

export const VARIANT_SHAPE = {
    name: string.isRequired,
    iconComponent: element.isRequired,
    iconFileName: string.isRequired
};
