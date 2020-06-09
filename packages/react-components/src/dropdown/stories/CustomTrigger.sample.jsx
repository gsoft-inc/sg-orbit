import { Button } from "@react-components/button";
import { DropdownContext } from "@react-components/dropdown";
import { VerticalDotsIcon } from "@react-components/icons";
import { forwardRef, useContext } from "react";

export const CustomTrigger = forwardRef(({ onClick }, ref) => {
    const { isOpen, size } = useContext(DropdownContext);

    return (
        <Button
            size={size}
            circular
            primary={isOpen}
            secondary={!isOpen}
            icon={<VerticalDotsIcon />}
            onClick={onClick}
            ref={ref}
        />
    );
});
