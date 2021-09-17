function ColorSchemePicker() {
    const { colorScheme, setColorScheme } = useThemeContext();

    return (
        <Inline
            gap={1}
            backgroundColor="alias-1"
        >
            <TextLink
                onClick={() => setColorScheme("light")}
                fontWeight={colorScheme === "light" ? 600 : undefined}
            >
                Light
            </TextLink>
            <Divider orientation="vertical" />
            <TextLink
                onClick={() => setColorScheme("dark")}
                fontWeight={colorScheme === "dark" ? 600 : undefined}
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
                <Button variant="primary">Cutoff</Button>
                <ColorSchemePicker />
            </Stack>
        </ThemeProvider>
    );
});
