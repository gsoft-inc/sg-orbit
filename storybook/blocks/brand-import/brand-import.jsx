import { BRANDS, useStorage2 } from "@shared/brands";
import { Source } from "@storybook/components";
import { string } from "prop-types";
import { useLocalStorage } from "@shared/use-storage";
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
    // const [currentBrand] = useStorage2();
    // const currentBrand = useStorage2();

    const [currentBrand, setValue] = useLocalStorage("@orbit-ui/storybook/selected-brand");

    // console.log("** useStorage", value);

    // return value;

    console.log("** BrandImport", currentBrand);

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
