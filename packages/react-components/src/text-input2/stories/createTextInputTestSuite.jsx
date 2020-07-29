import { CrossIcon, IconGroup, MagnifierIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { cloneElement } from "react";

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
        );
}
