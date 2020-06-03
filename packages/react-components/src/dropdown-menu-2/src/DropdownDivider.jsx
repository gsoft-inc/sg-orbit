import "./DropdownDivider.css";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { forwardRef } from "react";

export const DropdownDivider = forwardRef((props, ref) => {
    return <SemanticDropdown.Divider {...props} ref={ref} />;
});
