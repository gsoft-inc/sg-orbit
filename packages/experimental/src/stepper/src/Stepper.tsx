import { Box, InternalProps, OmitInternalProps, Span, StyledComponentProps, cssModule, mergeProps, useCollection, useOnlyCollectionItems } from "@orbit-ui/components";
import { ComponentProps, ReactNode, forwardRef, useMemo } from "react";

const DefaultElement = "div";

interface InnerStepperProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * A controlled selected key.
     */
    selectedKey?: string;
}

function InnerStepper(props: InnerStepperProps) {
    const {
        as = DefaultElement,
        children,
        selectedKey,
        forwardedRef,
        ...rest
    } = props;

    const steps = useOnlyCollectionItems(useCollection(children));
    const selectedIndex = useMemo(() => steps.findIndex(step => step.key === selectedKey), [steps, selectedKey]);

    return (
        <Box {...mergeProps(rest, { as, className: "o-ui-stepper", ref: forwardedRef })}>
            {steps.map((step, i) => (
                <Step
                    active={i === selectedIndex}
                    completed={i < selectedIndex}
                    key={step.key}
                    showConnector={i !== 0}
                >
                    {step.content}
                </Step>
            ))}
        </Box>
    );
}

interface StepProps {
    active?: boolean;
    children: ReactNode;
    completed: boolean;
    showConnector : boolean;
}

function Step({ active, children, completed, showConnector }: StepProps) {
    return (
        <Box
            className={
                cssModule(
                    "o-ui-step",
                    active && "active",
                    completed && "completed")
            }
        >
            {showConnector && <Box className={cssModule("o-ui-step-connector")} />}
            <Span className="o-ui-step-label">{children}</Span>
        </Box>
    );
}


InnerStepper.defaultElement = DefaultElement;

export const Stepper = forwardRef<any, OmitInternalProps<InnerStepperProps>>((props, ref) => (
    <InnerStepper {...props} forwardedRef={ref} />
));

export type StepperProps = ComponentProps<typeof Stepper>;
