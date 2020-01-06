import { BrandPicker } from "../../brand-picker";
import { Packages } from "./packages";
import { string } from "prop-types";

const propTypes = {
    packageName: string.isRequired
};

export function ReactComponentsDocsContainer({ packageName }) {
    return (
        <>
            <BrandPicker />
            <Packages packageName={packageName} />
        </>
    );
}

ReactComponentsDocsContainer.propTypes = propTypes;
