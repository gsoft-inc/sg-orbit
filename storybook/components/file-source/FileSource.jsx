import { Source } from "@storybook/components";
import { isNil } from "lodash";
import { string } from "prop-types";
import { useState } from "react";

const propTypes = {
    filePath: string.isRequired,
    language: string
};

const defaultProps = {
    language: "jsx"
};

export function FileSource({ filePath, language, ...rest }) {
    const [source, setSource] = useState();

    if (isNil(source)) {
        import(/* webpackMode: "eager" */ `!!raw-loader!@root/packages/react-components/src${filePath}.sample.jsx`)
            .then(module => {
                setSource(module.default);
            });

        return null;
    }

    return (
        <Source
            {...rest}
            language={language}
            dark
            format={false}
            code={source}
        />
    );
}

FileSource.propTypes = propTypes;
FileSource.defaultProps = defaultProps;
