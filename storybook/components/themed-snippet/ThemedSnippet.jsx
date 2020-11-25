// import { BRANDS, useStorage } from "@shared/brands";
import { Source } from "@storybook/components";
import { string } from "prop-types";
import { useThemedSnippet } from "./useThemedSnippet";
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

export function ThemedSnippet({ apricot, overcast, desktop, language, ...rest }) {
    // const [currentBrand] = useStorage();

    // let code = apricot;

    // if (currentBrand.id === BRANDS.overcast.id) {
    //     code = overcast;
    // }
    // else if (currentBrand.id === BRANDS.desktop.id) {
    //     code = desktop;
    // }

    const code = useThemedSnippet({
        apricot,
        overcast,
        desktop
    });

    return (
        <Source
            {...rest}
            language={language}
            dark
            format={false}
            code={dedent(code)}
        />
    );
}

ThemedSnippet.propTypes = propTypes;
ThemedSnippet.defaultProps = defaultProps;
