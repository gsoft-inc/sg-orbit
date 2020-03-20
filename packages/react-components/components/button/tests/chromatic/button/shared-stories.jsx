import { Label, Tag } from "@orbit-ui/react-label/src";
import { SignoutIcon } from "@orbit-ui/react-icons/src";
import { cloneElement } from "react";

function Button({ element, ...rest }) {
    return cloneElement(element, rest);
}

function Icons({ element, ...rest }) {
    const button = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end mb5">
                <Button size="tiny" icon={<SignoutIcon />} element={button} className="mr5">Button</Button>
                <Button size="small" icon={<SignoutIcon />} element={button} className="mr5">Button</Button>
                <Button icon={<SignoutIcon />} element={button} className="mr5">Button</Button>
                <Button size="large" icon={<SignoutIcon />} element={button}>Button</Button>
            </div>
            <div className="flex items-end mb5">
                <Button size="tiny" icon={<SignoutIcon />} iconPosition="right" element={button} className="mr5">Button</Button>
                <Button size="small" icon={<SignoutIcon />} iconPosition="right" element={button} className="mr5">Button</Button>
                <Button icon={<SignoutIcon />} iconPosition="right" element={button} className="mr5">Button</Button>
                <Button size="large" icon={<SignoutIcon />} iconPosition="right" element={button}>Button</Button>
            </div>
            <div className="flex items-end mb5">
                <Button size="tiny" icon={<SignoutIcon />} element={button} className="mr5" />
                <Button size="small" icon={<SignoutIcon />} element={button} className="mr5" />
                <Button icon={<SignoutIcon />} element={button} className="mr5" />
                <Button size="large" icon={<SignoutIcon />} element={button} />
            </div>
            <div className="flex mb5">
                <Button icon={<SignoutIcon />} active element={button} className="mr5">Button</Button>
                <Button icon={<SignoutIcon />} disabled element={button} className="mr5">Button</Button>
                <Button icon={<SignoutIcon className="fill-red" />} element={button}>Button</Button>
            </div>
        </>
    );
}

function Loadings({ element, ...rest }) {
    const button = cloneElement(element, rest);

    return (
        <>
            <div className="flex mb5">
                <Button loading element={button} className="mr5">Button</Button>
                <Button active loading element={button} className="mr5">Button</Button>
                <Button disabled loading element={button} className="mr5">Button</Button>
                <Button loading element={button} className="mr5" />
                <Button icon={<SignoutIcon />} loading element={button} className="mr5">Button</Button>
                <Button icon={<SignoutIcon />} iconPosition="right" loading element={button}>Button</Button>
            </div>
            <div className="flex items-end mb5">
                <Button size="tiny" loading element={button} className="mr5">Button</Button>
                <Button size="small" loading element={button} className="mr5">Button</Button>
                <Button loading element={button} className="mr5">Button</Button>
                <Button size="large" loading element={button}>Button</Button>
            </div>
        </>
    );
}

function Labels({ element, ...rest }) {
    const button = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end mb5">
                <Button size="tiny" label={<Label>6</Label>} element={button} className="mr5">Button</Button>
                <Button size="small" label={<Label>6</Label>} element={button} className="mr5">Button</Button>
                <Button label={<Label>6</Label>} element={button} className="mr5">Button</Button>
                <Button size="large" label={<Label>6</Label>} element={button}>Button</Button>
            </div>
            <div className="flex mb5">
                <Button active label={<Label>6</Label>} element={button} className="mr5">Button</Button>
                <Button disabled label={<Label>6</Label>} element={button} className="mr5">Button</Button>
                <Button icon={<SignoutIcon />} label={<Label>6</Label>} element={button} className="mr5">Button</Button>
                <Button label={<Label className="bg-red">6</Label>} element={button} className="mr5">Button</Button>
                <Button label={<Label>6</Label>} loading element={button}>Button</Button>
            </div>
        </>
    );
}

function Tags({ element, ...rest }) {
    const button = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end mb5">
                <Button size="tiny" tag={<Tag className="bg-red" />} element={button} className="mr5">Button</Button>
                <Button size="small" tag={<Tag className="bg-red" />} element={button} className="mr5">Button</Button>
                <Button tag={<Tag className="bg-red" />} element={button} className="mr5">Button</Button>
                <Button size="large" tag={<Tag className="bg-red" />} element={button}>Button</Button>
            </div>
            <div className="flex">
                <Button active tag={<Tag className="bg-red" />} element={button} className="mr5">Button</Button>
                <Button disabled tag={<Tag className="bg-red" />} element={button} className="mr5">Button</Button>
                <Button tag={<Tag className="bg-red" />} icon={<SignoutIcon />} iconPosition="right" element={button} className="mr5">Button</Button>
                <Button tag={<Tag className="bg-red" />} loading element={button}>Button</Button>
            </div>
        </>
    );
}

