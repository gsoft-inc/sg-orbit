import { Source } from "@storybook/components";
import { isNil } from "lodash";
import { string } from "prop-types";
import { useState } from "react";

const propTypes = {
    relativeFilePath: string.isRequired
};

export function TachyonsFile({ relativeFilePath }) {
    const [content, setContent] = useState(null);

    if (isNil(content)) {
        import(/* webpackMode: "eager" */ `!!raw-loader!../../../packages/tachyons/src${relativeFilePath}`)
            .then(module => {
                setContent(module.default);
            });
    }

    if (!isNil(content)) {
        return <Source language="css" dark format={false} code={content} />;
    }

    return null;
}

TachyonsFile.propTypes = propTypes;
