import { Button } from "@react-components/button";
import { VerticalDotsIcon } from "@react-components/icons";
import { forwardRef } from "react";

export const CustomTrigger = forwardRef(({ open, ...rest }, ref) => {
    return (
        <Button
            {...rest}
            circular
            primary={open}
            secondary={!open}
            icon={<VerticalDotsIcon />}
            ref={ref}
        />
    );
});

CustomTrigger.name = "DropdownTrigger";
