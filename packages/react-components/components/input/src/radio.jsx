import { Checkbox } from "@orbit-ui/react-input";
import { Ref } from "semantic-ui-react";
import { forwardRef } from "react";
import { isNil } from "lodash";

const UNSUPPORTED_PROPS = ["as", "defaultIndeterminate", "indeterminate", "slider", "toggle", "type"];

export function PureRadio(props) {
    const { forwardedRef, ...rest } = props;

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderRadio()}
            </Ref>
        );
    };

    const renderRadio = () => {
        return (
            <Checkbox
                radio
                unsupportedProps={UNSUPPORTED_PROPS}
                unsupportedPropsComponentName="@orbit-ui/react-input/radio"
                {...rest}
            />
        );
    };

    return isNil(forwardedRef) ? renderRadio() : renderWithRef();
}

export const Radio = forwardRef((props, ref) => (
    <PureRadio { ...props } forwardedRef={ref} />
));

