() => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState("Mars");

    const handleOpenChange = useCallback((event, newValue) => {
        setIsOpen(newValue);
        console.log(newValue);
    }, [setIsOpen]);

    const handleSelectionChange = useCallback((event, selection) => {
        setValue(!isNil(selection) ? selection.value : null);
        console.log(selection);
    }, [setValue]);

    return (
        <Autocomplete
            open={isOpen}
            value={value}
            placeholder="Planets"
            onOpenChange={handleOpenChange}
            onSelectionChange={handleSelectionChange}
            aria-label="Planets"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Autocomplete>
    );
};
