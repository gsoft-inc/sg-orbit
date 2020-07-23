import { CheckboxGroup } from "@react-components/checkbox";
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
            className={isCheckedValue ? "bg-primary-500" : "bg-secondary-500"}
        >
            {children}
        </Tag>
    );
}

export function CustomGroup() {
    return (
        <CheckboxGroup>
            <CustomComponent value="milky-way">Milky Way</CustomComponent>
            <CustomComponent value="andromeda">Andromeda</CustomComponent>
            <CustomComponent value="medusa">Medusa</CustomComponent>
        </CheckboxGroup>
    );
}
