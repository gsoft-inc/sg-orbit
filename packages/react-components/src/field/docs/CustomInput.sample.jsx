function CustomInput(props) {
    const [{ validationState, ...fieldProps }] = useFieldInputProps();

    return (
        <input
            {...props}
            {...fieldProps}
            type="text"
            className={mergeClasses(
                "o-ui-ba-1 o-ui-w-13",
                validationState === "invalid" && "o-ui-alias-b-negative-1"
            )}
        />
    );
}

render(() => {
    const [value, setValue] = useState("");

    const isValid = value.length < 2;

    const handleChange = useCallback(event => {
        setValue(event.target.value);
        console.log(event.target.value);
    }, [setValue]);

    return (
        <Field validationState={isValid ? "valid" : "invalid"}>
            <Label>Short input</Label>
            <CustomInput
                value={value}
                onChange={handleChange}
            />
            <ErrorMessage>Input is too long.</ErrorMessage>
        </Field>
    );
});
