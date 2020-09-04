import { CrossIcon } from "@react-components/icons";
import { IconButton } from "@react-components/button";
import { Inline, Stack } from "@react-components/layout";
import { cloneElement } from "react";

function TextArea({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTextAreaTestSuite(element, stories) {
    stories
        .add("default", () =>
            <Stack>
                <Inline align="end">
                    <TextArea size="small" element={element} />
                    <TextArea element={element} />
                    <TextArea size="large" element={element} />
                </Inline>
                <Inline align="end">
                    <TextArea loading size="small" element={element} />
                    <TextArea loading element={element} />
                    <TextArea loading size="large" element={element} />
                </Inline>
                <div>
                    <TextArea disabled element={element} />
                </div>
                <div>
                    <TextArea fluid element={element}></TextArea>
                </div>
                <div className="w-10">
                    <TextArea fluid element={element}></TextArea>
                </div>
                <div>
                    <TextArea loading fluid element={element}></TextArea>
                </div>
            </Stack>
        )
        .add("placeholder", () =>
            <Stack>
                <Inline align="end">
                    <TextArea size="small" placeholder="Where to?" element={element} />
                    <TextArea placeholder="Where to?" element={element} />
                    <TextArea size="large" placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextArea loading size="small" placeholder="Where to?" element={element} />
                    <TextArea loading placeholder="Where to?" element={element} />
                    <TextArea loading size="large" placeholder="Where to?" element={element} />
                </Inline>
                <div>
                    <TextArea disabled placeholder="Where to?" element={element} />
                </div>
                <div>
                    <TextArea fluid placeholder="Where to?" element={element}></TextArea>
                </div>
                <div className="w-10">
                    <TextArea fluid placeholder="Where to?" element={element}></TextArea>
                </div>
                <div>
                    <TextArea loading fluid placeholder="Where to?" element={element}></TextArea>
                </div>
            </Stack>
        )
        .add("label", () =>
            <Stack>
                <Inline align="end">
                    <TextArea size="small" label="Where to?" button={<IconButton><CrossIcon /></IconButton>} element={element} />
                    <TextArea label="Where to?" button={<IconButton><CrossIcon /></IconButton>} element={element} />
                    <TextArea size="large" label="Where to?" button={<IconButton><CrossIcon /></IconButton>} element={element} />
                </Inline>
                <div>
                    <TextArea label={<span>Where to? (<a href="https://www.google.com/sky" target="_blank" rel="noreferrer">view destinations</a>)</span>} button={<IconButton><CrossIcon /></IconButton>} element={element} />
                </div>
                <div>
                    <TextArea fluid label="Where to?" button={<IconButton><CrossIcon /></IconButton>} element={element}></TextArea>
                </div>
                <div className="w-10">
                    <TextArea fluid label="Where to?" button={<IconButton><CrossIcon /></IconButton>} element={element}></TextArea>
                </div>
            </Stack>
        )
        .add("description", () =>
            <Stack>
                <Inline align="end">
                    <TextArea description="Trips to Andromeda galaxy are available every 2 months." size="small" label="Where to?" element={element} />
                    <TextArea description="Trips to Andromeda galaxy are available every 2 months." label="Where to?" element={element} />
                    <TextArea description="Trips to Andromeda galaxy are available every 2 months." size="large" label="Where to?" element={element} />
                </Inline>
                <div>
                    <TextArea description="Trips to Andromeda galaxy are available every 2 months." fluid label="Where to?" element={element}></TextArea>
                </div>
                <div className="w-10">
                    <TextArea description="Trips to Andromeda galaxy are available every 2 months." fluid label="Where to?" element={element}></TextArea>
                </div>
            </Stack>
        )
        .add("value", () =>
            <Stack>
                <Inline align="end">
                    <TextArea size="small" defaultValue="SpaceX will win the race!" element={element} />
                    <TextArea defaultValue="SpaceX will win the race!" element={element} />
                    <TextArea size="large" defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
                <Inline align="end">
                    <TextArea loading size="small" defaultValue="SpaceX will win the race!" element={element} />
                    <TextArea loading defaultValue="SpaceX will win the race!" element={element} />
                    <TextArea loading size="large" defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
                <Inline>
                    <TextArea placeholder="Where to?" defaultValue="SpaceX will win the race!" element={element} />
                    <TextArea value="SpaceX will win the race!" element={element} />
                </Inline>
                <div>
                    <TextArea fluid placeholder="Where to?" element={element}></TextArea>
                </div>
                <div className="w-10">
                    <TextArea fluid placeholder="Where to?" element={element}></TextArea>
                </div>
                <div>
                    <TextArea loading fluid placeholder="Where to?" element={element}></TextArea>
                </div>
            </Stack>
        )
        .add("button", () =>
            <Stack>
                <Inline align="end">
                    <TextArea size="small" button={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                    <TextArea button={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                    <TextArea size="large" button={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextArea size="small" button={<IconButton><CrossIcon /></IconButton>} defaultValue="SpaceX will win the race!" element={element} />
                    <TextArea button={<IconButton><CrossIcon /></IconButton>} defaultValue="SpaceX will win the race!" element={element} />
                    <TextArea size="large" button={<IconButton><CrossIcon /></IconButton>} defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
                <div>
                    <TextArea disabled button={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                </div>
                <div>
                    <TextArea loading button={<IconButton><CrossIcon /></IconButton>} placeholder="Where to?" element={element} />
                </div>
            </Stack>
        )
        .add("message", () =>
            <Stack>
                <Inline align="end">
                    <TextArea helpMessage="Enter your final destination." size="small" placeholder="Where to?" element={element} />
                    <TextArea helpMessage="Enter your final destination." placeholder="Where to?" element={element} />
                    <TextArea helpMessage="Enter your final destination." size="large" placeholder="Where to?" element={element} />
                </Inline>
                <Inline>
                    <TextArea helpMessage="Enter your final destination." validMessage="Thank you!" validationState="valid" placeholder="Where to?" element={element} />
                    <TextArea helpMessage="Enter your final destination." invalidMessage="This is not a valid destination." validationState="invalid" placeholder="Where to?" element={element} />
                </Inline>
                <div>
                    <TextArea fluid helpMessage="Enter your final destination." placeholder="Where to?" element={element} />
                </div>
                <div className="w-10">
                    <TextArea fluid helpMessage="Enter your final destination." placeholder="Where to?" element={element} />
                </div>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <TextArea active size="small" placeholder="Where to?" element={element} />
                    <TextArea active placeholder="Where to?" element={element} />
                    <TextArea active size="large" placeholder="Where to?" element={element} />
                    <TextArea loading active placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextArea focus size="small" placeholder="Where to?" element={element} />
                    <TextArea focus placeholder="Where to?" element={element} />
                    <TextArea focus size="large" placeholder="Where to?" element={element} />
                    <TextArea loading focus placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextArea hover size="small" placeholder="Where to?" element={element} />
                    <TextArea hover placeholder="Where to?" element={element} />
                    <TextArea hover size="large" placeholder="Where to?" element={element} />
                    <TextArea loading hover placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextArea focus hover size="small" placeholder="Where to?" element={element} />
                    <TextArea focus hover placeholder="Where to?" element={element} />
                    <TextArea focus hover size="large" placeholder="Where to?" element={element} />
                    <TextArea loading focus hover placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextArea disabled size="small" placeholder="Where to?" element={element} />
                    <TextArea disabled placeholder="Where to?" element={element} />
                    <TextArea disabled size="large" placeholder="Where to?" element={element} />
                </Inline>
                <Inline align="end">
                    <TextArea readOnly size="small" placeholder="Where to?" element={element} />
                    <TextArea readOnly placeholder="Where to?" element={element} />
                    <TextArea readOnly size="large" placeholder="Where to?" element={element} />
                </Inline>
            </Stack>
        );
}
