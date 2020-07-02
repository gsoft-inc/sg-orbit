import { forwardRef } from "react";

export const DropdownDivider = forwardRef((props, ref) => {
    return (
        <div
            {...props}
            ref={ref}
        />
    );
});
