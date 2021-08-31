import { Children, ComponentProps, ReactElement, ReactNode, forwardRef } from "react";
import { Inline } from "../../layout";
import { InternalProps, OmitInternalProps, augmentElement, mergeProps, omitProps } from "../../shared";
import { useFormContext } from "./FormContext";

export interface InnerRowProps extends InternalProps {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the fields take up the width of its container.
     */
    fluid?: boolean;
}


export function InnerRow(props: InnerRowProps) {
    const [formProps] = useFormContext();

    const {
        children,
        fluid,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(formProps, ["disabled"])
    );

    return (
        <Inline
            {...mergeProps(
                rest,
                {
                    align: "start",
                    fluid,
                    gap: 4,
                    ref: forwardedRef
                } as const
            )}
        >
            {Children.toArray(children).filter(x => x).map((x: ReactElement) => {
                return augmentElement(x, {
                    fluid
                });
            })}
        </Inline>
    );
}

export const Row = forwardRef<any, OmitInternalProps<InnerRowProps>>((props, ref) => (
    <InnerRow {...props} forwardedRef={ref} />
));

export type RowProps = ComponentProps<typeof Row>;
