import { CrossButton } from "@react-components/button";
import { Inline, Stack } from "@react-components/layout";
import { cloneElement } from "react";

function TextArea({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(element, stories) {
    stories
        .add("default", () =>
            <Stack>
                <TextArea element={element} />
                <TextArea loading element={element} />
                <TextArea disabled element={element} />
                <TextArea readOnly element={element} />
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
                <TextArea placeholder="Where to?" element={element} />
                <TextArea loading placeholder="Where to?" element={element} />
                <TextArea disabled placeholder="Where to?" element={element} />
                <TextArea readOnly placeholder="Where to?" element={element} />
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
        .add("value", () =>
            <Stack>
                <TextArea defaultValue="SpaceX will win the race!" element={element} />
                <TextArea loading defaultValue="SpaceX will win the race!" element={element} />
                <TextArea disabled defaultValue="SpaceX will win the race!" element={element} />
                <TextArea readOnly defaultValue="SpaceX will win the race!" element={element} />
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
                <TextArea button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" element={element} />
                <TextArea button={<CrossButton aria-label="Clear value" />} defaultValue="SpaceX will win the race!" element={element} />
                <TextArea disabled button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" element={element} />
                <TextArea readOnly button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" element={element} />
                <TextArea loading button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" element={element} />
            </Stack>
        )
        .add("validation", () =>
            <Inline>
                <TextArea validationState="invalid" placeholder="Where to?" element={element} />
                <TextArea validationState="valid" placeholder="Where to?" element={element} />
            </Inline>
        )
        .add("states", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <TextArea active placeholder="Where to?" element={element} />
                    <TextArea loading active placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextArea focus placeholder="Where to?" element={element} />
                    <TextArea loading focus placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextArea hover placeholder="Where to?" element={element} />
                    <TextArea loading hover placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextArea focus hover placeholder="Where to?" element={element} />
                    <TextArea loading focus hover placeholder="Where to?" element={element} />
                </Inline>
                <div>
                    <TextArea disabled placeholder="Where to?" element={element} />
                </div>
                <div>
                    <TextArea readOnly placeholder="Where to?" element={element} />
                </div>
            </Stack>
        );
}
