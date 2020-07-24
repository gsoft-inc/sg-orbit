import { RadioGroup } from "@react-components/radio";
import { Tag } from "@react-components/tag";
import { useCallback } from "react";
import { useCheckableContext } from "@react-components/shared";

function CustomComponent({
    value,
    children,
    ...rest
}) {
    const { isCheckedValue, onCheck } = useCheckableContext(value);

    const handleCheck = useCallback(event => {
        onCheck(event, value);
    }, [value, onCheck]);

    return (
        <Tag
            {...rest}
            as="button"
            onClick={handleCheck}
            className={isCheckedValue ? "white bg-primary-500" : "bg-secondary-500"}
            aria-checked={isCheckedValue}
        >
            {children}
        </Tag>
    );
}

export function CustomGroup() {
    return (
        <RadioGroup direction="row">
            <CustomComponent value="mars">Mars</CustomComponent>
            <CustomComponent value="jupiter">Jupiter</CustomComponent>
            <CustomComponent value="pluto">Pluto</CustomComponent>
        </RadioGroup>
    );
}
