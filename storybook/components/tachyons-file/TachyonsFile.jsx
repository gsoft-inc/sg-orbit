import { isNil } from "@react-components/shared";
import { string } from "prop-types";
import { useState } from "react";

const propTypes = {
    filePath: string.isRequired
};

export function TachyonsFile({ filePath, ...rest }) {
    const [content, setContent] = useState();

    if (isNil(content)) {
        import(/* webpackMode: "eager" */ `!!raw-loader!@root/packages/tachyons/docs/dist${filePath}`)
            .then(module => {
                setContent(module.default);
            });

        return null;
    }

    return (
        <pre {...rest}>
            <code className="f8 o-70">
                {content}
            </code>
        </pre>
    );
}

TachyonsFile.propTypes = propTypes;
