function HighlightedTrigger({ children, ...rest }) {
    const { isOpen } = useDisclosureContext();

    return (
        <Button
            {...rest}
            variant={isOpen ? "primary" : "secondary"}
        >
            {children}
        </Button>
    );
}

render(() => {
    return (
        <Disclosure>
            <HighlightedTrigger>EVE Online</HighlightedTrigger>
            <Box>
                Eve Online is a space-based, persistent world massively multiplayer online role-playing game (MMORPG) developed and published by CCP Games.
                Players of Eve Online can participate in a number of in-game professions and activities, including mining, piracy, manufacturing, trading,
                exploration, and combat (both player versus environment and player versus player). The game contains a total of 7,800 star systems that can be visited by players.
            </Box>
        </Disclosure>
    );
});
