import { Badge } from "@react-components/badge";
import { EmailIcon } from "@react-components/icons";
import { cloneElement } from "react";

function Toggle({ element, ...rest }) {
    return cloneElement(element, rest);
}

function Icons({ element, ...rest }) {
    const toggle = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end mb8">
                <Toggle icons={<EmailIcon />} size="small" element={toggle} className="mr5" />
                <Toggle icons={<EmailIcon />} element={toggle} className="mr5" />
                <Toggle icons={<EmailIcon />} size="large" element={toggle} />
            </div>
            <div className="flex items-end mb8">
                <Toggle icons={[<EmailIcon />, <EmailIcon />]} size="small" element={toggle} className="mr5" />
                <Toggle icons={[<EmailIcon />, <EmailIcon />]} element={toggle} className="mr5" />
                <Toggle icons={[<EmailIcon />, <EmailIcon />]} size="large" element={toggle} />
            </div>
            <div className="flex items-end mb8">
                <Toggle active icons={<EmailIcon />} element={toggle} className="mr5" />
                <Toggle focus icons={<EmailIcon />} element={toggle} className="mr5" />
                <Toggle hover icons={<EmailIcon />} element={toggle} className="mr5" />
                <Toggle focus hover icons={<EmailIcon />} element={toggle} className="mr5" />
                <Toggle readOnly icons={<EmailIcon />} element={toggle} className="mr5" />
                <Toggle disabled icons={<EmailIcon />} element={toggle} className="mr5" />
            </div>
            <div className="flex items-end mb8">
                <Toggle badge={<Badge>6</Badge>} icons={<EmailIcon />} size="small" element={toggle} className="mr5" />
                <Toggle badge={<Badge>6</Badge>} icons={<EmailIcon />} element={toggle} className="mr5" />
                <Toggle badge={<Badge>6</Badge>} icons={<EmailIcon />} size="large" element={toggle} />
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
                <Toggle active badge={<Badge>6</Badge>} element={toggle} className="mr5" />
                <Toggle focus badge={<Badge>6</Badge>} element={toggle} className="mr5" />
                <Toggle hover badge={<Badge>6</Badge>} element={toggle} className="mr5" />
                <Toggle focus hover badge={<Badge>6</Badge>} element={toggle} className="mr5" />
                <Toggle disabled badge={<Badge>6</Badge>} element={toggle} className="mr5" />
                <Toggle readOnly badge={<Badge>6</Badge>} element={toggle} />
            </div>
        </>
    );
}

export function createTestSuite(toggle, stories) {
    return stories
        .add("label", () =>
            <div className="flex">
                <div className="flex flex-column">
                    <div className="flex items-end mb8">
                        <Toggle label="Milky Way" element={toggle} className="mr5" />
                        <Toggle active label="Milky Way" element={toggle} className="mr5" />
                        <Toggle focus label="Milky Way" element={toggle} className="mr5" />
                        <Toggle hover label="Milky Way" element={toggle} className="mr5" />
                        <Toggle focus hover label="Milky Way" element={toggle} className="mr5" />
                        <Toggle disabled label="Milky Way" element={toggle} className="mr5" />
                        <Toggle readOnly label="Milky Way" element={toggle} />
                    </div>
                    <div className="flex items-end mb8">
                        <Toggle size="small" label="Milky Way" element={toggle} className="mr5" />
                        <Toggle label="Milky Way" element={toggle} className="mr5" />
                        <Toggle size="large" label="Milky Way" element={toggle} />
                    </div>
                    <Icons label="Milky Way" element={toggle} />
                    <Badges label="Milky Way" element={toggle} />
                </div>
            </div>
        )
        .add("no label", () =>
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
                        <Toggle label="PA-99-N2 event and possible exoplanet in galaxy" element={toggle} className="mr5" />
                    </div>
                    <div className="flex mw5">
                        <Toggle label="PA-99-N2 event and possible exoplanet in galaxy" element={toggle} badge={<Badge>6</Badge>} className="mr5" />
                    </div>
                    <div className="flex mw5">
                        <Toggle badge={<Badge>6</Badge>} icons={[<EmailIcon />, <EmailIcon />]} label="PA-99-N2 event and possible exoplanet in galaxy" element={toggle} className="mr5" />
                    </div>
                    <div className="flex mw5">
                        <Toggle count={<Badge inline>6</Badge>} label="Shurnarkabtishashutu, under the southern horn of the bull" element={toggle} className="mr5" />
                    </div>
                </div>
            </div>
        );
}
