import { ComponentProps, ReactNode, forwardRef } from "react";
import { Flex, FlexAlignmentProp, FlexOrientationProp, useFlexAlignment } from "../../layout";
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
import { ResponsiveProp, useResponsiveValue } from "../../styling";
import { ToolbarContext } from "./ToolbarContext";

const DefaultElement = "div";

export interface InnerToolbarProps extends
    InternalProps,
    Omit<StyledComponentProps<typeof DefaultElement>, "display" | "alignItems" | "flex" | "flexDirection" | "flexWrap" | "justifyContent"> {
    /**
     * The horizontal alignment of the elements.
     */
    alignX?: FlexAlignmentProp;
    /**
     * The vertical alignment of the elements.
     */
    alignY?: FlexAlignmentProp;
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
    fluid?: ResponsiveProp<boolean>;
    /**
     * The orientation of the elements.
     */
    orientation?: FlexOrientationProp;
    /**
     * Whether or not the elements are forced onto one line or can wrap onto multiple lines
     */
    wrap?: ResponsiveProp<boolean>;
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
    alignX,
    alignY,
    as = DefaultElement,
    autoFocus,
    children,
    disabled,
    forwardedRef,
    gap = 5,
    orientation = "horizontal",
    wrap = true,
    ...rest
}: InnerToolbarProps) {
    const alignXValue = useResponsiveValue(alignX);
    const alignYValue = useResponsiveValue(alignY);
    const orientationValue = useResponsiveValue(orientation);
    const wrapValue = useResponsiveValue(wrap);

    const [focusScope, setFocusRef] = useFocusScope();

    const containerRef = useMergedRefs(setFocusRef, forwardedRef);

    const focusManager = useFocusManager(focusScope);

    useRovingFocus(focusScope);

    useAutoFocusChild(focusManager, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus
    });

    const arrowNavigationProps = useKeyboardNavigation(focusManager, NavigationKeyBinding[orientationValue]);

    const alignProps = useFlexAlignment({
        alignX: alignXValue,
        alignY: orientationValue === "horizontal"
            ? alignYValue ?? "center"
            : alignYValue,
        orientation: orientationValue
    });

    return (
        <Flex
            {...mergeProps(
                rest,
                {
                    "aria-orientation": orientationValue,
                    as,
                    gap,
                    ref: containerRef,
                    role: "toolbar",
                    wrap: wrapValue ? "wrap" as const : undefined
                },
                alignProps,
                arrowNavigationProps
            )}
        >
            <ToolbarContext.Provider
                value={{
                    disabled,
                    orientation: orientationValue
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
