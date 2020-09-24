import { RadioGroup } from "@react-components/radio";
import { Tag } from "@react-components/tag";
import { useCallback } from "react";
import { useCheckable } from "@react-components/shared";

function CustomComponent({
    value,
    children,
    ...rest
}) {
    const [{ checked: isChecked, onCheck, ...checkableProps }] = useCheckable({ value });

    const handleCheck = useCallback(event => {
        onCheck(event, value);
    }, [value, onCheck]);

    return (
        <Tag
            {...rest}
            {...checkableProps}
            as="button"
            value={value}
            onClick={handleCheck}
            className={isChecked ? "white bg-primary-500" : "bg-secondary-500"}
            aria-checked={isChecked}
        >
            {children}
        </Tag>
    );
}

export function CustomGroup() {
    return (
        <RadioGroup gap={2} orientation="horizontal">
            <CustomComponent value="mars">Mars</CustomComponent>
            <CustomComponent value="jupiter">Jupiter</CustomComponent>
            <CustomComponent value="pluton">Pluton</CustomComponent>
        </RadioGroup>
    );
}
