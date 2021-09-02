import { Div } from "@react-components/html";
import { Stack } from "@react-components/layout";
import { cloneElement } from "react";

function DateInput({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createDateInputTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <DateInput element={element} />
                <DateInput fluid element={element} />
                <Div width="10%">
                    <DateInput fluid element={element} />
                </Div>
            </Stack>
        )
        .add("placeholder", () =>
            <Stack>
                <DateInput placeholder="custom" element={element} />
                <DateInput disabled placeholder="custom" element={element} />
                <DateInput readOnly placeholder="custom" element={element} />
                <DateInput fluid placeholder="custom" element={element} />
                <Div width="10%">
                    <DateInput fluid placeholder="custom" element={element} />
                </Div>
            </Stack>
        )
        .add("value", () =>
            <Stack>
                <DateInput defaultValue={new Date(1970, 0, 5)} element={element} />
                <DateInput disabled defaultValue={new Date(1970, 0, 5)} element={element} />
                <DateInput readOnly defaultValue={new Date(1970, 0, 5)} element={element} />
                <DateInput defaultValue={new Date(1970, 0, 5)} element={element} />
                <DateInput value={new Date(1970, 0, 5)} element={element} />
                <DateInput fluid defaultValue={new Date(1970, 0, 5)} element={element} />
                <Div width="10%">
                    <DateInput fluid defaultValue={new Date(1970, 0, 5)} element={element} />
                </Div>
            </Stack>
        )
        .add("validation", () =>
            <Stack>
                <DateInput validationState="invalid" element={element} />
                <DateInput validationState="valid" element={element} />
            </Stack>
        )
        .add("states 1", () =>
            <Stack>
                <DateInput active placeholder="Where to?" element={element} />
                <DateInput focus placeholder="Where to?" element={element} />
                <DateInput hover placeholder="Where to?" element={element} />
                <DateInput focus hover placeholder="Where to?" element={element} />
                <DateInput disabled placeholder="Where to?" element={element} />
                <DateInput readOnly placeholder="Where to?" element={element} />
            </Stack>
        )
        .add("states 2", () =>
            <Stack>
                <DateInput validationState="invalid" active placeholder="Where to?" element={element} />
                <DateInput validationState="invalid" focus placeholder="Where to?" element={element} />
                <DateInput validationState="invalid" hover placeholder="Where to?" element={element} />
                <DateInput validationState="invalid" focus hover placeholder="Where to?" element={element} />
                <DateInput validationState="invalid" disabled placeholder="Where to?" element={element} />
                <DateInput validationState="invalid" readOnly placeholder="Where to?" element={element} />
            </Stack>
        )
        .add("styling", () =>
            <Stack>
                <DateInput className="border-red" element={element} />
                <DateInput style={{ border: "1px solid red" }} element={element} />
                <DateInput wrapperProps={{ className: "border-red" }} element={element} />
                <DateInput wrapperProps={{ style: { border: "1px solid red" } }} element={element} />
            </Stack>
        );
}
