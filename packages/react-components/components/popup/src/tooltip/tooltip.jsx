import { Ref, Popup as SemanticPopup } from "semantic-ui-react";
import { bool, func, object, oneOfType } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = [];

const propTypes = {
    flush: bool,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    flush: false
};

export function PureTooltip(props) {
    const { flush, forwardedRef, children, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-popup/tooltip");

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderTooltip()}
            </Ref>
        );
    };

    const renderTooltip = () => {
        return (
            <SemanticPopup {...rest}>
                {children}
            </SemanticPopup>
        );
    };

    return isNil(forwardedRef) ? renderTooltip() : renderWithRef();
}

PureTooltip.propTypes = propTypes;
PureTooltip.defaultProps = defaultProps;

export const Tooltip = forwardRef((props, ref) => (
    <PureTooltip { ...props } forwardedRef={ref} />
));

[PureTooltip, Tooltip].forEach(x => {
    x.Content = SemanticPopup.Content;
    x.Header = SemanticPopup.Header;
});
