import { Source } from "@storybook/components";
import { bool, string } from "prop-types";
import { isNil } from "lodash";
import { useState } from "react";
import dedent from "dedent";

const propTypes = {
    filePath: string.isRequired,
    language: string,
    format: bool
};

const defaultProps = {
    language: "jsx",
    format: true
};

export function FileSource({ filePath, language, format }) {
    const [source, setSource] = useState(null);

    if (isNil(source)) {
        import(/* webpackMode: "eager" */ `!!raw-loader!@root/packages/react-components/src${filePath}.sample.jsx`)
            .then(module => {
                setSource(module.default);
            });

        return null;
    }

    return (
        <Source language={language} dark format={false} code={format ? dedent(source) : source} />
    );
}

FileSource.propTypes = propTypes;
FileSource.defaultProps = defaultProps;
