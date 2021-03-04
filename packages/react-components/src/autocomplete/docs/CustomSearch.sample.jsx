const Planets = [
    { key: "earth", value: "Earth", canShow: true },
    { key: "jupiter", value: "Jupiter", canShow: true },
    { key: "mars", value: "Mars", canShow: true },
    { key: "mercury", value: "Mercury", canShow: false },
    { key: "neptune", value: "Neptune", canShow: false },
    { key: "saturn", value: "Saturn", canShow: false },
    { key: "uranus", value: "Uranus", canShow: false }
];

() => {
    const [selectedPlanets, setSelectedPlanets] = useState(Planets);

    const handleSearch = useCallback(query => {
        setSelectedPlanets(Planets.filter(x => x.value.toLowerCase().startsWith(query.toLowerCase()) && x.canShow));
    }, []);

    return (
        <Autocomplete
            items={selectedPlanets}
            onSearch={handleSearch}
            placeholder="Planets"
            aria-label="Planets"
        >
            {({ items }) => items.map((x => (
                <Item key={x.key}>{x.value}</Item>
            )))}
        </Autocomplete>
    );
};
