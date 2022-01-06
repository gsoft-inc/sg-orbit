function ColorSchemeToggle() {
    const { colorScheme, setColorScheme } = useColorSchemeContext();

    const handleClick = useCallback(() => {
        setColorScheme(colorScheme === "light" ? "dark" : "light");
    }, [colorScheme, setColorScheme]);

    return (
        <Button variant="secondary" onClick={handleClick}>Toggle</Button>
    );
}

render(() => {
    const { colorScheme: parentColorScheme } = useColorSchemeContext();

    return (
        <ThemeProvider theme={ShareGateTheme} colorScheme={parentColorScheme}>
            <Div backgroundColor="alias-default" padding={2}>
                <ColorSchemeToggle />
            </Div>
        </ThemeProvider>
    );
});
