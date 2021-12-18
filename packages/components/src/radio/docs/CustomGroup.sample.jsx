const TagButton = as(Box, "button");

function CustomComponent({ value, children, ...rest }) {
    const [{ checked: isChecked, onCheck, ...checkableProps }] = useCheckableProps({ value });

    const handleCheck = useCallback(
        event => {
            onCheck(event, value);
        },
        [value, onCheck]
    );

    return (
        <TagButton
            {...rest}
            {...checkableProps}
            paddingX={4}
            paddingY={2}
            border="none"
            borderRadius="80px"
            fontSize={3}
            value={value}
            onClick={handleCheck}
            color={isChecked ? "white" : undefined}
            backgroundColor={isChecked ? "alias-accent" : "alias-warning-faint"}
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
