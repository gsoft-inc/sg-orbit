function CustomAddon({ children, ...props }) {
    const [inputGroupAddonProps] = useInputGroupAddonProps();

    return (
        <Box
            {...mergeProps(
                props,
                {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        height: "var(--o-ui-global-scale-hotel)",
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
        </Box>
    );
}

render(() => {
    return (
        <InputGroup>
            <TextInput />
            <CustomAddon>.space</CustomAddon>
        </InputGroup>
    );
});
