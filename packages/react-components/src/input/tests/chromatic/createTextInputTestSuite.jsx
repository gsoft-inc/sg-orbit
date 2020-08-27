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
        .add("label", () =>
            <Stack>
                <Inline align="end">
                    <TextInput size="small" label="Where to?" icon={<MagnifierIcon />} button={<IconButton><CrossIcon /></IconButton>} element={element} />
                    <TextInput label="Where to?" icon={<MagnifierIcon />} button={<IconButton><CrossIcon /></IconButton>} element={element} />
                    <TextInput size="large" label="Where to?" icon={<MagnifierIcon />} button={<IconButton><CrossIcon /></IconButton>} element={element} />
                </Inline>
                <div>
                    <TextInput label={<span>Where to? (<a href="https://www.google.com/sky" target="_blank" rel="noreferrer">view destinations</a>)</span>} icon={<MagnifierIcon />} button={<IconButton><CrossIcon /></IconButton>} element={element} />
                </div>
                <div>
                    <TextInput fluid label="Where to?" icon={<MagnifierIcon />} button={<IconButton><CrossIcon /></IconButton>} element={element}></TextInput>
                </div>
                <div className="w-10">
                    <TextInput fluid label="Where to?" icon={<MagnifierIcon />} button={<IconButton><CrossIcon /></IconButton>} element={element}></TextInput>
                </div>
            </Stack>
        )
        .add("description", () =>
            <Stack>
                <Inline align="end">
                    <TextInput description="Trips to Andromeda galaxy are available every 2 months." label="Where to?" size="small" element={element} />
                    <TextInput description="Trips to Andromeda galaxy are available every 2 months." label="Where to?" element={element} />
                    <TextInput description="Trips to Andromeda galaxy are available every 2 months." label="Where to?" size="large" element={element} />
                </Inline>
                <div>
                    <TextInput fluid description="Trips to Andromeda galaxy are available every 2 months." label="Where to?" element={element} />
                </div>
                <div className="w-10">
                    <TextInput fluid description="Trips to Andromeda galaxy are available every 2 months." label="Where to?" element={element} />
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
                    <TextInput size="small" icon={<MagnifierIcon />} placeholder="Where to?" element={element} />
                    <TextInput icon={<MagnifierIcon />} placeholder="Where to?" element={element} />
                    <TextInput size="large" icon={<MagnifierIcon />} placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextInput size="small" icon={<MagnifierIcon />} defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput icon={<MagnifierIcon />} defaultValue="SpaceX will win the race!" element={element} />
                    <TextInput size="large" icon={<MagnifierIcon />} defaultValue="SpaceX will win the race!" element={element} />
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
                <Inline>
                    <TextInput disabled button={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                    <TextInput readOnly button={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                </Inline>
                <div>
                    <TextInput loading button={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                </div>
            </Stack>
        )
        .add("message", () =>
            <Stack>
                <Inline align="end">
                    <TextInput helpMessage="Enter your final destination." size="small" placeholder="Where to?" element={element} />
                    <TextInput helpMessage="Enter your final destination." placeholder="Where to?" element={element} />
                    <TextInput helpMessage="Enter your final destination." size="large" placeholder="Where to?" element={element} />
                </Inline>
                <Inline>
                    <TextInput helpMessage="Enter your final destination." validMessage="Thank you!" validationState="valid" placeholder="Where to?" element={element} />
                    <TextInput helpMessage="Enter your final destination." invalidMessage="This is not a valid destination." validationState="invalid" placeholder="Where to?" element={element} />
                </Inline>
                <div>
                    <TextInput fluid helpMessage="Enter your final destination." placeholder="Where to?" element={element} />
                </div>
                <div className="w-10">
                    <TextInput fluid helpMessage="Enter your final destination." placeholder="Where to?" element={element} />
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
