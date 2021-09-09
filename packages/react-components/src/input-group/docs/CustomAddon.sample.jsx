const FlexText = as(Flex, Text);

function CustomAddon({ children, ...props }) {
    const [inputGroupAddonProps] = useInputGroupAddonProps();

    return (
        <FlexText
            {...mergeProps(
                props,
                {
                    alignItems: "center",
                    height: 8,
                    border: "hsla(223, 12%, 87%, 1)",
                    padding: "0px 10px",
                    style: {
                        borderTopRightRadius: "var(--o-ui-input-border-radius)",
                        borderBottomRightRadius: "var(--o-ui-input-border-radius)"
                    }
                },
                inputGroupAddonProps
            )}
        >
            {children}
        </FlexText>
    );
}

render(() => {
    return (
        <InputGroup>
            <TextInput aria-label="Url" />
            <CustomAddon>.space</CustomAddon>
        </InputGroup>
    );
});
