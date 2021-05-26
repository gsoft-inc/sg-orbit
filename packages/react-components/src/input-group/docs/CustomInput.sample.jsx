function CustomInput(props) {
    const [inputGroupProps] = useInputGroupProps();

    return (
        <input
            {...mergeProps(
                props,
                {
                    type: "text",
                    style: {
                        height: "var(--o-ui-global-scale-hotel)",
                        borderLeft: "1px solid hsla(223, 12%, 87%, 1)",
                        borderTop: "1px solid hsla(223, 12%, 87%, 1)",
                        borderBottom: "1px solid hsla(223, 12%, 87%, 1)",
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
            <CustomInput />
            <Text>passengers</Text>
        </InputGroup>
    );
});
