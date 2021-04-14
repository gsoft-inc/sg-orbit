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
                <Section title="Actions">
                    <Item key="launch">Launch...</Item>
                    <Item key="eject">Eject...</Item>
                    <Item key="land">Land...</Item>
                </Section>
                <Section title="Others">
                    <Item key="help">Help</Item>
                    <Item key="exit">Exit</Item>
                </Section>
            </Menu>
        </MenuTrigger>
    );
};
