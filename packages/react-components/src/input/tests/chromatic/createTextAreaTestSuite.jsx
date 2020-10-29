import { CrossButton } from "../../../button";
import { Inline, Stack } from "@react-components/layout";
import { cloneElement } from "react";

function TextArea({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTextAreaTestSuite(element, stories) {
    stories
        .add("default", () =>
            <Stack>
                <div>
                    <TextArea element={element} />
                </div>
                <div>
                    <TextArea loading element={element} />
                </div>
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
                <div>
                    <TextArea placeholder="Where to?" element={element} />
                </div>
                <div>
                    <TextArea loading placeholder="Where to?" element={element} />
                </div>
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
        .add("value", () =>
            <Stack>
                <div>
                    <TextArea defaultValue="SpaceX will win the race!" element={element} />
                </div>
                <div>
                    <TextArea loading defaultValue="SpaceX will win the race!" element={element} />
                </div>
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
                <div>
                    <TextArea button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" element={element} />
                </div>
                <div>
                    <TextArea button={<CrossButton aria-label="Clear value" />} defaultValue="SpaceX will win the race!" element={element} />
                </div>
                <div>
                    <TextArea disabled button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" element={element} />
                </div>
                <div>
                    <TextArea loading button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" element={element} />
                </div>
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
