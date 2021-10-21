const TagButton = as(Box, "button");

function CustomComponent({
    value,
    children,
    ...rest
}) {
    const [{ checked: isChecked, onCheck, ...checkableProps }] = useCheckableProps({ value });

    const handleCheck = useCallback(event => {
        onCheck(event, value);
    }, [value, onCheck]);

    return (
        <TagButton
            {...rest}
            {...checkableProps}
            value={value}
            onClick={handleCheck}
            color={isChecked ? "white" : undefined}
            backgroundColor={isChecked ? "primary-6" : "secondary-6"}
            aria-checked={isChecked}
        >
            {children}
        </TagButton>
    );
}

render(() => {
    return (
        <RadioGroup gap={2} orientation="horizontal">
            <CustomComponent value="mars">Mars</CustomComponent>
            <CustomComponent value="jupiter">Jupiter</CustomComponent>
            <CustomComponent value="pluton">Pluton</CustomComponent>
        </RadioGroup>
    );
});
