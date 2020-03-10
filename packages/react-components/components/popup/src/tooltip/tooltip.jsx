import { Ref, Popup as SemanticPopup } from "semantic-ui-react";
import { any, bool, func, object, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { mergeClasses } from "@orbit-ui/react-components-shared";

const propTypes = {
    flush: bool,
    /**
     * @ignore
     */
    trigger: any.isRequired,
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    flush: false
};

export function PureTooltip(props) {
    const { flush, className, forwardedRef, children, ...rest } = props;

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderTooltip()}
            </Ref>
        );
    };

    const renderTooltip = () => {
        const classes = mergeClasses(
            flush && "flush",
            className
        );

        return (
            <SemanticPopup className={classes} {...rest}>
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
