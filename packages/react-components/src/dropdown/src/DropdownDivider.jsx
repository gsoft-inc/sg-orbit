import { forwardRef } from "react";
import { mergeClasses } from "../../shared";

export const DropdownDivider = forwardRef(({ className, ...rest }, ref) => {
    return (
        <div
            {...rest}
            className={mergeClasses(
                "divider",
                className
            )}
            ref={ref}
        />
    );
});
