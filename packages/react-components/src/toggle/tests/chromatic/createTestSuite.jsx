import { Badge } from "@react-components/badge";
import { CommunicationIcon } from "@react-components/icons";
import { cloneElement } from "react";

function Toggle({ element, ...rest }) {
    return cloneElement(element, rest);
}

function Icons({ element, ...rest }) {
    const toggle = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end mb8">
                <Toggle icons={<CommunicationIcon />} size="small" element={toggle} className="mr5" />
                <Toggle icons={<CommunicationIcon />} element={toggle} className="mr5" />
                <Toggle icons={<CommunicationIcon />} size="large" element={toggle} />
            </div>
            <div className="flex items-end mb8">
                <Toggle icons={[<CommunicationIcon />, <CommunicationIcon />]} size="small" element={toggle} className="mr5" />
                <Toggle icons={[<CommunicationIcon />, <CommunicationIcon />]} element={toggle} className="mr5" />
                <Toggle icons={[<CommunicationIcon />, <CommunicationIcon />]} size="large" element={toggle} />
            </div>
            <div className="flex items-end mb8">
                <Toggle active icons={<CommunicationIcon />} element={toggle} className="mr5" />
                <Toggle focus icons={<CommunicationIcon />} element={toggle} className="mr5" />
                <Toggle hover icons={<CommunicationIcon />} element={toggle} className="mr5" />
                <Toggle focus hover icons={<CommunicationIcon />} element={toggle} className="mr5" />
                <Toggle readOnly icons={<CommunicationIcon />} element={toggle} className="mr5" />
                <Toggle disabled icons={<CommunicationIcon />} element={toggle} className="mr5" />
            </div>
            <div className="flex items-end mb8">
                <Toggle label={<Badge>6</Badge>} icons={<CommunicationIcon />} size="small" element={toggle} className="mr5" />
                <Toggle label={<Badge>6</Badge>} icons={<CommunicationIcon />} element={toggle} className="mr5" />
                <Toggle label={<Badge>6</Badge>} icons={<CommunicationIcon />} size="large" element={toggle} />
            </div>
        </>
    );
}

function Badges({ element, ...rest }) {
    const toggle = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end mb8">
                <Toggle badge={<Badge>6</Badge>} size="small" element={toggle} className="mr5" />
                <Toggle badge={<Badge>6</Badge>} element={toggle} className="mr5" />
                <Toggle badge={<Badge>6</Badge>} size="large" element={toggle} />
            </div>
            <div className="flex items-end mb8">
                <Toggle badge={<Badge inline>6</Badge>} size="small" element={toggle} className="mr5" />
                <Toggle badge={<Badge inline>6</Badge>} element={toggle} className="mr5" />
                <Toggle badge={<Badge inline>6</Badge>} size="large" element={toggle} />
            </div>
            <div className="flex">
                <Toggle active label={<Badge>6</Badge>} element={toggle} className="mr5" />
                <Toggle focus label={<Badge>6</Badge>} element={toggle} className="mr5" />
                <Toggle hover label={<Badge>6</Badge>} element={toggle} className="mr5" />
                <Toggle focus hover label={<Badge>6</Badge>} element={toggle} className="mr5" />
                <Toggle disabled label={<Badge>6</Badge>} element={toggle} className="mr5" />
                <Toggle readOnly label={<Badge>6</Badge>} element={toggle} />
            </div>
        </>
    );
}

export function createTestSuite(toggle, stories) {
    return stories
        .add("text", () =>
            <div className="flex">
                <div className="flex flex-column">
                    <div className="flex items-end mb8">
                        <Toggle text="Milky Way" element={toggle} className="mr5" />
                        <Toggle active text="Milky Way" element={toggle} className="mr5" />
                        <Toggle focus text="Milky Way" element={toggle} className="mr5" />
                        <Toggle hover text="Milky Way" element={toggle} className="mr5" />
                        <Toggle focus hover text="Milky Way" element={toggle} className="mr5" />
                        <Toggle disabled text="Milky Way" element={toggle} className="mr5" />
                        <Toggle readOnly text="Milky Way" element={toggle} />
                    </div>
                    <div className="flex items-end mb8">
                        <Toggle size="small" text="Milky Way" element={toggle} className="mr5" />
                        <Toggle text="Milky Way" element={toggle} className="mr5" />
                        <Toggle size="large" text="Milky Way" element={toggle} />
                    </div>
                    <Icons text="Milky Way" element={toggle} />
                    <Badges text="Milky Way" element={toggle} />
                </div>
            </div>
        )
        .add("no text", () =>
            <div className="flex">
                <div className="flex flex-column">
                    <div className="flex items-end mb8">
                        <Toggle element={toggle} className="mr5" />
                        <Toggle active element={toggle} className="mr5" />
                        <Toggle focus element={toggle} className="mr5" />
                        <Toggle hover element={toggle} className="mr5" />
                        <Toggle focus hover element={toggle} className="mr5" />
                        <Toggle disabled element={toggle} className="mr5" />
                        <Toggle readOnly element={toggle} />
                    </div>
                    <div className="flex items-end mb8">
                        <Toggle size="small" element={toggle} className="mr5" />
                        <Toggle element={toggle} className="mr5" />
                        <Toggle size="large" element={toggle} />
                    </div>
                    <Icons element={toggle} />
                    <Badges element={toggle} />
                </div>
            </div>
        )
        .add("overflow", () =>
            <div className="flex">
                <div className="flex">
                    <div className="flex mw5">
                        <Toggle text="PA-99-N2 event and possible exoplanet in galaxy" element={toggle} className="mr5" />
                    </div>
                    <div className="flex mw5">
                        <Toggle text="PA-99-N2 event and possible exoplanet in galaxy" element={toggle} label={<Badge>6</Badge>} className="mr5" />
                    </div>
                    <div className="flex mw5">
                        <Toggle badge={<Badge>6</Badge>} icons={[<CommunicationIcon />, <CommunicationIcon />]} text="PA-99-N2 event and possible exoplanet in galaxy" element={toggle} className="mr5" />
                    </div>
                    <div className="flex mw5">
                        <Toggle count={<Badge inline>6</Badge>} text="Shurnarkabtishashutu, under the southern horn of the bull" element={toggle} className="mr5" />
                    </div>
                </div>
            </div>
        );
}
