import "./Accordion.css";

import { ComponentProps, ReactNode, forwardRef, useMemo } from "react";
import { DisclosureArrow } from "../../disclosure";
import { Heading, Text } from "../../typography";
import { InteractionProps, InternalProps, OmitInternalProps, cssModule, isNil, mergeProps, omitProps, useSlots } from "../../shared";

export interface InnerAccordionHeaderProps extends InternalProps, InteractionProps {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the tab is disabled.
     */
    disabled?: boolean;
    /**
    * The header item props
    */
    header?: {
        key: string;
    };
}

export function InnerAccordionHeader(props: InnerAccordionHeaderProps) {
    const {
        active,
        as,
        children,
        disabled,
        focus,
        forwardedRef,
        hover,
        ...rest
    } = omitProps(props, ["header"]);

    if (isNil(as)) {
        throw new Error("An accordion header must receive an \"as\" prop matching a valid heading type.");
    }

    const { counter, icon, text } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        counter: {
            color: "inherit",
            pushed: true,
            size: "inherit",
            variant: "divider"
        },
        icon: {
            className: "o-ui-accordion-icon"
        },
        text: {
            className: "o-ui-accordion-title",
            size: "inherit"
        }
    }), []));

    return (
        <Heading
            as={as}
            className="o-ui-accordion-header"
            ref={forwardedRef}
            size="2xs"
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

export const AccordionHeader = forwardRef<any, OmitInternalProps<InnerAccordionHeaderProps>>((props, ref) => (
    <InnerAccordionHeader {...props} forwardedRef={ref} />
));

export type AccordionHeaderProps = ComponentProps<typeof AccordionHeader>;
