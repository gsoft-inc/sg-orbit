import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { Flex, useFlexAlignment, useFlexDirection } from "../../layout";
import { Keys, isNil, isNumber, mergeProps, useAutoFocusChild, useFocusManager, useFocusScope, useKeyboardNavigation, useMergedRefs, useRovingFocus } from "../../shared";
import { ToolbarContext } from "./ToolbarContext";

export interface InnerToolbarProps {
    /**
         * Whether or not the toolbar should autoFocus the first tabbable element on render.
         */
    autoFocus?: boolean | number;
    /**
     * The orientation of the elements.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * The horizontal alignment of the elements.
     */
    align?: "start" | "end" | "center";
    /**
     * The vertical alignment of the elements.
     */
    verticalAlign?: "start" | "end" | "center";
    /**
     * The space between the elements.
     */
    gap?: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13) | string;
    /**
     * Whether or not the elements are forced onto one line or can wrap onto multiple lines
     */
    wrap?: boolean;
    /**
     * Whether the toolbar take up the width of its container.
     */
    fluid?: boolean;
    /**
     * Whether or not the toolbar elements are disabled.
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


const NavigationKeyBinding = {
    horizontal: {
        previous: [Keys.arrowLeft],
        next: [Keys.arrowRight],
        first: [Keys.home],
        last: [Keys.end]
    },
    vertical: {
        previous: [Keys.arrowUp],
        next: [Keys.arrowDown],
        first: [Keys.home],
        last: [Keys.end]
    }
};

export function InnerToolbar({
    autoFocus,
    orientation = "horizontal",
    align,
    verticalAlign,
    gap = 5,
    wrap,
    disabled,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerToolbarProps) {
    const [focusScope, setFocusRef] = useFocusScope();

    const containerRef = useMergedRefs(setFocusRef, forwardedRef);

    const focusManager = useFocusManager(focusScope);

    useRovingFocus(focusScope);

    useAutoFocusChild(focusManager, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const arrowNavigationProps = useKeyboardNavigation(focusManager, NavigationKeyBinding[orientation]);

    const directionProps = useFlexDirection(orientation);

    const alignProps = useFlexAlignment(
        orientation,
        align,
        orientation === "horizontal"
            ? verticalAlign ?? "center"
            : verticalAlign
    );

    return (
        <Flex
            {...mergeProps(
                rest,
                {
                    role: "toolbar",
                    gap,
                    wrap: !isNil(wrap) ? "wrap" : undefined,
                    as,
                    ref: containerRef,
                    "aria-orientation": orientation
                } as const,
                directionProps,
                alignProps,
                arrowNavigationProps
            )}
        >
            <ToolbarContext.Provider
                value={{
                    orientation,
                    disabled
                }}
            >
                {children}
            </ToolbarContext.Provider>
        </Flex>
    );
}

export const Toolbar = forwardRef<any, Omit<InnerToolbarProps, "forwardedRef">>((props, ref) => (
    <InnerToolbar {...props} forwardedRef={ref} />
));

export type ToolbarProps = ComponentProps<typeof Toolbar>;

Toolbar.displayName = "Toolbar";
