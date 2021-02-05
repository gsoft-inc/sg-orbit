() => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = useCallback((event, newOpen) => {
        setIsOpen(newOpen);
        console.log(newOpen);
    }, [setIsOpen]);

    const handleSelect = useCallback((event, newKey) => {
        console.log(newKey);
    }, []);

    return (
        <MenuTrigger
            open={isOpen}
            onOpenChange={handleOpenChange}
            onSelect={handleSelect}
        >
            <Button>Trigger</Button>
            <Menu>
                <Item key="launch">Launch...</Item>
                <Item key="eject">Eject...</Item>
                <Item key="land">Land...</Item>
                <Item key="help">Help</Item>
                <Item key="exit">Exit</Item>
            </Menu>
        </MenuTrigger>
    );
};
