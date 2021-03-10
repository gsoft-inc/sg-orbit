import { CrossButton } from "@react-components/button";
import { Inline, Stack } from "@react-components/layout";
import { MagnifierIcon } from "@react-components/icons";
import { cloneElement } from "react";

function TextInput({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTextInputTestSuite(element, stories) {
    stories
        .add("default", () =>
            <Stack>
                <TextInput element={element} />
                <TextInput loading element={element} />
                <TextInput disabled element={element}></TextInput>
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
                <TextInput placeholder="Where to?" element={element} />
                <TextInput loading placeholder="Where to?" element={element} />
                <TextInput disabled placeholder="Where to?" element={element}></TextInput>
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
                <TextInput defaultValue="SpaceX will win the race!" element={element} />
                <TextInput loading defaultValue="SpaceX will win the race!" element={element} />
                <TextInput disabled defaultValue="SpaceX will win the race!" element={element} />
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
        .add("icon", () =>
            <Stack>
                <TextInput icon={<MagnifierIcon />} placeholder="Where to?" element={element} />
                <TextInput icon={<MagnifierIcon />} defaultValue="SpaceX will win the race!" element={element} />
                <TextInput disabled icon={<MagnifierIcon />} placeholder="Where to?" element={element} />
                <div>
                    <TextInput fluid icon={<MagnifierIcon />} placeholder="Where to?" element={element} />
                </div>
                <div className="w-10">
                    <TextInput fluid icon={<MagnifierIcon />} placeholder="Where to?" element={element} />
                </div>
            </Stack>
        )
        .add("button", () =>
            <Stack>
                <TextInput button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" element={element} />
                <TextInput button={<CrossButton aria-label="Clear value" />} defaultValue="SpaceX will win the race!" element={element} />
                <Inline>
                    <TextInput disabled button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" element={element} />
                    <TextInput readOnly button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" element={element} />
                </Inline>
                <div>
                    <TextInput loading button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" element={element} />
                </div>
            </Stack>
        )
        .add("validation", () =>
            <Inline>
                <TextInput validationState="invalid" placeholder="Where to?" element={element} />
                <TextInput validationState="valid" placeholder="Where to?" element={element} />
            </Inline>
        )
        .add("states", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <TextInput active placeholder="Where to?" element={element} />
                    <TextInput loading active placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextInput focus placeholder="Where to?" element={element} />
                    <TextInput loading focus placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextInput hover placeholder="Where to?" element={element} />
                    <TextInput loading hover placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextInput focus hover placeholder="Where to?" element={element} />
                    <TextInput loading focus hover placeholder="Where to?" element={element} />
                </Inline>
                <TextInput disabled placeholder="Where to?" element={element} />
                <TextInput readOnly placeholder="Where to?" element={element} />
            </Stack>
        );
}
