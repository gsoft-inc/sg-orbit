import "./InputGroup.css";

import { Box } from "../../box";
import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, useMemo } from "react";
import { ClearFieldContext, useFieldInputProps } from "../../field";
import { ClearToolbar, useToolbarProps } from "../../toolbar";
import { InputGroupContext } from "./InputGroupContext";
import { TextAddon } from "./TextAddon";
import { cssModule, forwardRef, getSlotKey, isNil, mergeProps, omitProps, resolveChildren } from "../../shared";

/*
TODO:
- Support field
- Support toolbar?

- Button -> outline & fluid?
- Select -> fluid?
- Menu -> it's the trigger who control
- Popover & Tooltip -> It's the trigger
*/

export interface InnerInputGroupProps {
    /**
     * Whether or not the input group take up the width of its container.
     */
    fluid?: boolean;
    /**
     * Whether or not the input group is disabled.
     */
    disabled?: boolean;
    /**
     * Whether or not the input group is readonly.
     */
    readOnly?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerInputGroup(props: InnerInputGroupProps) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps] = useFieldInputProps();

    const {
        fluid,
        disabled,
        readOnly,
        as = "div",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        fieldProps
    );

    const transformedChildren = useMemo(() => {
        const elements = Children.toArray(resolveChildren(children)).filter(x => !isNil(x));

        if (elements.length <= 1) {
            throw new Error("An input group component must have 2 or 3 children.");
        }

        return Children
            .toArray(children)
            .reduce((acc: ReactElement[], x: ReactElement, index) => {
                if (getSlotKey(x) === "text") {
                    // eslint-disable-next-line react/no-array-index-key
                    acc.push(<TextAddon {...x.props} key={index} />);
                } else {
                    acc.push(x);
                }

                return acc;
            }, []) as ReactNode[];
    }, [children]);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-input-group",
                        fluid && "fluid"
                    ),
                    as,
                    ref: forwardedRef
                }
            )}
        >
            <ClearToolbar>
                <ClearFieldContext>
                    <InputGroupContext.Provider
                        value={{
                            fluid,
                            disabled,
                            readOnly
                        }}
                    >
                        {transformedChildren}
                    </InputGroupContext.Provider>
                </ClearFieldContext>
            </ClearToolbar>
        </Box>
    );
}

export const InputGroup = forwardRef<InnerInputGroupProps>((props, ref) => (
    <InnerInputGroup {...props} forwardedRef={ref} />
));

export type InputGroupProps = ComponentProps<typeof InputGroup>;

InputGroup.displayName = "InputGroup";