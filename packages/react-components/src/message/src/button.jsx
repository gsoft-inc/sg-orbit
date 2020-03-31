import { MessageContext } from "./context";
import { createIconForControl } from "../../icons";
import { element } from "prop-types";
import { useContext } from "react";

const propTypes = {
    button: element.isRequired
};

export function MessageButton({ button, ...rest }) {
    const context = useContext(MessageContext);

    return createIconForControl(button, context.size, rest);
}

MessageButton.propTypes = propTypes;
