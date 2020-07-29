import { CrossIcon, IconGroup, MagnifierIcon } from "@react-components/icons";
import { IconButton } from "@react-components/button";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { cloneElement } from "react";

function RedBox() {
    return (
        <div className="w3 h3 bg-red" />
    );
}

function TextInput({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTextInputTestSuite(element, stories) {
    stories
        .add("default", () =>
            <Stack>
                <Inline align="end">
                    <TextInput size="small" element={element} />
                    <TextInput element={element} />
                    <TextInput size="large" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput loading size="small" element={element} />
                    <TextInput loading element={element} />
                    <TextInput loading size="large" element={element} />
                </Inline>
                <div>
                    <TextInput fluid element={element}></TextInput>
                </div>
                <div className="w-10">
                    <TextInput fluid element={element}></TextInput>
                </div>
                <div>
                    <TextInput loading fluid element={element}></TextInput>
                </div>
            </Stack>
        )
        .add("placeholder", () =>
            <Stack>
                <Inline align="end">
                    <TextInput size="small" placeholder="Where to?" element={element} />
                    <TextInput placeholder="Where to?" element={element} />
                    <TextInput size="large" placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput loading size="small" placeholder="Where to?" element={element} />
                    <TextInput loading placeholder="Where to?" element={element} />
                    <TextInput loading size="large" placeholder="Where to?" element={element} />
                </Inline>
                <div>
                    <TextInput fluid placeholder="Where to?" element={element}></TextInput>
                </div>
                <div className="w-10">
                    <TextInput fluid placeholder="Where to?" element={element}></TextInput>
                </div>
                <div>
                    <TextInput loading fluid placeholder="Where to?" element={element}></TextInput>
                </div>
            </Stack>
        )
        .add("value", () =>
            <Stack>
                <Inline align="end">
                    <TextInput size="small" defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput size="large" defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput loading size="small" defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput loading defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput loading size="large" defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
                <Inline>
                    <TextInput placeholder="Where to?" defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput value="SpaceX will win the race!" element={element} />
                </Inline>
                <div>
                    <TextInput fluid placeholder="Where to?" element={element}></TextInput>
                </div>
                <div className="w-10">
                    <TextInput fluid placeholder="Where to?" element={element}></TextInput>
                </div>
                <div>
                    <TextInput loading fluid placeholder="Where to?" element={element}></TextInput>
                </div>
            </Stack>
        )
        .add("prefix & suffix", () =>
            <Stack>
                <Inline>
                    <TextInput prefix={<RedBox />} placeholder="Where to?" element={element} />
                    <TextInput prefix={<RedBox />} defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
                <Inline>
                    <TextInput suffix={<RedBox />} placeholder="Where to?" element={element} />
                    <TextInput suffix={<RedBox />} defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
                <Inline>
                    <TextInput prefix={<RedBox />} suffix={<RedBox />} placeholder="Where to?" element={element} />
                    <TextInput loading prefix={<RedBox />} suffix={<RedBox />} placeholder="Where to?" element={element} />
                    <TextInput loading suffix={<RedBox />} placeholder="Where to?" element={element} />
                </Inline>
                <div>
                    <TextInput fluid prefix={<RedBox />} suffix={<RedBox />} placeholder="Where to?" element={element} />
                </div>
            </Stack>
        )
        .add("icon", () =>
            <Stack>
                <Inline align="end">
                    <TextInput size="small" prefix={<MagnifierIcon />} placeholder="Where to?" element={element} />
                    <TextInput prefix={<MagnifierIcon />} placeholder="Where to?" element={element} />
                    <TextInput size="large" prefix={<MagnifierIcon />} placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput size="small" suffix={<MagnifierIcon />} placeholder="Where to?" element={element} />
                    <TextInput suffix={<MagnifierIcon />} placeholder="Where to?" element={element} />
                    <TextInput size="large" suffix={<MagnifierIcon />} placeholder="Where to?" element={element} />
                </Inline>
                <Inline>
                    <TextInput prefix={<MagnifierIcon />} suffix={<MagnifierIcon />} placeholder="Where to?" element={element} />
                    <TextInput prefix={<IconGroup><MagnifierIcon /><MagnifierIcon /></IconGroup>} placeholder="Where to?" element={element} />
                </Inline>
            </Stack>
        )
        .add("button", () =>
            <Stack>
                <Inline align="end">
                    <TextInput size="small" suffix={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                    <TextInput suffix={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                    <TextInput size="large" suffix={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                </Inline>
                <div>
                    <TextInput prefix={<MagnifierIcon />} suffix={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                </div>
            </Stack>
        )
        .add("text", () =>
            <Stack>
                <Inline align="end">
                    <TextInput size="small" prefix={<Text>$</Text>} placeholder="Where to?" element={element} />
                    <TextInput prefix={<Text>$</Text>} placeholder="Where to?" element={element} />
                    <TextInput size="large" prefix={<Text>$</Text>} placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput size="small" suffix={<Text>$</Text>} placeholder="Where to?" element={element} />
                    <TextInput suffix={<Text>$</Text>} placeholder="Where to?" element={element} />
                    <TextInput size="large" suffix={<Text>$</Text>} placeholder="Where to?" element={element} />
                </Inline>
                <div>
                    <TextInput size="small" prefix={<Text>$</Text>} suffix={<Text>$</Text>} placeholder="Where to?" element={element} />
                </div>
            </Stack>
        )
        .add("error", () =>
            <Inline align="end">
                <TextInput color="error" size="small" placeholder="Where to?" element={element} />
                <TextInput color="error" placeholder="Where to?" element={element} />
                <TextInput color="error" size="large" placeholder="Where to?" element={element} />
            </Inline>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <TextInput active size="small" placeholder="Where to?" element={element} />
                    <TextInput active placeholder="Where to?" element={element} />
                    <TextInput active size="large" placeholder="Where to?" element={element} />
                    <TextInput loading active size="large" placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput focus size="small" placeholder="Where to?" element={element} />
                    <TextInput focus placeholder="Where to?" element={element} />
                    <TextInput focus size="large" placeholder="Where to?" element={element} />
                    <TextInput loading focus size="large" placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput hover size="small" placeholder="Where to?" element={element} />
                    <TextInput hover placeholder="Where to?" element={element} />
                    <TextInput hover size="large" placeholder="Where to?" element={element} />
                    <TextInput loading hover size="large" placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput focus hover size="small" placeholder="Where to?" element={element} />
                    <TextInput focus hover placeholder="Where to?" element={element} />
                    <TextInput focus hover size="large" placeholder="Where to?" element={element} />
                    <TextInput loading focus hover size="large" placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput disabled size="small" placeholder="Where to?" element={element} />
                    <TextInput disabled placeholder="Where to?" element={element} />
                    <TextInput disabled size="large" placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput readOnly size="small" placeholder="Where to?" element={element} />
                    <TextInput readOnly placeholder="Where to?" element={element} />
                    <TextInput readOnly size="large" placeholder="Where to?" element={element} />
                </Inline>
            </Stack>
        )
        .add("styling", () =>
            <Inline>
                <TextInput className="bg-red" element={element} />
                <TextInput style={{ backgroundColor: "red" }} element={element} />
                <TextInput wrapperProps={{ className: "border-red" }} element={element} />
                <TextInput wrapperProps={{ style: { border: "1px solid red" } }} element={element} />
            </Inline>
        );
}
