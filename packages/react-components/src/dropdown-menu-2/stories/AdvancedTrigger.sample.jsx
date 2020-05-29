import { Button } from "@react-components/button";
import { VerticalDotsIcon } from "@react-components/icons";
import { forwardRef } from "react";

export const AdvancedTrigger = forwardRef(({ open, size, onClick }, ref) => {
    return (
        <Button
            size={size}
            circular
            primary={open}
            secondary={!open}
            icon={<VerticalDotsIcon />}
            onClick={onClick}
            ref={ref}
        />
    );
});

AdvancedTrigger.name = "DropdownTrigger";
