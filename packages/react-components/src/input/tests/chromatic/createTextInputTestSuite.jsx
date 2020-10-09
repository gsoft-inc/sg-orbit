import { CrossButton } from "../../../button";
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
                <Inline verticalAlign="end">
                    <TextInput size="sm" element={element} />
                    <TextInput element={element} />
                    <TextInput size="lg" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextInput loading size="sm" element={element} />
                    <TextInput loading element={element} />
                    <TextInput loading size="lg" element={element} />
                </Inline>
                <div>
                    <TextInput disabled element={element}></TextInput>
                </div>
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
                <Inline verticalAlign="end">
                    <TextInput size="sm" placeholder="Where to?" element={element} />
                    <TextInput placeholder="Where to?" element={element} />
                    <TextInput size="lg" placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextInput loading size="sm" placeholder="Where to?" element={element} />
                    <TextInput loading placeholder="Where to?" element={element} />
                    <TextInput loading size="lg" placeholder="Where to?" element={element} />
                </Inline>
                <div>
                    <TextInput disabled placeholder="Where to?" element={element}></TextInput>
                </div>
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
                <Inline verticalAlign="end">
                    <TextInput size="sm" defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput size="lg" defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextInput loading size="sm" defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput loading defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput loading size="lg" defaultValue="SpaceX will win the race!" element={element} />
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
        .add("icon", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <TextInput size="sm" icon={<MagnifierIcon />} placeholder="Where to?" element={element} />
                    <TextInput icon={<MagnifierIcon />} placeholder="Where to?" element={element} />
                    <TextInput size="lg" icon={<MagnifierIcon />} placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextInput size="sm" icon={<MagnifierIcon />} defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput icon={<MagnifierIcon />} defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput size="lg" icon={<MagnifierIcon />} defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
                <div>
                    <TextInput disabled icon={<MagnifierIcon />} placeholder="Where to?" element={element} />
                </div>
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
                <Inline verticalAlign="end">
                    <TextInput size="sm" button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" element={element} />
                    <TextInput button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" element={element} />
                    <TextInput size="lg" button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextInput size="sm" button={<CrossButton aria-label="Clear value" />} defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput button={<CrossButton aria-label="Clear value" />} defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput size="lg" button={<CrossButton aria-label="Clear value" />} defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
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
                    <TextInput active size="sm" placeholder="Where to?" element={element} />
                    <TextInput active placeholder="Where to?" element={element} />
                    <TextInput active size="lg" placeholder="Where to?" element={element} />
                    <TextInput loading active placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextInput focus size="sm" placeholder="Where to?" element={element} />
                    <TextInput focus placeholder="Where to?" element={element} />
                    <TextInput focus size="lg" placeholder="Where to?" element={element} />
                    <TextInput loading focus placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextInput hover size="sm" placeholder="Where to?" element={element} />
                    <TextInput hover placeholder="Where to?" element={element} />
                    <TextInput hover size="lg" placeholder="Where to?" element={element} />
                    <TextInput loading hover placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextInput focus hover size="sm" placeholder="Where to?" element={element} />
                    <TextInput focus hover placeholder="Where to?" element={element} />
                    <TextInput focus hover size="lg" placeholder="Where to?" element={element} />
                    <TextInput loading focus hover placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextInput disabled size="sm" placeholder="Where to?" element={element} />
                    <TextInput disabled placeholder="Where to?" element={element} />
                    <TextInput disabled size="lg" placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextInput readOnly size="sm" placeholder="Where to?" element={element} />
                    <TextInput readOnly placeholder="Where to?" element={element} />
                    <TextInput readOnly size="lg" placeholder="Where to?" element={element} />
                </Inline>
            </Stack>
        );
}
