import { CommunicationIcon } from "@react-components/icons";
import { Label } from "@react-components/label";
import { cloneElement } from "react";

function Radio({ element, ...rest }) {
    return cloneElement(element, rest);
}

function Icons({ element, ...rest }) {
    const radio = cloneElement(element, rest);

    return (
        <>
            <div className="flex mb8">
                <Radio icons={<CommunicationIcon />} size="small" element={radio} className="mr5" />
                <Radio icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Radio icons={<CommunicationIcon />} size="large" element={radio} />
            </div>
            <div className="flex mb8">
                <Radio icons={[<CommunicationIcon />, <CommunicationIcon />]} size="small" element={radio} className="mr5" />
                <Radio icons={[<CommunicationIcon />, <CommunicationIcon />]} element={radio} className="mr5" />
                <Radio icons={[<CommunicationIcon />, <CommunicationIcon />]} size="large" element={radio} />
            </div>
            <div className="flex mb8">
                <Radio disabled icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Radio readOnly icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Radio disabled icons={[<CommunicationIcon />, <CommunicationIcon />]} element={radio} className="mr5" />
                <Radio readOnly icons={[<CommunicationIcon />, <CommunicationIcon />]} element={radio} className="mr5" />
            </div>
            <div className="flex mb8">
                <Radio label={<Label>6</Label>} icons={[<CommunicationIcon />, <CommunicationIcon />]} size="small" element={radio} className="mr5" />
                <Radio label={<Label>6</Label>} icons={[<CommunicationIcon />, <CommunicationIcon />]} element={radio} className="mr5" />
                <Radio label={<Label>6</Label>} icons={[<CommunicationIcon />, <CommunicationIcon />]} size="large" element={radio} />
            </div>
        </>
    );
}

function Labels({ element, ...rest }) {
    const radio = cloneElement(element, rest);

    return (
        <>
            <div className="flex mb8">
                <Radio label={<Label>6</Label>} size="small" element={radio} className="mr5" />
                <Radio label={<Label>6</Label>} element={radio} className="mr5" />
                <Radio label={<Label>6</Label>} size="large" element={radio} />
            </div>
            <div className="flex mb8">
                <Radio disabled label={<Label>6</Label>} element={radio} className="mr5" />
                <Radio readOnly label={<Label>6</Label>} element={radio} />
            </div>
        </>
    );
}

export function createSharedStories(checkbox, stories) {
    return stories
        .add("text", () =>
            <div className="flex">
                <div className="flex flex-column">
                    <div className="flex mb8">
                        <Radio text="Milky Way" element={checkbox} className="mr5" />
                        <Radio disabled text="Milky Way" element={checkbox} className="mr5" />
                        <Radio readOnly text="Milky Way" element={checkbox} />
                    </div>
                    <div className="flex mb8">
                        <Radio size="small" text="Milky Way" element={checkbox} className="mr5" />
                        <Radio text="Milky Way" element={checkbox} className="mr5" />
                        <Radio size="large" text="Milky Way" element={checkbox} />
                    </div>
                    <Icons text="Milky Way" element={checkbox} />
                    <Labels text="Milky Way" element={checkbox} />
                    <div className="flex mb8">
                        <div className="flex mw5">
                            <Radio text="Shurnarkabtishashutu, under the southern horn of the bull" element={checkbox} className="mr5" />
                        </div>
                        <div className="flex mw5">
                            <Radio icons={[<CommunicationIcon />, <CommunicationIcon />]} text="Shurnarkabtishashutu, under the southern horn of the bull" element={checkbox} className="mr5" />
                        </div>
                        <div className="flex mw5">
                            <Radio label={<Label>6</Label>} icons={[<CommunicationIcon />, <CommunicationIcon />]} text="Shurnarkabtishashutu, under the southern horn of the bull" element={checkbox} className="mr5" />
                        </div>
                    </div>
                </div>
            </div>
        )
        .add("no text", () =>
            <div className="flex">
                <div className="flex flex-column">
                    <div className="flex mb8">
                        <Radio element={checkbox} className="mr5" />
                        <Radio disabled element={checkbox} className="mr5" />
                        <Radio readOnly element={checkbox} />
                    </div>
                    <div className="flex mb8">
                        <Radio size="small" element={checkbox} className="mr5" />
                        <Radio element={checkbox} className="mr5" />
                        <Radio size="large" element={checkbox} />
                    </div>
                    <Icons element={checkbox} />
                    <Labels element={checkbox} />
                </div>
            </div>
        )
        .add("group", () =>
            <div className="flex flex-column">
                <Radio text="Mars" name="checkboxRadioGroup" value="mars" element={checkbox} className="mb2" />
                <Radio text="Moon" name="checkboxRadioGroup" value="moon" element={checkbox} className="mb2" />
                <Radio text="Venus" name="checkboxRadioGroup" value="venus" element={checkbox} />
            </div>
        );
}
