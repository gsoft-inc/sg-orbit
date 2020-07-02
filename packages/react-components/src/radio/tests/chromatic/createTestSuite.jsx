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
                <Radio badge={<Badge>6</Badge>} icons={<CommunicationIcon />} size="small" element={radio} className="mr5" />
                <Radio badge={<Badge>6</Badge>} icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Radio badge={<Badge>6</Badge>} icons={<CommunicationIcon />} size="large" element={radio} />
            </div>
            <div className="flex mb8">
                <Radio badge={<Badge inline>6</Badge>} icons={<CommunicationIcon />} size="small" element={radio} className="mr5" />
                <Radio badge={<Badge inline>6</Badge>} icons={<CommunicationIcon />} element={radio} className="mr5" />
                <Radio badge={<Badge inline>6</Badge>} icons={<CommunicationIcon />} size="large" element={radio} />
            </div>
        </>
    );
}

function Badges({ element, ...rest }) {
    const radio = cloneElement(element, rest);

    return (
        <>
            <div className="flex mb8">
                <Radio badge={<Badge>6</Badge>} size="small" element={radio} className="mr5" />
                <Radio badge={<Badge>6</Badge>} element={radio} className="mr5" />
                <Radio badge={<Badge>6</Badge>} size="large" element={radio} />
            </div>
            <div className="flex mb8">
                <Radio badge={<Badge inline>6</Badge>} size="small" element={radio} className="mr5" />
                <Radio badge={<Badge inline>6</Badge>} element={radio} className="mr5" />
                <Radio badge={<Badge inline>6</Badge>} size="large" element={radio} />
            </div>
            <div className="flex mb8">
                <Radio active badge={<Badge>6</Badge>} element={radio} className="mr5" />
                <Radio focus badge={<Badge>6</Badge>} element={radio} className="mr5" />
                <Radio hover badge={<Badge>6</Badge>} element={radio} className="mr5" />
                <Radio focus hover badge={<Badge>6</Badge>} element={radio} className="mr5" />
                <Radio disabled badge={<Badge>6</Badge>} element={radio} className="mr5" />
                <Radio readOnly badge={<Badge>6</Badge>} element={radio} />
            </div>
        </>
    );
}

export function createTestSuite(radio, stories) {
    return stories
        .add("label", () =>
            <div className="flex">
                <div className="flex flex-column">
                    <div className="flex mb8">
                        <Radio label="Milky Way" element={radio} className="mr5" />
                        <Radio active label="Milky Way" element={radio} className="mr5" />
                        <Radio focus label="Milky Way" element={radio} className="mr5" />
                        <Radio hover label="Milky Way" element={radio} className="mr5" />
                        <Radio focus hover label="Milky Way" element={radio} className="mr5" />
                        <Radio disabled label="Milky Way" element={radio} className="mr5" />
                        <Radio readOnly label="Milky Way" element={radio} />
                    </div>
                    <div className="flex mb8">
                        <Radio size="small" label="Milky Way" element={radio} className="mr5" />
                        <Radio label="Milky Way" element={radio} className="mr5" />
                        <Radio size="large" label="Milky Way" element={radio} />
                    </div>
                    <Icons label="Milky Way" element={radio} />
                    <Badges label="Milky Way" element={radio} />
                </div>
            </div>
        )
        .add("no label", () =>
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
                <Radio label="Mars" name="checkboxRadioGroup" value="mars" element={radio} className="mb2" />
                <Radio label="Moon" name="checkboxRadioGroup" value="moon" element={radio} className="mb2" />
                <Radio label="Venus" name="checkboxRadioGroup" value="venus" element={radio} />
            </div>
        )
        .add("overflow", () =>
            <div className="flex mb8">
                <div className="flex mw5">
                    <Radio label="Shurnarkabtishashutu, under the southern horn of the bull" element={radio} className="mr5" />
                </div>
                <div className="flex mw5">
                    <Radio icons={[<CommunicationIcon />, <CommunicationIcon />]} label="Shurnarkabtishashutu, under the southern horn of the bull" element={radio} className="mr5" />
                </div>
                <div className="flex mw5">
                    <Radio badge={<Badge>6</Badge>} icons={[<CommunicationIcon />, <CommunicationIcon />]} label="Shurnarkabtishashutu, under the southern horn of the bull" element={radio} className="mr5" />
                </div>
                <div className="flex mw5">
                    <Radio badge={<Badge inline>6</Badge>} label="Shurnarkabtishashutu, under the southern horn of the bull" element={radio} className="mr5" />
                </div>
            </div>
        );
}
