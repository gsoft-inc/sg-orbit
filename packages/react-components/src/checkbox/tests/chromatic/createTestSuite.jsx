import { Badge } from "@react-components/badge";
import { EmailIcon } from "@react-components/icons";
import { cloneElement } from "react";

function Checkbox({ element, ...rest }) {
    return cloneElement(element, rest);
}

function Icons({ element, ...rest }) {
    const checkbox = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end mb8">
                <Checkbox icons={<EmailIcon />} size="small" element={checkbox} className="mr5" />
                <Checkbox icons={<EmailIcon />} element={checkbox} className="mr5" />
                <Checkbox icons={<EmailIcon />} size="large" element={checkbox} />
            </div>
            <div className="flex items-end mb8">
                <Checkbox icons={[<EmailIcon />, <EmailIcon />]} size="small" element={checkbox} className="mr5" />
                <Checkbox icons={[<EmailIcon />, <EmailIcon />]} element={checkbox} className="mr5" />
                <Checkbox icons={[<EmailIcon />, <EmailIcon />]} size="large" element={checkbox} />
            </div>
            <div className="flex items-end mb8">
                <Checkbox active icons={<EmailIcon />} element={checkbox} className="mr5" />
                <Checkbox focus icons={<EmailIcon />} element={checkbox} className="mr5" />
                <Checkbox hover icons={<EmailIcon />} element={checkbox} className="mr5" />
                <Checkbox focus hover icons={<EmailIcon />} element={checkbox} className="mr5" />
                <Checkbox readOnly icons={<EmailIcon />} element={checkbox} className="mr5" />
                <Checkbox disabled icons={<EmailIcon />} element={checkbox} className="mr5" />
            </div>
            <div className="flex items-end mb8">
                <Checkbox badge={<Badge>6</Badge>} icons={<EmailIcon />} size="small" element={checkbox} className="mr5" />
                <Checkbox badge={<Badge>6</Badge>} icons={<EmailIcon />} element={checkbox} className="mr5" />
                <Checkbox badge={<Badge>6</Badge>} icons={<EmailIcon />} size="large" element={checkbox} />
            </div>
            <div className="flex items-end mb8">
                <Checkbox badge={<Badge inline>6</Badge>} icons={<EmailIcon />} size="small" element={checkbox} className="mr5" />
                <Checkbox badge={<Badge inline>6</Badge>} icons={<EmailIcon />} element={checkbox} className="mr5" />
                <Checkbox badge={<Badge inline>6</Badge>} icons={<EmailIcon />} size="large" element={checkbox} />
            </div>
        </>
    );
}

function Badges({ element, ...rest }) {
    const checkbox = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end mb8">
                <Checkbox badge={<Badge>6</Badge>} size="small" element={checkbox} className="mr5" />
                <Checkbox badge={<Badge>6</Badge>} element={checkbox} className="mr5" />
                <Checkbox badge={<Badge>6</Badge>} size="large" element={checkbox} />
            </div>
            <div className="flex items-end mb8">
                <Checkbox badge={<Badge inline>6</Badge>} size="small" element={checkbox} className="mr5" />
                <Checkbox badge={<Badge inline>6</Badge>} element={checkbox} className="mr5" />
                <Checkbox badge={<Badge inline>6</Badge>} size="large" element={checkbox} />
            </div>
            <div className="flex mb8">
                <Checkbox active badge={<Badge>6</Badge>} element={checkbox} className="mr5" />
                <Checkbox focus badge={<Badge>6</Badge>} element={checkbox} className="mr5" />
                <Checkbox hover badge={<Badge>6</Badge>} element={checkbox} className="mr5" />
                <Checkbox focus hover badge={<Badge>6</Badge>} element={checkbox} className="mr5" />
                <Checkbox disabled badge={<Badge>6</Badge>} element={checkbox} className="mr5" />
                <Checkbox readOnly badge={<Badge>6</Badge>} element={checkbox} />
            </div>
        </>
    );
}

export function createTestSuite(checkbox, stories) {
    return stories
        .add("text", () =>
            <div className="flex flex-column">
                <div className="flex items-end mb8">
                    <Checkbox label="Milky Way" element={checkbox} className="mr5" />
                    <Checkbox active label="Milky Way" element={checkbox} className="mr5" />
                    <Checkbox focus label="Milky Way" element={checkbox} className="mr5" />
                    <Checkbox hover label="Milky Way" element={checkbox} className="mr5" />
                    <Checkbox focus hover label="Milky Way" element={checkbox} className="mr5" />
                    <Checkbox disabled label="Milky Way" element={checkbox} className="mr5" />
                    <Checkbox readOnly label="Milky Way" element={checkbox} />
                </div>
                <div className="flex items-end mb8">
                    <Checkbox size="small" label="Milky Way" element={checkbox} className="mr5" />
                    <Checkbox label="Milky Way" element={checkbox} className="mr5" />
                    <Checkbox size="large" label="Milky Way" element={checkbox} />
                </div>
                <Icons label="Milky Way" element={checkbox} />
                <Badges label="Milky Way" element={checkbox} />
            </div>
        )
        .add("no text", () =>
            <div className="flex flex-column">
                <div className="flex items-end mb8">
                    <Checkbox element={checkbox} className="mr5" />
                    <Checkbox active element={checkbox} className="mr5" />
                    <Checkbox focus element={checkbox} className="mr5" />
                    <Checkbox hover element={checkbox} className="mr5" />
                    <Checkbox focus hover element={checkbox} className="mr5" />
                    <Checkbox disabled element={checkbox} className="mr5" />
                    <Checkbox readOnly element={checkbox} />
                </div>
                <div className="flex items-end mb8">
                    <Checkbox size="small" element={checkbox} className="mr5" />
                    <Checkbox element={checkbox} className="mr5" />
                    <Checkbox size="large" element={checkbox} />
                </div>
                <Icons element={checkbox} />
                <Badges element={checkbox} />
            </div>
        )
        .add("overflow", () =>
            <div className="flex mb8">
                <div className="flex items-end mw5">
                    <Checkbox label="PA-99-N2 event and possible exoplanet in galaxy" element={checkbox} className="mr5" />
                </div>
                <div className="flex items-end mw5">
                    <Checkbox icons={[<EmailIcon />, <EmailIcon />]} label="PA-99-N2 event and possible exoplanet in galaxy" element={checkbox} className="mr5" />
                </div>
                <div className="flex items-end mw5">
                    <Checkbox badge={<Badge inline>6</Badge>} label="PA-99-N2 event and possible exoplanet in galaxy" element={checkbox} className="mr5" />
                </div>
                <div className="flex items-end mw5">
                    <Checkbox badge={<Badge>6</Badge>} label="PA-99-N2 event and possible exoplanet in galaxy" element={checkbox} className="mr5" />
                </div>
            </div>
        );
}
