import { Ref, Checkbox as SemanticCheckbox } from "semantic-ui-react";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = ["as", "defaultIndeterminate", "indeterminate", "slider", "radio", "type"];

export function PureToggle(props) {
    const { forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-input/toggle");

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderToggle()}
            </Ref>
        );
    };

    const renderToggle = () => {
        return (
            <SemanticCheckbox
                toggle
                {...rest}
            />
        );
    };

    return isNil(forwardedRef) ? renderToggle() : renderWithRef();
}

export const Toggle = forwardRef((props, ref) => (
    <PureToggle { ...props } forwardedRef={ref} />
));
