import { isNil } from "lodash";
import { string } from "prop-types";
import { useState } from "react";

const propTypes = {
    relativeFilePath: string.isRequired
};

export function TachyonsFile({ relativeFilePath }) {
    const [content, setContent] = useState(null);

    if (isNil(content)) {
        import(/* webpackMode: "eager" */ `!!raw-loader!../../../packages/tachyons/docs/dist${relativeFilePath}`)
            .then(module => {
                setContent(module.default);
            });
    }

    if (!isNil(content)) {
        return <pre>{content}</pre>;
    }

    return null;
}

TachyonsFile.propTypes = propTypes;
