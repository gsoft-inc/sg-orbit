import { WarningMessage } from "@blocks";
import { string } from "prop-types";
import Message from "./message.mdx";

const propTypes = {
    componentName: string,
    semanticPath: string
};

export function HocWarning({ componentName, semanticPath }) {
    return (
        <WarningMessage className="mb6">
            <Message componentName={componentName} semanticPath={semanticPath} />
        </WarningMessage>
    );
}

HocWarning.propTypes = propTypes;
