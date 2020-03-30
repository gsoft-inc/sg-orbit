import { CommunicationIcon } from "@react-components/icons";
import { Label } from "@react-components/label";
import { cloneElement } from "react";

function Checkbox({ element, ...rest }) {
    return cloneElement(element, rest);
}

function Icons({ element, ...rest }) {
    const checkbox = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end mb8">
                <Checkbox icons={<CommunicationIcon />} size="small" element={checkbox} className="mr5" />
                <Checkbox icons={<CommunicationIcon />} element={checkbox} className="mr5" />
                <Checkbox icons={<CommunicationIcon />} size="large" element={checkbox} />
            </div>
            <div className="flex items-end mb8">
                <Checkbox icons={[<CommunicationIcon />, <CommunicationIcon />]} size="small" element={checkbox} className="mr5" />
                <Checkbox icons={[<CommunicationIcon />, <CommunicationIcon />]} element={checkbox} className="mr5" />
                <Checkbox icons={[<CommunicationIcon />, <CommunicationIcon />]} size="large" element={checkbox} />
            </div>
            <div className="flex items-end mb8">
                <Checkbox disabled icons={<CommunicationIcon />} element={checkbox} className="mr5" />
                <Checkbox readOnly icons={<CommunicationIcon />} element={checkbox} className="mr5" />
                <Checkbox disabled icons={[<CommunicationIcon />, <CommunicationIcon />]} element={checkbox} className="mr5" />
                <Checkbox readOnly icons={[<CommunicationIcon />, <CommunicationIcon />]} element={checkbox} className="mr5" />
            </div>
            <div className="flex items-end mb8">
                <Checkbox label={<Label>6</Label>} icons={[<CommunicationIcon />, <CommunicationIcon />]} size="small" element={checkbox} className="mr5" />
                <Checkbox label={<Label>6</Label>} icons={[<CommunicationIcon />, <CommunicationIcon />]} element={checkbox} className="mr5" />
                <Checkbox label={<Label>6</Label>} icons={[<CommunicationIcon />, <CommunicationIcon />]} size="large" element={checkbox} />
            </div>
        </>
    );
}

function Labels({ element, ...rest }) {
    const checkbox = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end mb8">
                <Checkbox label={<Label>6</Label>} size="small" element={checkbox} className="mr5" />
                <Checkbox label={<Label>6</Label>} element={checkbox} className="mr5" />
                <Checkbox label={<Label>6</Label>} size="large" element={checkbox} />
            </div>
            <div className="flex">
                <Checkbox disabled label={<Label>6</Label>} element={checkbox} className="mr5" />
                <Checkbox readOnly label={<Label>6</Label>} element={checkbox} />
            </div>
        </>
    );
}

export function createSharedStories(checkbox, stories) {
    return stories
        .add("text", () =>
            <div className="flex flex-column">
                <div className="flex items-end mb8">
                    <Checkbox text="Milky Way" element={checkbox} className="mr5" />
                    <Checkbox disabled text="Milky Way" element={checkbox} className="mr5" />
                    <Checkbox readOnly text="Milky Way" element={checkbox} />
                </div>
                <div className="flex items-end mb8">
                    <Checkbox size="small" text="Milky Way" element={checkbox} className="mr5" />
                    <Checkbox text="Milky Way" element={checkbox} className="mr5" />
                    <Checkbox size="large" text="Milky Way" element={checkbox} />
                </div>
                <Icons text="Milky Way" element={checkbox} />
                <Labels text="Milky Way" element={checkbox} />
            </div>
        )
        .add("no text", () =>
            <div className="flex flex-column">
                <div className="flex items-end mb8">
                    <Checkbox element={checkbox} className="mr5" />
                    <Checkbox disabled element={checkbox} className="mr5" />
                    <Checkbox readOnly element={checkbox} />
                </div>
                <div className="flex items-end mb8">
                    <Checkbox size="small" element={checkbox} className="mr5" />
                    <Checkbox element={checkbox} className="mr5" />
                    <Checkbox size="large" element={checkbox} />
                </div>
                <Icons element={checkbox} />
                <Labels element={checkbox} />
            </div>
        );
}
