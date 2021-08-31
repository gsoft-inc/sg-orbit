import { ComponentProps, ReactNode, forwardRef } from "react";
import { Flex, useFlexAlignment } from "../../layout";
import { InternalProps, Keys, OmitInternalProps, OrbitComponentProps, isNil, isNumber, mergeProps, useAutoFocusChild, useFocusManager, useFocusScope, useKeyboardNavigation, useMergedRefs, useRovingFocus } from "../../shared";
import { ToolbarContext } from "./ToolbarContext";

const DefaultElement = "div";

export interface InnerToolbarProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * The horizontal alignment of the elements.
     */
    align?: "start" | "end" | "center";
    /**
     * Whether or not the toolbar should autoFocus the first tabbable element on render.
     */
    autoFocus?: boolean | number;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the toolbar elements are disabled.
     */
    disabled?: boolean;
    /**
     * Whether the toolbar take up the width of its container.
     */
    fluid?: boolean;
    /**
     * The space between the elements.
     */
    gap?: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13) | string;
    /**
     * The orientation of the elements.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * The vertical alignment of the elements.
     */
    verticalAlign?: "start" | "end" | "center";
    /**
     * Whether or not the elements are forced onto one line or can wrap onto multiple lines
     */
    wrap?: boolean;
}

const NavigationKeyBinding = {
    horizontal: {
        first: [Keys.home],
        last: [Keys.end],
        next: [Keys.arrowRight],
        previous: [Keys.arrowLeft]
    },
    vertical: {
        first: [Keys.home],
        last: [Keys.end],
        next: [Keys.arrowDown],
        previous: [Keys.arrowUp]
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
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerToolbarProps) {
    const [focusScope, setFocusRef] = useFocusScope();

    const containerRef = useMergedRefs(setFocusRef, forwardedRef);

    const focusManager = useFocusManager(focusScope);

    useRovingFocus(focusScope);

    useAutoFocusChild(focusManager, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus
    });

    const arrowNavigationProps = useKeyboardNavigation(focusManager, NavigationKeyBinding[orientation]);

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
                    "aria-orientation": orientation,
                    as,
                    gap,
                    ref: containerRef,
                    role: "toolbar",
                    wrap: !isNil(wrap) ? "wrap" : undefined
                } as const,
                alignProps,
                arrowNavigationProps
            )}
        >
            <ToolbarContext.Provider
                value={{
                    disabled,
                    orientation
                }}
            >
                {children}
            </ToolbarContext.Provider>
        </Flex>
    );
}

export const Toolbar = forwardRef<any, OmitInternalProps<InnerToolbarProps>>((props, ref) => (
    <InnerToolbar {...props} forwardedRef={ref} />
));

export type ToolbarProps = ComponentProps<typeof Toolbar>;
