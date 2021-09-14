function CustomInput(props) {
    const [inputGroupProps] = useInputGroupProps();

    return (
        <HtmlInput
            {...mergeProps(
                props,
                {
                    type: "text",
                    width: "225px",
                    height: 8,
                    border: "hsla(223, 12%, 87%, 1)",
                    style: {
                        borderTopLeftRadius: "var(--o-ui-input-border-radius)",
                        borderBottomLeftRadius: "var(--o-ui-input-border-radius)"
                    }
                },
                inputGroupProps
            )}
        />
    );
}

render(() => {
    return (
        <InputGroup>
            <CustomInput aria-label="Number of passengers" />
            <Text>passengers</Text>
        </InputGroup>
    );
});
