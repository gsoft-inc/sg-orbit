import { Popup as SemanticPopup } from "semantic-ui-react";
import { SemanticRef, mergeClasses } from "../../shared";
import { any, bool } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    flush: bool,
    /**
     * @ignore
     */
    trigger: any.isRequired
};

const defaultProps = {
    flush: false
};

export function InnerTooltip(props) {
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

InnerTooltip.propTypes = propTypes;
InnerTooltip.defaultProps = defaultProps;

export const Tooltip = forwardRef((props, ref) => (
    <InnerTooltip { ...props } forwardedRef={ref} />
));

[InnerTooltip, Tooltip].forEach(x => {
    x.Content = SemanticPopup.Content;
    x.Header = SemanticPopup.Header;
});
