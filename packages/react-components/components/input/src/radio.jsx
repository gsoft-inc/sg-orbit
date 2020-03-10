import { Ref, Checkbox as SemanticCheckbox } from "semantic-ui-react";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = ["as", "defaultIndeterminate", "indeterminate", "slider", "toggle", "type"];

export function PureRadio(props) {
    const { forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-input/radio");

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderRadio()}
            </Ref>
        );
    };

    const renderRadio = () => {
        return (
            <SemanticCheckbox
                radio
                {...rest}
            />
        );
    };

    return isNil(forwardedRef) ? renderRadio() : renderWithRef();
}

export const Radio = forwardRef((props, ref) => (
    <PureRadio { ...props } forwardedRef={ref} />
));

