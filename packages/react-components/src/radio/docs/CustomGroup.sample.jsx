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
        <Tag
            {...rest}
            {...checkableProps}
            as="button"
            value={value}
            onClick={handleCheck}
            className={isChecked ? "white o-ui-bg-primary-6" : "o-ui-bg-secondary-500"}
            aria-checked={isChecked}
        >
            {children}
        </Tag>
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
