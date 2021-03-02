import { Autocomplete, useAsyncItems } from "@react-components/autocomplete";
import { GroupIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Item } from "@react-components/placeholders";
import { isNil } from "lodash";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";
import { useState } from "react";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Autocomplete")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Autocomplete placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="uranus">Uranus</Item>
        </Autocomplete>
    )
    .add("default value", () =>
        <Autocomplete defaultValue="Mars" placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
    .add("default value not matching any item", () =>
        <Autocomplete defaultValue="Toto" placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
    .add("trigger icon", () =>
        <Autocomplete icon={<GroupIcon />} placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
    .add("without placeholder", () =>
        <Autocomplete aria-label="Planets">
            <Item key="earth">Earth</Item>
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
    .add("fluid", () =>
        <Stack>
            <Autocomplete fluid placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
            <div className="w-10">
                <Autocomplete fluid placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Autocomplete>
            </div>
        </Stack>
    )
    .add("loading", () =>
        <Autocomplete loading placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
    .add("validation", () =>
        <Inline>
            <Autocomplete validationState="invalid" placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
            <Autocomplete validationState="valid" placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
        </Inline>
    )
    .add("overflowing value", () =>
        <Autocomplete defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry." placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
    .add("autofocus trigger", () =>
        <Autocomplete autoFocus placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
    .add("trigger states", () =>
        <Inline>
            <Autocomplete active placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
            <Autocomplete focus placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
            <Autocomplete hover placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
            <Autocomplete disabled placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
        </Inline>
    )
    .add("no results", () =>
        <Autocomplete defaultOpen placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
    .add("custom no results message", () =>
        <Autocomplete defaultOpen noResultsMessage="Custom no results message" placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
    .add("custom trigger width", () =>
        <Autocomplete style={{ width: "500px" }} defaultOpen placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
    .add("custom menu width", () =>
        <Autocomplete menuProps={{ style: { width: "500px" } }} defaultOpen placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
    .add("direction bottom", () =>
        <Autocomplete direction="bottom" defaultOpen placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
    .add("direction top", () =>
        <Autocomplete direction="top" defaultOpen placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>
    )
    .add("align start", () =>
        <Autocomplete align="start" menuProps={{ style: { width: "500px" } }} defaultOpen placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>,
         {
             ...paramsBuilder()
                 .canvasLayout({ paddingLeft: "200px" })
                 .build()
         }
    )
    .add("align end", () =>
        <Autocomplete align="end" menuProps={{ style: { width: "500px" } }} defaultOpen placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Autocomplete>,
         {
             ...paramsBuilder()
                 .canvasLayout({ paddingLeft: "400px" })
                 .build()
         }
    )
    .add("styling", () =>
        <Inline>
            <Autocomplete className="border-red" placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </Autocomplete>
            <Autocomplete style={{ border: "1px solid red" }} placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </Autocomplete>
        </Inline>
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
        const fetcher = useAsyncItems(async query => {
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
        });

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
    )
    .add("TEMP default value", () =>
        <Autocomplete defaultValue="Mars" placeholder="Select a planet" aria-label="Planets">
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
    .add("TEMP controlled", () => {
        const [value, setValue] = useState("Mababine");

        return (
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(!isNil(newValue) ? newValue.value : null);
                }}
                placeholder="Select a planet"
                aria-label="Planets"
            >
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
    });
