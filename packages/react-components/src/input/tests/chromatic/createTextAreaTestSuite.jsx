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
                <Inline verticalAlign="end">
                    <TextArea size="sm" element={element} />
                    <TextArea element={element} />
                    <TextArea size="lg" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextArea loading size="sm" element={element} />
                    <TextArea loading element={element} />
                    <TextArea loading size="lg" element={element} />
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
                <Inline verticalAlign="end">
                    <TextArea size="sm" placeholder="Where to?" element={element} />
                    <TextArea placeholder="Where to?" element={element} />
                    <TextArea size="lg" placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextArea loading size="sm" placeholder="Where to?" element={element} />
                    <TextArea loading placeholder="Where to?" element={element} />
                    <TextArea loading size="lg" placeholder="Where to?" element={element} />
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
        .add("value", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <TextArea size="sm" defaultValue="SpaceX will win the race!" element={element} />
                    <TextArea defaultValue="SpaceX will win the race!" element={element} />
                    <TextArea size="lg" defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextArea loading size="sm" defaultValue="SpaceX will win the race!" element={element} />
                    <TextArea loading defaultValue="SpaceX will win the race!" element={element} />
                    <TextArea loading size="lg" defaultValue="SpaceX will win the race!" element={element} />
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
        .add("clear button", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <TextArea size="sm" onClear={() => {}} placeholder="Where to?" element={element} />
                    <TextArea onClear={() => {}} placeholder="Where to?" element={element} />
                    <TextArea size="lg" onClear={() => {}} placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextArea size="sm" onClear={() => {}} defaultValue="SpaceX will win the race!" element={element} />
                    <TextArea onClear={() => {}} defaultValue="SpaceX will win the race!" element={element} />
                    <TextArea size="lg" onClear={() => {}} defaultValue="SpaceX will win the race!" element={element} />
                </Inline>
                <div>
                    <TextArea disabled onClear={() => {}} placeholder="Where to?" element={element} />
                </div>
                <div>
                    <TextArea loading onClear={() => {}} placeholder="Where to?" element={element} />
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
                    <TextArea active size="sm" placeholder="Where to?" element={element} />
                    <TextArea active placeholder="Where to?" element={element} />
                    <TextArea active size="lg" placeholder="Where to?" element={element} />
                    <TextArea loading active placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextArea focus size="sm" placeholder="Where to?" element={element} />
                    <TextArea focus placeholder="Where to?" element={element} />
                    <TextArea focus size="lg" placeholder="Where to?" element={element} />
                    <TextArea loading focus placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextArea hover size="sm" placeholder="Where to?" element={element} />
                    <TextArea hover placeholder="Where to?" element={element} />
                    <TextArea hover size="lg" placeholder="Where to?" element={element} />
                    <TextArea loading hover placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextArea focus hover size="sm" placeholder="Where to?" element={element} />
                    <TextArea focus hover placeholder="Where to?" element={element} />
                    <TextArea focus hover size="lg" placeholder="Where to?" element={element} />
                    <TextArea loading focus hover placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextArea disabled size="sm" placeholder="Where to?" element={element} />
                    <TextArea disabled placeholder="Where to?" element={element} />
                    <TextArea disabled size="lg" placeholder="Where to?" element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <TextArea readOnly size="sm" placeholder="Where to?" element={element} />
                    <TextArea readOnly placeholder="Where to?" element={element} />
                    <TextArea readOnly size="lg" placeholder="Where to?" element={element} />
                </Inline>
            </Stack>
        );
}
