import { Popup as SemanticPopup } from "semantic-ui-react";
import { SemanticRef, mergeClasses } from "../../shared";
import { any, bool, func, object, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

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

    const classes = mergeClasses(
        flush && "flush",
        className
    );

    return (
        <SemanticRef innerRef={forwardedRef}>
            <SemanticPopup
                {...rest}
                className={classes}
            >
                {children}
            </SemanticPopup>
        </SemanticRef>
    );
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
