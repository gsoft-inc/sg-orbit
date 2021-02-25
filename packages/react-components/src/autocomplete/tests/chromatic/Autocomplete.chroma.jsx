import { Autocomplete } from "@react-components/autocomplete";
import { Item } from "@react-components/placeholders";
import { NotificationIcon } from "@react-components/icons";
import { Text } from "@react-components/text";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";
import { useAsyncItems } from "../../../../dist";
import { useCallback, useState } from "react";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Autocomplete")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Autocomplete placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="mababou">Mababou</Item>
            <Item key="mababine">Mababine</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="uranus">Uranus</Item>
        </Autocomplete>
    )
    .add("selected item with start icon", () =>
        <Autocomplete placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">
                <NotificationIcon />
                <Text>Earth</Text>
            </Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
    .add("can clear value", () =>
        <Autocomplete defaultValue="Mars" placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
    .add("TEMP dynamic items", () =>
        <Autocomplete
            items={[
                { key: "earth", value: "Earth" },
                { key: "mars", value: "Mars" },
                { key: "saturn", value: "Saturn" }
            ]}
            placeholder="Select a planet"
            aria-label="Planets"
        >
            {({ items }) => items.map((x => (
                <Item key={x.key}>{x.value}</Item>
            )))}
        </Autocomplete>
    )
    .add("TEMP dynamic items + custom onSearch", () => {
        const planets = [
            { key: "earth", value: "Earth" },
            { key: "mars", value: "Mars" },
            { key: "saturn", value: "Saturn" }
        ];

        const [filteredPlanets, setPlanets] = useState(planets);

        return (
            <Autocomplete
                items={filteredPlanets}
                onSearch={query => {
                    const newPlanets = planets.filter(x => x.value.toLowerCase().includes(query.toLowerCase()));

                    setPlanets(newPlanets);
                }}
                placeholder="Select a planet"
                aria-label="Planets"
            >
                {({ items }) => items.map((x => (
                    <Item key={x.key}>{x.value}</Item>
                )))}
            </Autocomplete>
        );
    })
    .add("TEMP remote items", () => {
        const fetcher = useAsyncItems(useCallback(async query => {
            const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries?namePrefix=${query}`, {
                method: "GET",
                headers: {
                    "x-rapidapi-key": "8aa06f2e50msh9ff37516b3c0282p1e8624jsn81c867aa0d74",
                    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
                    "useQueryString": true
                }
            });

            const json = await response.json();

            return json.data.map(x => ({
                key: x.code,
                value: x.name
            }));
        }, []));

        return (
            <Autocomplete
                items={fetcher.items}
                loading={fetcher.isLoading}
                onSearch={fetcher.search}
                placeholder="Select a country"
                aria-label="Countries"
            >
                {({ items }) => items.map((x => (
                    <Item key={x.key}>{x.value}</Item>
                )))}
            </Autocomplete>
        );
    })
    .add("TEMP clear on select", () =>
        <Autocomplete clearOnSelect placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="mababou">Mababou</Item>
            <Item key="mababine">Mababine</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="uranus">Uranus</Item>
        </Autocomplete>
    );
