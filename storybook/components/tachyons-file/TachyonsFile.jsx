import { isNil } from "lodash";
import { string } from "prop-types";
import { useState } from "react";

const propTypes = {
    relativeFilePath: string.isRequired
};

export function TachyonsFile({ relativeFilePath: relativePath }) {
    const [content, setContent] = useState();

    if (isNil(content)) {
        import(/* webpackMode: "eager" */ `!!raw-loader!@root/packages/tachyons/docs/dist${relativePath}`)
            .then(module => {
                setContent(module.default);
            });

        return null;
    }

    return (
        <pre>
            <code className="f9 o-70">
                {content}
            </code>
        </pre>
    );
}

TachyonsFile.propTypes = propTypes;
