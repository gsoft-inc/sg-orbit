function CustomInput(props) {
    const [{ validationState, ...fieldProps }] = useFieldInputProps();

    return (
        <HtmlInput
            {...props}
            {...fieldProps}
            type="text"
            width={{
                base: "50%",
                sm: "20%"
            }}
            border={validationState === "invalid" ? "alias-alert" : "black"}
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
