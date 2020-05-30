import { Dropdown } from "@react-components/dropdown-menu-2";
import { logClicked } from "./utils";
import { useState } from "react";

export function ControlledDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const labelStyle = {
        width: "80px"
    };

    return (
        <>
            <div className="mb6">
                <span className="dib fw6" style={labelStyle}>open:</span> {isOpen ? "true" : "false"}
            </div>
            <Dropdown
                title="Task"
                open={isOpen}
                onVisibilityChange={() => { setIsOpen(x => !x); }}
            >
                <Dropdown.ButtonItem onClick={logClicked}>Launch...</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={logClicked}>Eject...</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={logClicked}>Land...</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={logClicked}>Help</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={logClicked}>Exit</Dropdown.ButtonItem>
            </Dropdown>
        </>
    );
}
