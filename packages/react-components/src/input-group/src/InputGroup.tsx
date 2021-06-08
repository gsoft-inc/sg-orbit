import "./InputGroup.css";

import { Box } from "../../box";
import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, useMemo } from "react";
import { ClearFieldContext, useFieldInputProps } from "../../field";
import { ClearToolbar, useToolbarProps } from "../../toolbar";
import { InputGroupContext } from "./InputGroupContext";
import { TextAddon } from "./TextAddon";
import { cssModule, forwardRef, getSlotKey, isNil, mergeProps, omitProps, resolveChildren, useHasChild, useMergedRefs } from "../../shared";

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

function toAddon(element: ReactElement, key?: number): ReactNode {
    if (getSlotKey(element) === "text") {
        return (
            <TextAddon key={key}>
                {element}
            </TextAddon>
        );
    }

    return element;
}

export function InnerInputGroup({
    fluid,
    disabled,
    readOnly,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerInputGroupProps) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps] = useFieldInputProps();

    const inputProps = mergeProps(
        {
            fluid,
            disabled,
            readOnly
        },
        omitProps(toolbarProps, ["orientation"]),
        fieldProps
    );

    const ref = useMergedRefs(forwardedRef);

    const transformedChildren = useMemo(() => {
        const elements = Children.toArray(resolveChildren(children)).filter(x => !isNil(x));

        if (elements.length <= 1) {
            throw new Error("An input group component must have 2 or 3 children.");
        }

        return Children
            .toArray(children)
            .reduce((acc: ReactNode[], x: ReactElement, index) => {
                acc.push(toAddon(x, index));

                return acc;
            }, []) as ReactNode[];
    }, [children]);

    const hasTextInput = useHasChild(".o-ui-input-group-text-input", ref);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-input-group",
                        fluid && "fluid",
                        hasTextInput && "has-text-input"
                    ),
                    as,
                    ref
                }
            )}
        >
            <ClearToolbar>
                <ClearFieldContext>
                    <InputGroupContext.Provider
                        value={inputProps}
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
