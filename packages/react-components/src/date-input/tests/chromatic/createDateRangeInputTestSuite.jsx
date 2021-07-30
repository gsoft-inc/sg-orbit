import { Stack } from "@react-components/layout";
import { cloneElement } from "react";

function DateRangeInput({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createDateRangeInputTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <DateRangeInput element={element} />
                <DateRangeInput fluid element={element} />
                <div className="w-10">
                    <DateRangeInput fluid element={element} />
                </div>
            </Stack>
        )
        .add("placeholder", () =>
            <Stack>
                <DateRangeInput placeholder="custom" element={element} />
                <DateRangeInput disabled placeholder="custom" element={element} />
                <DateRangeInput readOnly placeholder="custom" element={element} />
                <DateRangeInput fluid placeholder="custom" element={element} />
                <div className="w-10">
                    <DateRangeInput fluid placeholder="custom" element={element} />
                </div>
            </Stack>
        )
        .add("value", () =>
            <Stack>
                <DateRangeInput defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)} element={element} />
                <DateRangeInput disabled defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)} element={element} />
                <DateRangeInput readOnly defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)} element={element} />
                <DateRangeInput defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)} element={element} />
                <DateRangeInput startDate={new Date(1970, 0, 5)} endDate={new Date(1971, 3, 10)} element={element} />
                <DateRangeInput fluid defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)} element={element} />
                <div className="w-10">
                    <DateRangeInput fluid defaultStartDate={new Date(1970, 0, 5)} defaultEndDate={new Date(1971, 3, 10)} element={element} />
                </div>
            </Stack>
        )
        .add("validation", () =>
            <Stack>
                <DateRangeInput validationState="invalid" element={element} />
                <DateRangeInput validationState="valid" element={element} />
            </Stack>
        )
        .add("states 1", () =>
            <Stack>
                <DateRangeInput active element={element} />
                <DateRangeInput focus element={element} />
                <DateRangeInput hover element={element} />
                <DateRangeInput focus hover element={element} />
                <DateRangeInput readOnly element={element} />
            </Stack>
        )
        .add("states 2", () =>
            <Stack>
                <DateRangeInput disabled element={element} />
                <DateRangeInput disabled active element={element} />
                <DateRangeInput disabled focus element={element} />
                <DateRangeInput disabled hover element={element} />
                <DateRangeInput disabled focus hover element={element} />
            </Stack>
        )
        .add("styling", () =>
            <Stack>
                <DateRangeInput className="border-red" element={element} />
                <DateRangeInput style={{ border: "1px solid red" }} element={element} />
            </Stack>
        );
}
