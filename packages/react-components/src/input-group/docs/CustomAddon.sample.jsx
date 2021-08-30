function CustomAddon({ children, ...props }) {
    const [inputGroupAddonProps] = useInputGroupAddonProps();

    return (
        <Text
            {...mergeProps(
                props,
                {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        height: "var(--o-ui-space-8)",
                        border: "1px solid hsla(223, 12%, 87%, 1)",
                        borderTopRightRadius: "var(--o-ui-input-border-radius)",
                        borderBottomRightRadius: "var(--o-ui-input-border-radius)",
                        padding: "0px 10px"
                    }
                },
                inputGroupAddonProps
            )}
        >
            {children}
        </Text>
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
