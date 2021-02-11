import "./ComboBox.css";
import { forwardRef } from "react";

/*
TODO:
    - Work in form & fields? Should be
*/

const propTypes = {
};

export function InnerComboBox(props) {
}

InnerComboBox.propTypes = propTypes;

export const ComboBox = forwardRef((props, ref) => (
    <InnerComboBox {...props} forwardedRef={ref} />
));

ComboBox.displayName = "ComboBox";
