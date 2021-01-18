() => {
    const [selectedKey, setSelectedKey] = useState("earth");

    return (
        <Listbox
            selectedKey={selectedKey}
            aria-label="Planets"
            onChange={(event, newValue) => {
                setSelectedKey(newValue);
            }}
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Listbox>
    );
};
