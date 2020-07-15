import { Button } from "@react-components/button";
import { DropdownContext } from "@react-components/dropdown";
import { forwardRef, useContext } from "react";

export const CustomTrigger = forwardRef(({ children, ...rest }, ref) => {
    const { isOpen } = useContext(DropdownContext);

    return (
        <Button
            {...rest}
            color={isOpen ? "primary" : "secondary"}
            ref={ref}
        >
            {children}
        </Button>
    );
});
