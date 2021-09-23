import "./Accordion.css";

import { ComponentProps, ElementType, ReactNode, forwardRef, useMemo } from "react";
import { DisclosureArrow } from "../../disclosure";
import { Div, HtmlButton } from "../../html";
import { H3, HeadingProps, Text } from "../../typography";
import { InteractionProps, InternalProps, OmitInternalProps, StyledComponentProps, cssModule, mergeProps, omitProps, useSlots } from "../../shared";

export interface InnerAccordionHeaderProps extends InternalProps, InteractionProps, StyledComponentProps<"button"> {
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
    header: {
        key: string;
    };
    /**
     * Additional props to render on the heading wrapper element.
     */
    headingProps?: Partial<HeadingProps>;
    /**
     * The heading component type.
     */
    headingType: ElementType | string;
}

export function InnerAccordionHeader(props: InnerAccordionHeaderProps) {
    const {
        active,
        children,
        disabled,
        focus,
        forwardedRef,
        hover,
        headingType: HeadingType = H3,
        headingProps,
        ...rest
    } = omitProps(props, ["header"]);

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
        <HeadingType
            {...mergeProps(
                headingProps ?? {},
                {
                    className: "o-ui-accordion-header",
                    size: "2xs"
                }
            )}
        >
            <HtmlButton
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
                        disabled,
                        ref: forwardedRef,
                        type: "button"
                    }
                )}
            >
                <Div className="o-ui-accordion-trigger-content">
                    {icon}
                    {text}
                    {counter}
                </Div>
                <DisclosureArrow className="o-ui-accordion-arrow" />
            </HtmlButton>
        </HeadingType>
    );
}

export const AccordionHeader = forwardRef<any, OmitInternalProps<InnerAccordionHeaderProps>>((props, ref) => (
    <InnerAccordionHeader {...props} forwardedRef={ref} />
));

export type AccordionHeaderProps = ComponentProps<typeof AccordionHeader>;
