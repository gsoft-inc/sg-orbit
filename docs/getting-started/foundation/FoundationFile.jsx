import { FileLink } from "./FileLink";
import { VariablesTable } from "./variables-table";
import { isNil } from "lodash";
import { parse } from "css";
import { string } from "prop-types";
import { useState } from "react";

const propTypes = {
    relativeFilePath: string.isRequired
};

export function FoundationFile({ relativeFilePath }) {
    const [content, setContent] = useState();

    if (isNil(content)) {
        import(/* webpackMode: "eager" */ `!!raw-loader!@root/packages/foundation/src/atoms${relativeFilePath}`)
            .then(module => {
                const parsingResult = parse(module.default);
                const declarations = parsingResult.stylesheet.rules[0].declarations.filter(x => x.type === "declaration");
                const variables = declarations.map(x => ({ name: x.property, value: x.value }));

                setContent(variables);
            });
    }

    if (!isNil(content)) {
        return (
            <>
                <FileLink relativeFilePath={relativeFilePath} />
                <VariablesTable variables={content} />
            </>
        );
    }

    return null;
}

FoundationFile.propTypes = propTypes;
