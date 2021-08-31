function CustomInput(props) {
    const [inputGroupProps] = useInputGroupProps();

    return (
        <input
            {...mergeProps(
                props,
                {
                    type: "text",
                    style: {
                        width: "225px",
                        height: "var(--o-ui-space-8)",
                        border: "1px solid hsla(223, 12%, 87%, 1)",
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
