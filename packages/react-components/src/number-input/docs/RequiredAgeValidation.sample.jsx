() => {
    const [value, setValue] = useState(18);

    const handleValueChange = useCallback((event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    }, [setValue]);

    const handleClearClick = useCallback(() => {
        setValue(null);
    }, [setValue]);

    const isValid = useMemo(() => !isNil(value), [value]);

    return (
        <Inline verticalAlign="center">
            <NumberInput
                validationState={isValid ? "valid" : "invalid"}
                value={value}
                min={1}
                placeholder="Age"
                onValueChange={handleValueChange}
            />
            <TextLink
                as="button"
                onClick={handleClearClick}
            >
                clear
            </TextLink>
        </Inline>
    );
};
