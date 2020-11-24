import { BRANDS, useStorage } from "../../../storybook/components/themed-snippet/node_modules/@shared/brands";
import { Source } from "@storybook/components";
import { string } from "prop-types";
import dedent from "dedent";

const propTypes = {
    apricot: string.isRequired,
    overcast: string.isRequired,
    desktop: string.isRequired,
    language: string
};

const defaultProps = {
    language: "javascript"
};

export function BrandImport({ apricot, overcast, desktop, language }) {
    const [currentBrand] = useStorage();

    let code = apricot;

    if (currentBrand.id === BRANDS.overcast.id) {
        code = overcast;
    }
    else if (currentBrand.id === BRANDS.desktop.id) {
        code = desktop;
    }

    return (
        <Source language={language} dark format={false} code={dedent(code)} />
    );
}

BrandImport.propTypes = propTypes;
BrandImport.defaultProps = defaultProps;
