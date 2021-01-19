() => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState("earth");

    return (
        <Select
            open={isOpen}
            selectedKey={selectedKey}
            placeholder="Planets"
            onVisibilityChange={(event, newValue) => {
                setIsOpen(newValue);
                console.log(newValue);
            }}
            onChange={(event, newValue) => {
                setSelectedKey(newValue);
                console.log(newValue);
            }}
            aria-label="Planets"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Select>
    );
};
