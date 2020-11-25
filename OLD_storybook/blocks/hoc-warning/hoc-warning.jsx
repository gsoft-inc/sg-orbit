import { WarningMessage } from "@stories/components";
import { bool, string } from "prop-types";
import Message from "./message.mdx";

const propTypes = {
    componentName: string,
    semanticPath: string,
    additionalProps: bool
};

const defaultProps = {
    additionalProps: true
};

export function HocWarning({ componentName, semanticPath, additionalProps }) {
    return (
        <WarningMessage className="mb6">
            <Message componentName={componentName} semanticPath={semanticPath} additionalProps={additionalProps} />
        </WarningMessage>
    );
}

HocWarning.propTypes = propTypes;
HocWarning.defaultProps = defaultProps;
