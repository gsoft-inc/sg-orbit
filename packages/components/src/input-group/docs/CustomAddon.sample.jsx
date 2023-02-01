const FlexText = as(Flex, Text);

function CustomAddon({ children, ...props }) {
    const [inputGroupAddonProps] = useInputGroupAddonProps();

    return (
        <FlexText
            {...mergeProps(
                props,
                {
                    alignItems: "center",
                    height: 6,
                    border: "#ADACAC",
                    padding: "0 0.625rem",
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
