import "./Accordion.css";

import { ComponentProps, ElementType, ForwardedRef, ReactNode, useMemo } from "react";
import { DisclosureArrow } from "../../disclosure";
import { Heading } from "../../heading";
import { InteractionStatesProps, cssModule, forwardRef, isNil, mergeProps, omitProps, useSlots } from "../../shared";
import { Text } from "../../text";

export interface InnerAccordionHeaderProps extends InteractionStatesProps {
    /**
    * The header item props
    */
    header?: {
        key: string;
    };
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

    const { icon, text, counter } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: {
            className: "o-ui-accordion-icon"
        },
        text: {
            size: "inherit",
            className: "o-ui-accordion-title"
        },
        counter: {
            size: "inherit",
            variant: "divider",
            pushed: true
        }
    }), []));

    return (
        <Heading
            size="sm"
            className="o-ui-accordion-header"
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
                <div className="o-ui-accordion-trigger-content">
                    {icon}
                    {text}
                    {counter}
                </div>
                <DisclosureArrow className="o-ui-accordion-arrow" />
            </button>
        </Heading>
    );
}

export const AccordionHeader = forwardRef<InnerAccordionHeaderProps>((props, ref) => (
    <InnerAccordionHeader {...props} forwardedRef={ref} />
));

export type AccordionHeaderProps = ComponentProps<typeof AccordionHeader>;

AccordionHeader.displayName = "AccordionHeader";
