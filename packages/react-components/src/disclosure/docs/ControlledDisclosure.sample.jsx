() => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = useCallback((event, newValue) => {
        setIsOpen(newValue);
        console.log(newValue);
    }, [setIsOpen]);

    return (
        <Disclosure
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <TextLink as="button">
                <Text>EVE Online</Text>
                <ChevronIcon className={isOpen ? "rotate-270" : "rotate-90"} />
            </TextLink>
            <Box>
                Eve Online is a space-based, persistent world massively multiplayer online role-playing game (MMORPG) developed and published by CCP Games.
                Players of Eve Online can participate in a number of in-game professions and activities, including mining, piracy, manufacturing, trading, exploration,
                and combat (both player versus environment and player versus player). The game contains a total of 7,800 star systems that can be visited by players.
            </Box>
        </Disclosure>
    );
};
