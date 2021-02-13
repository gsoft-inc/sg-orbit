() => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = useCallback((event, newOpen) => {
        setIsOpen(newOpen);
        console.log(newOpen);
    }, [setIsOpen]);

    return (
        <PopoverTrigger
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <Button>Trigger</Button>
            <Popover>
                <Heading>WikiSpace</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            </Popover>
        </PopoverTrigger>
    );
};
