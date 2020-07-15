import { Badge } from "@react-components/badge";
import { EmailIcon } from "@react-components/icons";
import { cloneElement } from "react";

function Switch({ element, ...rest }) {
    return cloneElement(element, rest);
}

function Icons({ element, ...rest }) {
    const switchElement = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end mb8">
                <Switch icons={<EmailIcon />} size="small" element={switchElement} className="mr5" />
                <Switch icons={<EmailIcon />} element={switchElement} className="mr5" />
                <Switch icons={<EmailIcon />} size="large" element={switchElement} />
            </div>
            <div className="flex items-end mb8">
                <Switch icons={[<EmailIcon />, <EmailIcon />]} size="small" element={switchElement} className="mr5" />
                <Switch icons={[<EmailIcon />, <EmailIcon />]} element={switchElement} className="mr5" />
                <Switch icons={[<EmailIcon />, <EmailIcon />]} size="large" element={switchElement} />
            </div>
            <div className="flex items-end mb8">
                <Switch active icons={<EmailIcon />} element={switchElement} className="mr5" />
                <Switch focus icons={<EmailIcon />} element={switchElement} className="mr5" />
                <Switch hover icons={<EmailIcon />} element={switchElement} className="mr5" />
                <Switch focus hover icons={<EmailIcon />} element={switchElement} className="mr5" />
                <Switch readOnly icons={<EmailIcon />} element={switchElement} className="mr5" />
                <Switch disabled icons={<EmailIcon />} element={switchElement} className="mr5" />
            </div>
            <div className="flex items-end mb8">
                <Switch badge={<Badge>6</Badge>} icons={<EmailIcon />} size="small" element={switchElement} className="mr5" />
                <Switch badge={<Badge>6</Badge>} icons={<EmailIcon />} element={switchElement} className="mr5" />
                <Switch badge={<Badge>6</Badge>} icons={<EmailIcon />} size="large" element={switchElement} />
            </div>
        </>
    );
}

function Badges({ element, ...rest }) {
    const switchElement = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end mb8">
                <Switch badge={<Badge>6</Badge>} size="small" element={switchElement} className="mr5" />
                <Switch badge={<Badge>6</Badge>} element={switchElement} className="mr5" />
                <Switch badge={<Badge>6</Badge>} size="large" element={switchElement} />
            </div>
            <div className="flex items-end mb8">
                <Switch badge={<Badge variant="inline">6</Badge>} size="small" element={switchElement} className="mr5" />
                <Switch badge={<Badge variant="inline">6</Badge>} element={switchElement} className="mr5" />
                <Switch badge={<Badge variant="inline">6</Badge>} size="large" element={switchElement} />
            </div>
            <div className="flex">
                <Switch active badge={<Badge>6</Badge>} element={switchElement} className="mr5" />
                <Switch focus badge={<Badge>6</Badge>} element={switchElement} className="mr5" />
                <Switch hover badge={<Badge>6</Badge>} element={switchElement} className="mr5" />
                <Switch focus hover badge={<Badge>6</Badge>} element={switchElement} className="mr5" />
                <Switch disabled badge={<Badge>6</Badge>} element={switchElement} className="mr5" />
                <Switch readOnly badge={<Badge>6</Badge>} element={switchElement} />
            </div>
        </>
    );
}

export function createTestSuite(switchElement, stories) {
    return stories
        .add("label", () =>
            <div className="flex">
                <div className="flex flex-column">
                    <div className="flex items-end mb8">
                        <Switch label="Milky Way" element={switchElement} className="mr5" />
                        <Switch active label="Milky Way" element={switchElement} className="mr5" />
                        <Switch focus label="Milky Way" element={switchElement} className="mr5" />
                        <Switch hover label="Milky Way" element={switchElement} className="mr5" />
                        <Switch focus hover label="Milky Way" element={switchElement} className="mr5" />
                        <Switch disabled label="Milky Way" element={switchElement} className="mr5" />
                        <Switch readOnly label="Milky Way" element={switchElement} />
                    </div>
                    <div className="flex items-end mb8">
                        <Switch size="small" label="Milky Way" element={switchElement} className="mr5" />
                        <Switch label="Milky Way" element={switchElement} className="mr5" />
                        <Switch size="large" label="Milky Way" element={switchElement} />
                    </div>
                    <Icons label="Milky Way" element={switchElement} />
                    <Badges label="Milky Way" element={switchElement} />
                </div>
            </div>
        )
        .add("no label", () =>
            <div className="flex">
                <div className="flex flex-column">
                    <div className="flex items-end mb8">
                        <Switch element={switchElement} className="mr5" />
                        <Switch active element={switchElement} className="mr5" />
                        <Switch focus element={switchElement} className="mr5" />
                        <Switch hover element={switchElement} className="mr5" />
                        <Switch focus hover element={switchElement} className="mr5" />
                        <Switch disabled element={switchElement} className="mr5" />
                        <Switch readOnly element={switchElement} />
                    </div>
                    <div className="flex items-end mb8">
                        <Switch size="small" element={switchElement} className="mr5" />
                        <Switch element={switchElement} className="mr5" />
                        <Switch size="large" element={switchElement} />
                    </div>
                    <Icons element={switchElement} />
                    <Badges element={switchElement} />
                </div>
            </div>
        )
        .add("overflow", () =>
            <div className="flex">
                <div className="flex">
                    <div className="flex mw5">
                        <Switch label="PA-99-N2 event and possible exoplanet in galaxy" element={switchElement} className="mr5" />
                    </div>
                    <div className="flex mw5">
                        <Switch label="PA-99-N2 event and possible exoplanet in galaxy" element={switchElement} badge={<Badge>6</Badge>} className="mr5" />
                    </div>
                    <div className="flex mw5">
                        <Switch badge={<Badge>6</Badge>} icons={[<EmailIcon />, <EmailIcon />]} label="PA-99-N2 event and possible exoplanet in galaxy" element={switchElement} className="mr5" />
                    </div>
                    <div className="flex mw5">
                        <Switch count={<Badge variant="inline">6</Badge>} label="Shurnarkabtishashutu, under the southern horn of the bull" element={switchElement} className="mr5" />
                    </div>
                </div>
            </div>
        );
}
