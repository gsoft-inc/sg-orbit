import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode } from "react";
import { Inline, InlineProps } from "../../layout";
import { augmentElement, forwardRef, mergeProps, omitProps } from "../../shared";
import { useFormContext } from "./FormContext";

export interface InnerRowProps {
    /**
     * Whether or not the fields take up the width of its container.
     */
    fluid?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>
}


export function InnerRow(props: InnerRowProps) {
    const [formProps] = useFormContext();

    const {
        fluid,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(formProps, ["disabled"])
    );

    return (
        <Inline
            {...mergeProps<Partial<InlineProps>[]>(
                rest,
                {
                    fluid,
                    gap: 4,
                    align: "start",
                    ref: forwardedRef
                }
            )}
        >
            {Children.map(children, (x: ReactElement) => {
                return augmentElement(x, {
                    fluid
                });
            })}
        </Inline>
    );
}

export const Row = forwardRef<InnerRowProps>((props, ref) => (
    <InnerRow {...props} forwardedRef={ref} />
));

export type RowProps = ComponentProps<typeof Row>

Row.displayName = "Row";
