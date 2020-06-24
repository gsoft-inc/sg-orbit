import { Badge } from "@react-components/badge";
import { CommunicationIcon } from "@react-components/icons";
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
                <Radio active icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Radio focus icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Radio hover icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Radio focus hover icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Radio readOnly icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Radio disabled icons={<CommunicationIcon />} element={radio} className="mr5" />
            </div>
            <div className="flex mb8">
                <Radio label={<Badge>6</Badge>} icons={<CommunicationIcon />} size="small" element={radio} className="mr5" />
                <Radio label={<Badge>6</Badge>} icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Radio label={<Badge>6</Badge>} icons={<CommunicationIcon />} size="large" element={radio} />
            </div>
            <div className="flex mb8">
                <Radio label={<Badge inline>6</Badge>} icons={<CommunicationIcon />} size="small" element={radio} className="mr5" />
                <Radio label={<Badge inline>6</Badge>} icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Radio label={<Badge inline>6</Badge>} icons={<CommunicationIcon />} size="large" element={radio} />
            </div>
        </>
    );
}

function Badges({ element, ...rest }) {
    const radio = cloneElement(element, rest);

    return (
        <>
            <div className="flex mb8">
                <Radio label={<Badge>6</Badge>} size="small" element={radio} className="mr5" />
                <Radio label={<Badge>6</Badge>} element={radio} className="mr5" />
                <Radio label={<Badge>6</Badge>} size="large" element={radio} />
            </div>
            <div className="flex mb8">
                <Radio label={<Badge inline>6</Badge>} size="small" element={radio} className="mr5" />
                <Radio label={<Badge inline>6</Badge>} element={radio} className="mr5" />
                <Radio label={<Badge inline>6</Badge>} size="large" element={radio} />
            </div>
            <div className="flex mb8">
                <Radio active label={<Badge>6</Badge>} element={radio} className="mr5" />
                <Radio focus label={<Badge>6</Badge>} element={radio} className="mr5" />
                <Radio hover label={<Badge>6</Badge>} element={radio} className="mr5" />
                <Radio focus hover label={<Badge>6</Badge>} element={radio} className="mr5" />
                <Radio disabled label={<Badge>6</Badge>} element={radio} className="mr5" />
                <Radio readOnly label={<Badge>6</Badge>} element={radio} />
            </div>
        </>
    );
}

export function createTestSuite(radio, stories) {
    return stories
        .add("text", () =>
            <div className="flex">
                <div className="flex flex-column">
                    <div className="flex mb8">
                        <Radio text="Milky Way" element={radio} className="mr5" />
                        <Radio active text="Milky Way" element={radio} className="mr5" />
                        <Radio focus text="Milky Way" element={radio} className="mr5" />
                        <Radio hover text="Milky Way" element={radio} className="mr5" />
                        <Radio focus hover text="Milky Way" element={radio} className="mr5" />
                        <Radio disabled text="Milky Way" element={radio} className="mr5" />
                        <Radio readOnly text="Milky Way" element={radio} />
                    </div>
                    <div className="flex mb8">
                        <Radio size="small" text="Milky Way" element={radio} className="mr5" />
                        <Radio text="Milky Way" element={radio} className="mr5" />
                        <Radio size="large" text="Milky Way" element={radio} />
                    </div>
                    <Icons text="Milky Way" element={radio} />
                    <Badges text="Milky Way" element={radio} />
                </div>
            </div>
        )
        .add("no text", () =>
            <div className="flex">
                <div className="flex flex-column">
                    <div className="flex mb8">
                        <Radio element={radio} className="mr5" />
                        <Radio active element={radio} className="mr5" />
                        <Radio focus element={radio} className="mr5" />
                        <Radio hover element={radio} className="mr5" />
                        <Radio focus hover element={radio} className="mr5" />
                        <Radio disabled element={radio} className="mr5" />
                        <Radio readOnly element={radio} />
                    </div>
                    <div className="flex mb8">
                        <Radio size="small" element={radio} className="mr5" />
                        <Radio element={radio} className="mr5" />
                        <Radio size="large" element={radio} />
                    </div>
                    <Icons element={radio} />
                    <Badges element={radio} />
                </div>
            </div>
        )
        .add("group", () =>
            <div className="flex flex-column">
                <Radio text="Mars" name="checkboxRadioGroup" value="mars" element={radio} className="mb2" />
                <Radio text="Moon" name="checkboxRadioGroup" value="moon" element={radio} className="mb2" />
                <Radio text="Venus" name="checkboxRadioGroup" value="venus" element={radio} />
            </div>
        )
        .add("overflow", () =>
            <div className="flex mb8">
                <div className="flex mw5">
                    <Radio text="Shurnarkabtishashutu, under the southern horn of the bull" element={radio} className="mr5" />
                </div>
                <div className="flex mw5">
                    <Radio icons={[<CommunicationIcon />, <CommunicationIcon />]} text="Shurnarkabtishashutu, under the southern horn of the bull" element={radio} className="mr5" />
                </div>
                <div className="flex mw5">
                    <Radio label={<Badge>6</Badge>} icons={[<CommunicationIcon />, <CommunicationIcon />]} text="Shurnarkabtishashutu, under the southern horn of the bull" element={radio} className="mr5" />
                </div>
                <div className="flex mw5">
                    <Radio count={<Badge inline>6</Badge>} text="Shurnarkabtishashutu, under the southern horn of the bull" element={radio} className="mr5" />
                </div>
            </div>
        );
}
