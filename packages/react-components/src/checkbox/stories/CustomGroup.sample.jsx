import { CheckboxGroup } from "@react-components/checkbox";
import { Tag } from "@react-components/tag";
import { useCallback } from "react";
import { useCheckableProps } from "@react-components/shared";

function CustomComponent(props) {
    const {
        value,
        checked,
        onCheck,
        children,
        ...rest
    } = useCheckableProps(props);

    const handleCheck = useCallback(event => {
        onCheck(event, value);
    }, [value, onCheck]);

    return (
        <Tag
            {...rest}
            as="button"
            onClick={handleCheck}
            className={checked ? "white bg-primary-500" : "bg-secondary-500"}
            aria-checked={checked}
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
