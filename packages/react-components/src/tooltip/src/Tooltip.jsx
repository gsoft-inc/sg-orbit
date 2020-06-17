import { Popup as SemanticPopup } from "semantic-ui-react";
import { SemanticRef, mergeClasses } from "../../shared";
import { bool } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    flush: bool
};

export function InnerTooltip(props) {
    const { flush, className, forwardedRef, children, ...rest } = props;

    return (
        <SemanticRef innerRef={forwardedRef}>
            <SemanticPopup
                {...rest}
                className={mergeClasses(
                    flush && "flush",
                    className
                )}
            >
                {children}
            </SemanticPopup>
        </SemanticRef>
    );
}

InnerTooltip.propTypes = propTypes;

export const Tooltip = forwardRef((props, ref) => (
    <InnerTooltip { ...props } forwardedRef={ref} />
));

[InnerTooltip, Tooltip].forEach(x => {
    x.Content = SemanticPopup.Content;
    x.Header = SemanticPopup.Header;
});
