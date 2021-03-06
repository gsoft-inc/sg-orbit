function ColorSchemePicker() {
    const { colorScheme, setColorScheme } = useThemeContext();

    return (
        <Inline
            gap={1}
            className="background-1"
        >
            <TextLink
                onClick={() => setColorScheme("light")}
                className={cx({ "b": colorScheme === "light" })}
            >
                Light
            </TextLink>
            <Divider orientation="vertical" />
            <TextLink
                onClick={() => setColorScheme("dark")}
                className={cx({ "b": colorScheme === "dark" })}
            >
                Dark
            </TextLink>
        </Inline>
    );
}

render(() => {
    return (
        <ThemeProvider colorScheme="system" defaultColorScheme="light">
            <Stack>
                <Button color="primary">Cutoff</Button>
                <ColorSchemePicker />
            </Stack>
        </ThemeProvider>
    );
});
