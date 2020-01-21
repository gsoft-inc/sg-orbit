import { WarningMessage } from "@blocks";
import { string } from "prop-types";
import Message from "./message.mdx";

const propTypes = {
    componentName: string,
    semanticPath: string
};

export function HocWarning({ componentName, semanticPath }) {
    return (
        <div className="mb6">
            <WarningMessage>
                <Message componentName={componentName} semanticPath={semanticPath} />
            </WarningMessage>
        </div>
    );
}

HocWarning.propTypes = propTypes;
