import { Preview } from "@storybook/components";
import { isNil } from "lodash";
import { object, string } from "prop-types";
import { useState } from "react";

const propTypes = {
    filePath: string.isRequired,
    withSource: object
};

const defaultProps = {
    withSource: {
        format: false,
        language: "jsx"
    }
};

export function FileCanvas({ filePath, withSource, children, ...rest }) {
    const [source, setSource] = useState();

    if (isNil(source)) {
        import(/* webpackMode: "eager" */ `!!raw-loader!@root/packages/react-components/src${filePath}.sample.jsx`)
            .then(module => {
                setSource(module.default);
            });

        return null;
    }

    return (
        <Preview {...rest} withSource={{ code: source, ...withSource }}>
            {children}
        </Preview>
    );
}

FileCanvas.propTypes = propTypes;
FileCanvas.defaultProps = defaultProps;
