import { MultiVariantIcon } from "./icon";

export function createOrbitIcon(icon24, icon32) {
    return props => {
        return <MultiVariantIcon icon24={icon24} icon32={icon32} {...props} />;
    };
}
