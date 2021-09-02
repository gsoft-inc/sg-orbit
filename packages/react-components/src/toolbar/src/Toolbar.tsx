import { ComponentProps, ReactNode, forwardRef } from "react";
import { Flex, FlexAlignment, FlexOrientation, useFlexAlignment } from "../../layout";
import {
    InternalProps,
    Keys,
    OmitInternalProps,
    StyledComponentProps,
    isNumber,
    mergeProps,
    useAutoFocusChild,
    useFocusManager,
    useFocusScope,
    useKeyboardNavigation,
    useMergedRefs,
    useRovingFocus
} from "../../shared";
import { ToolbarContext } from "./ToolbarContext";

const DefaultElement = "div";

export interface InnerToolbarProps extends
    InternalProps,
    Omit<StyledComponentProps<typeof DefaultElement>, "display" | "alignItems" | "flex" | "flexDirection" | "flexWrap" | "justifyContent"> {
    /**
     * The horizontal alignment of the elements.
     */
    alignX?: FlexAlignment;
    /**
     * The vertical alignment of the elements.
     */
    alignY?: FlexAlignment;
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
     * The orientation of the elements.
     */
    orientation?: FlexOrientation;
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
    alignX,
    alignY,
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

    const alignProps = useFlexAlignment({
        alignX,
        alignY: orientation === "horizontal"
            ? alignY ?? "center"
            : alignY,
        orientation
    });

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
                    wrap: wrap ? "wrap" : undefined
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
