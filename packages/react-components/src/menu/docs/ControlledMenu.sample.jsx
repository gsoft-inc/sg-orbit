() => {
    const [selectedKey, setSelectedKey] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = useCallback((event, newOpen) => {
        setIsOpen(newOpen);
        console.log(newOpen);
    }, [setIsOpen]);

    const handleSelectionChange = useCallback((event, newKeys) => {
        setSelectedKey(newKeys);
        console.log(newKeys);
    }, []);

    return (
        <MenuTrigger
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <Button>Trigger</Button>
            <Menu
                selectionMode="single"
                selectedKeys={selectedKey}
                onSelectionChange={handleSelectionChange}
            >
                <Item key="launch">Launch...</Item>
                <Item key="eject">Eject...</Item>
                <Item key="land">Land...</Item>
                <Item key="help">Help</Item>
                <Item key="exit">Exit</Item>
            </Menu>
        </MenuTrigger>
    );
};
