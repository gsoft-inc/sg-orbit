() => {
    const fetcher = useAsyncSearch(async query => {
        const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries?namePrefix=${query}`, {
            method: "GET",
            headers: {
                "x-rapidapi-key": ApiKey,
                "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
                "useQueryString": true
            }
        });

        const json = await response.json();

        return json.data.map(x => ({
            key: x.code,
            value: x.name
        }));
    });

    return (
        <Autocomplete
            loading={fetcher.isLoading}
            onSearch={fetcher.search}
            placeholder="Select a country"
            aria-label="Countries"
        >
            {() => fetcher.items.map((x => (
                <Item key={x.key}>{x.value}</Item>
            )))}
        </Autocomplete>
    );
};