export function createSharedStories(button, stories) {
    return stories
        .add("default", () =>
            <div className="flex">
                <div className="flex flex-column mr8">
                    <div className="flex mb5">
                        <Button element={button} className="mr5">Button</Button>
                        <Button active element={button} className="mr5">Button</Button>
                        <Button disabled element={button} className="mr5">Button</Button>
                        <Button className="bg-red" element={button}>Button</Button>
                    </div>
                    <div className="flex items-end mb5">
                        <Button size="tiny" element={button} className="mr5">Button</Button>
                        <Button size="small" element={button} className="mr5">Button</Button>
                        <Button element={button} className="mr5">Button</Button>
                        <Button size="large" element={button}>Button</Button>
                    </div>
                    <Icons element={button} />
                    <Loadings element={button} />
                    <Labels element={button} />
                </div>
                <div className="flex flex-column">
                    <Tags element={button} />
                </div>
            </div>
        )
        .add("ghost", () =>
            <div className="flex">
                <div className="flex flex-column mr8" >
                    <div className="flex mb5">
                        <Button ghost element={button} className="mr5">Button</Button>
                        <Button active ghost element={button} className="mr5">Button</Button>
                        <Button disabled ghost element={button} className="mr5">Button</Button>
                        <Button className="bg-red" ghost element={button}>Button</Button>
                    </div>
                    <div className="flex items-end mb5">
                        <Button size="tiny" ghost element={button} className="mr5">Button</Button>
                        <Button size="small" ghost element={button} className="mr5">Button</Button>
                        <Button ghost element={button} className="mr5">Button</Button>
                        <Button size="large" ghost element={button}>Button</Button>
                    </div>
                    <Icons ghost element={button} />
                    <Loadings ghost element={button} />
                    <Labels ghost element={button} />
                </div>
                <div className="flex flex-column">
                    <Tags ghost element={button} />
                </div>
            </div>
        )
        .add("basic", () =>
            <div className="flex">
                <div className="flex flex-column mr8" >
                    <div className="flex mb5">
                        <Button basic element={button} className="mr5">Button</Button>
                        <Button active basic element={button} className="mr5">Button</Button>
                        <Button disabled basic element={button} className="mr5">Button</Button>
                        <Button className="bg-red" basic element={button}>Button</Button>
                    </div>
                    <div className="flex items-end mb5">
                        <Button size="tiny" basic element={button} className="mr5">Button</Button>
                        <Button size="small" basic element={button} className="mr5">Button</Button>
                        <Button basic element={button} className="mr5">Button</Button>
                        <Button size="large" basic element={button}>Button</Button>
                    </div>
                    <Icons basic element={button} />
                    <Loadings basic element={button} />
                    <Labels basic element={button} />
                </div>
                <div className="flex flex-column">
                    <Tags basic element={button} />
                </div>
            </div>
        )
        .add("compact", () =>
            <div className="flex">
                <div className="flex flex-column mr8" >
                    <div className="flex mb5">
                        <Button compact element={button} className="mr5">Button</Button>
                        <Button active compact element={button} className="mr5">Button</Button>
                        <Button disabled compact element={button} className="mr5">Button</Button>
                        <Button className="bg-red" compact element={button}>Button</Button>
                    </div>
                    <div className="flex items-end mb5">
                        <Button size="tiny" compact element={button} className="mr5">Button</Button>
                        <Button size="small" compact element={button} className="mr5">Button</Button>
                        <Button compact element={button} className="mr5">Button</Button>
                        <Button size="large" compact element={button}>Button</Button>
                    </div>
                    <Icons compact element={button} />
                    <Loadings compact element={button} />
                    <Labels compact element={button} />
                </div>
                <div className="flex flex-column">
                    <Tags basic element={button} />
                </div>
            </div>
        )
        .add("circular", () =>
            <div className="flex flex-column">
                <div className="flex mb5">
                    <Button circular element={button} className="mr5">Aa</Button>
                    <Button active circular element={button} className="mr5">Aa</Button>
                    <Button disabled circular element={button} className="mr5">Aa</Button>
                    <Button className="bg-red" circular element={button}>Aa</Button>
                </div>
                <div className="flex items-end mb5">
                    <Button size="tiny" circular element={button} className="mr5">Aa</Button>
                    <Button size="small" circular element={button} className="mr5">Aa</Button>
                    <Button circular element={button} className="mr5">Aa</Button>
                    <Button size="large" circular element={button}>Aa</Button>
                </div>
                <div className="flex items-end mb5">
                    <Button size="tiny" icon={<SignoutIcon />} circular element={button} className="mr5" />
                    <Button size="small" icon={<SignoutIcon />} circular element={button} className="mr5" />
                    <Button icon={<SignoutIcon />} circular element={button} className="mr5" />
                    <Button size="large" icon={<SignoutIcon />} circular element={button} />
                </div>
                <div className="flex items-end mb5">
                    <Button size="tiny" icon={<SignoutIcon />} iconPosition="right" circular element={button} className="mr5" />
                    <Button size="small" icon={<SignoutIcon />} iconPosition="right" circular element={button} className="mr5" />
                    <Button icon={<SignoutIcon />} iconPosition="right" circular element={button} className="mr5" />
                    <Button size="large" icon={<SignoutIcon />} iconPosition="right" circular element={button} />
                </div>
                <div className="flex mb5">
                    <Button icon={<SignoutIcon />} active circular element={button} className="mr5" />
                    <Button icon={<SignoutIcon />} disabled circular element={button} className="mr5" />
                    <Button icon={<SignoutIcon className="fill-red" />} circular element={button} />
                </div>
                <Loadings circular element={button} />
            </div>
        );
}
