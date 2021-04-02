() => {
    const [selectedKeys, setSelectedKeys] = useState([]);

    const handleSelectionChange = useCallback((event, newKeys) => {
        setSelectedKeys(newKeys);
    }, [setSelectedKeys]);

    return (
        <MenuTrigger>
            <IconButton color="secondary" aria-label="View tasks">
                <VerticalDotsIcon />
            </IconButton>
            <Menu selectionMode="multiple" selectedKeys={selectedKeys} onSelectionChange={handleSelectionChange}>
                <Item key="launch">Launch...</Item>
                <Item key="eject">Eject...</Item>
                <Item key="land">Land...</Item>
                <Item key="help">Help</Item>
                <Item key="exit">Exit</Item>
            </Menu>
        </MenuTrigger>
    );
};
