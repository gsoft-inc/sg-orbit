import { CrossIcon, MagnifierIcon } from "@react-components/icons";
import { IconButton } from "@react-components/button";
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
        .add("label", () =>
            <Stack>
                <Inline align="end">
                    <TextInput size="small" label="Where to?" iconLeft={<MagnifierIcon />} button={<IconButton><CrossIcon /></IconButton>} element={element} />
                    <TextInput label="Where to?" iconLeft={<MagnifierIcon />} button={<IconButton><CrossIcon /></IconButton>} element={element} />
                    <TextInput size="large" label="Where to?" iconLeft={<MagnifierIcon />} button={<IconButton><CrossIcon /></IconButton>} element={element} />
                </Inline>
                <div>
                    <TextInput label={<span>Where to? (<a href="https://www.google.com/sky" target="_blank" rel="noreferrer">view destinations</a>)</span>} iconLeft={<MagnifierIcon />} button={<IconButton><CrossIcon /></IconButton>} element={element} />
                </div>
                <div>
                    <TextInput fluid label="Where to?" iconLeft={<MagnifierIcon />} button={<IconButton><CrossIcon /></IconButton>} element={element}></TextInput>
                </div>
                <div className="w-10">
                    <TextInput fluid label="Where to?" iconLeft={<MagnifierIcon />} button={<IconButton><CrossIcon /></IconButton>} element={element}></TextInput>
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
        .add("icon", () =>
            <Stack>
                <Inline align="end">
                    <TextInput size="small" iconLeft={<MagnifierIcon />} placeholder="Where to?" element={element} />
                    <TextInput iconLeft={<MagnifierIcon />} placeholder="Where to?" element={element} />
                    <TextInput size="large" iconLeft={<MagnifierIcon />} placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput size="small" iconRight={<MagnifierIcon />} placeholder="Where to?" element={element} />
                    <TextInput iconRight={<MagnifierIcon />} placeholder="Where to?" element={element} />
                    <TextInput size="large" iconRight={<MagnifierIcon />} placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput size="small" iconLeft={<MagnifierIcon />} defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput iconLeft={<MagnifierIcon />} defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput size="large" iconLeft={<MagnifierIcon />} defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput size="small" iconRight={<MagnifierIcon />} defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput iconRight={<MagnifierIcon />} defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput size="large" iconRight={<MagnifierIcon />} defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
                <Inline>
                    <TextInput loading iconRight={<MagnifierIcon />} placeholder="Where to?" element={element} />
                    <TextInput iconLeft={<MagnifierIcon />} iconRight={<MagnifierIcon />} placeholder="Where to?" element={element} />
                </Inline>
                <div>
                    <TextInput fluid iconLeft={<MagnifierIcon />} iconRight={<MagnifierIcon />} placeholder="Where to?" element={element} />
                </div>
                <div className="w10">
                    <TextInput fluid iconLeft={<MagnifierIcon />} iconRight={<MagnifierIcon />} placeholder="Where to?" element={element} />
                </div>
            </Stack>
        )
        .add("button", () =>
            <Stack>
                <Inline align="end">
                    <TextInput size="small" button={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                    <TextInput button={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                    <TextInput size="large" button={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput size="small" button={<IconButton><CrossIcon /></IconButton>} defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput button={<IconButton><CrossIcon /></IconButton>} defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput size="large" button={<IconButton><CrossIcon /></IconButton>} defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
                <div>
                    <TextInput loading button={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                </div>
            </Stack>
        )
        .add("message", () =>
            <Stack>
                <Inline align="end">
                    <TextInput help="Enter your final destination." size="small" placeholder="Where to?" element={element} />
                    <TextInput help="Enter your final destination." placeholder="Where to?" element={element} />
                    <TextInput help="Enter your final destination." size="large" placeholder="Where to?" element={element} />
                </Inline>
                <Inline>
                    <TextInput help="Enter your final destination." validMessage="Thank you!" validationState="valid" placeholder="Where to?" element={element} />
                    <TextInput help="Enter your final destination." invalidMessage="This is not a valid destination." validationState="invalid" placeholder="Where to?" element={element} />
                </Inline>
                <div>
                    <TextInput fluid help="Enter your final destination." placeholder="Where to?" element={element} />
                </div>
                <div className="w-10">
                    <TextInput fluid help="Enter your final destination." placeholder="Where to?" element={element} />
                </div>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <TextInput active size="small" placeholder="Where to?" element={element} />
                    <TextInput active placeholder="Where to?" element={element} />
                    <TextInput active size="large" placeholder="Where to?" element={element} />
                    <TextInput loading active placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput focus size="small" placeholder="Where to?" element={element} />
                    <TextInput focus placeholder="Where to?" element={element} />
                    <TextInput focus size="large" placeholder="Where to?" element={element} />
                    <TextInput loading focus placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput hover size="small" placeholder="Where to?" element={element} />
                    <TextInput hover placeholder="Where to?" element={element} />
                    <TextInput hover size="large" placeholder="Where to?" element={element} />
                    <TextInput loading hover placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput focus hover size="small" placeholder="Where to?" element={element} />
                    <TextInput focus hover placeholder="Where to?" element={element} />
                    <TextInput focus hover size="large" placeholder="Where to?" element={element} />
                    <TextInput loading focus hover placeholder="Where to?" element={element} />
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
