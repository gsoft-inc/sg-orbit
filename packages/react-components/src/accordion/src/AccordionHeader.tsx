import "./Accordion.css";

import { ComponentProps, ElementType, ForwardedRef, ReactNode, useMemo } from "react";
import { DisclosureArrow } from "../../disclosure";
import { Heading } from "../../heading";
import { InteractionStatesProps, adaptSize, cssModule, forwardRef, isNil, mergeProps, normalizeSize, omitProps, useSlots } from "../../shared";
import { Text } from "../../text";

export interface InnerAccordionHeaderProps extends InteractionStatesProps {
    /**
    * The header item props
    */
    header?: {
        key: string;
    };
    /**
     * An accordion header can vary in size.
     */
    size?: "sm" | "md";
    /**
     * Whether or not the tab is disabled.
     */
    disabled?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerAccordionHeader(props: InnerAccordionHeaderProps) {
    const {
        size,
        disabled,
        active,
        focus,
        hover,
        as,
        children,
        forwardedRef,
        ...rest
    } = omitProps(props, ["header"]);

    if (isNil(as)) {
        throw new Error("An accordion header must receive an \"as\" prop matching a valid heading type.");
    }

    const { icon, text } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: {
            size,
            className: "o-ui-accordion-icon"
        },
        text: {
            size: "inherit",
            className: "o-ui-accordion-title"
        }
    }), [size]));

    return (
        <Heading
            size={adaptSize(size, {
                "sm": "xs",
                "md": "sm"
            })}
            className={cssModule(
                "o-ui-accordion-header",
                normalizeSize(size)
            )}
            as={as}
            ref={forwardedRef}
        >
            <button
                {...mergeProps(
                    rest,
                    {
                        className: cssModule(
                            "o-ui-accordion-trigger",
                            active && "active",
                            focus && "focus",
                            hover && "hover",
                            icon && "has-icon"
                        ),
                        disabled
                    }
                )}
                type="button"
            >
                {icon}
                {text}
                <DisclosureArrow
                    size={size}
                    className="o-ui-accordion-arrow"
                />
            </button>
        </Heading>
    );
}

export const AccordionHeader = forwardRef<InnerAccordionHeaderProps>((props, ref) => (
    <InnerAccordionHeader {...props} forwardedRef={ref} />
));

export type AccordionHeaderProps = ComponentProps<typeof AccordionHeader>;

AccordionHeader.displayName = "AccordionHeader";
