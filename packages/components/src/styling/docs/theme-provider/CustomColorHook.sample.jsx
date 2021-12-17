() => {
    const color = useColorValue("#fff", "#000");
    const backgroundColor = useColorValue("#ff9048", "#fee2bb");

    return (
        <Button
            color={color}
            backgroundColor={backgroundColor}
        >
            Cutoff
        </Button>
    );
};
