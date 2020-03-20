import { CalendarIcon, SignoutIcon } from "@orbit-ui/react-icons/src";
import { Label, Tag } from "@orbit-ui/react-label/src";
import { any } from "prop-types";
import { cloneElement } from "react";

function Button({ element, ...rest }) {
    return cloneElement(element, rest);
}

Button.propTypes = {
    element: any.isRequired
};

function Icons({ element, ...rest }) {
    const button = cloneElement(element, rest);

    return (
        <>
            <div className="flex items-end" style={{ marginBottom: "50px" }}>
                <Button size="tiny" icon={<SignoutIcon />} element={button} className="mr5">Button</Button>
                <Button size="small" icon={<SignoutIcon />} element={button} className="mr5">Button</Button>
                <Button icon={<SignoutIcon />} element={button} className="mr5">Button</Button>
                <Button size="large" icon={<SignoutIcon />} element={button}>Button</Button>
            </div>
            <div className="flex items-end" style={{ marginBottom: "50px" }}>
                <Button size="tiny" icon={<SignoutIcon />} iconPosition="right" element={button} className="mr5">Button</Button>
                <Button size="small" icon={<SignoutIcon />} iconPosition="right" element={button} className="mr5">Button</Button>
                <Button icon={<SignoutIcon />} iconPosition="right" element={button} className="mr5">Button</Button>
                <Button size="large" icon={<SignoutIcon />} iconPosition="right" element={button}>Button</Button>
            </div>
            <div className="flex items-end" style={{ marginBottom: "50px" }}>
                <Button size="tiny" icon={<SignoutIcon />} element={button} className="mr5" />
                <Button size="small" icon={<SignoutIcon />} element={button} className="mr5" />
                <Button icon={<SignoutIcon />} element={button} className="mr5" />
                <Button size="large" icon={<SignoutIcon />} element={button} />
            </div>
            <div className="flex">
                <Button icon={<SignoutIcon />} active element={button} className="mr5">Button</Button>
                <Button icon={<SignoutIcon />} disabled element={button}>Button</Button>
            </div>
        </>
    );
}

export function createSharedStories(button, stories) {
    stories
        .add("default", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "50px" }}>
                    <Button element={button} className="mr5">Button</Button>
                    <Button active element={button} className="mr5">Button</Button>
                    <Button disabled element={button}>Button</Button>
                </div>
                <div className="flex items-end" style={{ marginBottom: "50px" }}>
                    <Button size="tiny" element={button} className="mr5">Button</Button>
                    <Button size="small" element={button} className="mr5">Button</Button>
                    <Button element={button} className="mr5">Button</Button>
                    <Button size="large" element={button}>Button</Button>
                </div>
                <Icons element={button} />
            </div>
        )
        .add("ghost", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "50px" }}>
                    <Button ghost element={button} className="mr5">Button</Button>
                    <Button ghost active element={button} className="mr5">Button</Button>
                    <Button ghost disabled element={button}>Button</Button>
                </div>
                <div className="flex items-end" style={{ marginBottom: "50px" }}>
                    <Button size="tiny" ghost element={button} className="mr5">Button</Button>
                    <Button size="small" ghost element={button} className="mr5">Button</Button>
                    <Button ghost element={button} className="mr5">Button</Button>
                    <Button size="large" ghost element={button}>Button</Button>
                </div>
                <Icons ghost element={button} />
            </div>
        )
        .add("basic", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "50px" }}>
                    <Button basic element={button} className="mr5">Button</Button>
                    <Button basic active element={button} className="mr5">Button</Button>
                    <Button basic disabled element={button}>Button</Button>
                </div>
                <div className="flex items-end" style={{ marginBottom: "50px" }}>
                    <Button size="tiny" basic element={button} className="mr5">Button</Button>
                    <Button size="small" basic element={button} className="mr5">Button</Button>
                    <Button basic element={button} className="mr5">Button</Button>
                    <Button size="large" basic element={button}>Button</Button>
                </div>
                <Icons basic element={button} />
            </div>
        )
        .add("compact", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "50px" }}>
                    <Button compact element={button} className="mr5">Button</Button>
                    <Button compact active element={button} className="mr5">Button</Button>
                    <Button compact disabled element={button}>Button</Button>
                </div>
                <div className="flex items-end" style={{ marginBottom: "50px" }}>
                    <Button size="tiny" compact element={button} className="mr5">Button</Button>
                    <Button size="small" compact element={button} className="mr5">Button</Button>
                    <Button compact element={button} className="mr5">Button</Button>
                    <Button size="large" compact element={button}>Button</Button>
                </div>
                <Icons compact element={button} />
            </div>
        )
        .add("circular", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "50px" }}>
                    <Button circular element={button} className="mr5">Aa</Button>
                    <Button circular active element={button} className="mr5">Aa</Button>
                    <Button circular disabled element={button}>Aa</Button>
                </div>
                <div className="flex items-end" style={{ marginBottom: "50px" }}>
                    <Button size="tiny" circular element={button} className="mr5">Aa</Button>
                    <Button size="small" circular element={button} className="mr5">Aa</Button>
                    <Button circular element={button} className="mr5">Aa</Button>
                    <Button size="large" circular element={button}>Aa</Button>
                </div>
                <div className="flex items-end" style={{ marginBottom: "50px" }}>
                    <Button size="tiny" icon={<SignoutIcon />} circular element={button} className="mr5" />
                    <Button size="small" icon={<SignoutIcon />} circular element={button} className="mr5" />
                    <Button icon={<SignoutIcon />} circular element={button} className="mr5" />
                    <Button size="large" icon={<SignoutIcon />} circular element={button} />
                </div>
                <div className="flex items-end" style={{ marginBottom: "50px" }}>
                    <Button size="tiny" icon={<SignoutIcon />} iconPosition="right" circular element={button} className="mr5" />
                    <Button size="small" icon={<SignoutIcon />} iconPosition="right" circular element={button} className="mr5" />
                    <Button icon={<SignoutIcon />} iconPosition="right" circular element={button} className="mr5" />
                    <Button size="large" icon={<SignoutIcon />} iconPosition="right" circular element={button} />
                </div>
                <div className="flex">
                    <Button icon={<SignoutIcon />} active circular element={button} className="mr5" />
                    <Button icon={<SignoutIcon />} disabled circular element={button} />
                </div>
            </div>
        )
        .add("tag", () =>
            <div className="flex flex-column">
                <div className="flex items-end" style={{ marginBottom: "50px" }}>
                    <Button size="tiny" tag={<Tag className="bg-red" />} element={button} className="mr5">Button</Button>
                    <Button size="small" tag={<Tag className="bg-red" />} element={button} className="mr5">Button</Button>
                    <Button tag={<Tag className="bg-red" />} element={button} className="mr5">Button</Button>
                    <Button size="large" tag={<Tag className="bg-red" />} element={button}>Button</Button>
                </div>
                <div className="flex items-end" style={{ marginBottom: "50px" }}>
                    <Button compact size="tiny" tag={<Tag className="bg-red" />} element={button} className="mr5">Button</Button>
                    <Button compact size="small" tag={<Tag className="bg-red" />} element={button} className="mr5">Button</Button>
                    <Button compact tag={<Tag className="bg-red" />} element={button} className="mr5">Button</Button>
                    <Button compact size="large" tag={<Tag className="bg-red" />} element={button}>Button</Button>
                </div>
                <div className="flex">
                    <Button tag={<Tag className="bg-red" />} icon={<SignoutIcon />} iconPosition="right" element={button} className="mr5">Button</Button>
                    <Button tag={<Tag className="bg-red" />} icon={<SignoutIcon />} iconPosition="right" compact element={button}>Button</Button>
                </div>
            </div>
        )
        .add("label", () =>
            <div className="flex flex-column">
                <div className="flex items-end" style={{ marginBottom: "50px" }}>
                    <Button size="tiny" label={<Label>6</Label>} element={button} className="mr5">Button</Button>
                    <Button size="small" label={<Label>6</Label>} element={button} className="mr5">Button</Button>
                    <Button label={<Label>6</Label>} element={button} className="mr5">Button</Button>
                    <Button size="large" label={<Label>6</Label>} element={button}>Button</Button>
                </div>
                <div className="flex items-end" style={{ marginBottom: "50px" }}>
                    <Button compact size="tiny" label={<Label>6</Label>} element={button} className="mr5">Button</Button>
                    <Button compact size="small" label={<Label>6</Label>} element={button} className="mr5">Button</Button>
                    <Button compact label={<Label>6</Label>} element={button} className="mr5">Button</Button>
                    <Button compact size="large" label={<Label>6</Label>} element={button}>Button</Button>
                </div>
                <div className="flex items-end" style={{ marginBottom: "50px" }}>
                    <Button label={<Label>6</Label>} icon={<SignoutIcon />} element={button} className="mr5">Button</Button>
                    <Button label={<Label>6</Label>} icon={<SignoutIcon />} compact element={button}>Button</Button>
                </div>
                <div className="flex">
                    <Button label={<Label className="bg-red">6</Label>} element={button}>Button</Button>
                </div>
            </div>
        );
}

// TODO: Instead of component we should have shareable stories. I think we need a function that accept a Button component and return an array of stories. "variant-stories.jsx".

export const Buttons = props => {
    return (
        <div className="flex items-start">
            {/* <div className="flex flex-column items-start">
                <Button {...props}>Button</Button>
                <Button active {...props}>Button</Button>
                <Button disabled {...props}>Button</Button>
                <Button {...props} ghost>Button</Button>
                <Button active ghost {...props}>Button</Button>
                <Button disabled ghost {...props}>Button</Button>
                <div className="flex flex-column bg-cloud-50">
                    <Button {...props} basic>Button</Button>
                    <Button {...props} active basic>Button</Button>
                    <Button {...props} disabled basic>Button</Button>
                </div>
            </div> */}
            {/* Layout */}
            <div className="flex flex-column items-start">
                <Button compact {...props}>Button</Button>
                <Button circular {...props}>Aa</Button>
                <Button size="tiny" {...props}>Button</Button>
                <Button size="tiny" compact {...props}>Button</Button>
                <Button size="tiny" circular {...props}>Aa</Button>
                <Button size="small" {...props}>Button</Button>
                <Button size="small" compact {...props}>Button</Button>
                <Button size="small" circular {...props}>Aa</Button>
                <Button size="large" {...props}>Button</Button>
                <Button size="large" compact {...props}>Button</Button>
                <Button size="large" circular {...props}>Aa</Button>
            </div>
            {/* skin should affect content here (icon colour) */}
            <div className="flex flex-column items-start">
                <Button icon={<SignoutIcon />} {...props}>Button</Button>
                <Button icon={<SignoutIcon />} active {...props}>Button</Button>
                <Button icon={<SignoutIcon />} disabled {...props}>Button</Button>
                <Button icon={<SignoutIcon />} {...props} ghost>Button</Button>
                <Button icon={<SignoutIcon />} active ghost {...props}>Button</Button>
                <Button icon={<SignoutIcon />} disabled ghost {...props}>Button</Button>
                <div className="flex flex-column bg-cloud-50">
                    <Button icon={<SignoutIcon />} {...props} basic>Button</Button>
                    <Button icon={<SignoutIcon />} {...props} active basic>Button</Button>
                    <Button icon={<SignoutIcon />} {...props} disabled basic>Button</Button>
                </div>
            </div>
            {/* icon + text */}
            <div className="flex flex-column items-start">
                <Button icon={<SignoutIcon />} compact {...props}>Button</Button>
                <Button icon={<SignoutIcon />} circular {...props}></Button>
                <Button icon={<SignoutIcon />} size="tiny" {...props}>Button</Button>
                <Button icon={<SignoutIcon />} size="tiny" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon />} size="tiny" circular {...props}></Button>
                <Button icon={<SignoutIcon />} size="small" {...props}>Button</Button>
                <Button icon={<SignoutIcon />} size="small" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon />} size="small" circular {...props}></Button>
                <Button icon={<SignoutIcon />} size="large" {...props}>Button</Button>
                <Button icon={<SignoutIcon />} size="large" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon />} size="large" circular {...props}></Button>
            </div>
            {/* icon right + text */}
            <div className="flex flex-column items-start">
                <Button icon={<SignoutIcon />} iconPosition="right" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon />} circular {...props}></Button>
                <Button icon={<SignoutIcon />} iconPosition="right" size="tiny" {...props}>Button</Button>
                <Button icon={<SignoutIcon />} iconPosition="right" size="tiny" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon />} size="tiny" circular {...props}></Button>
                <Button icon={<SignoutIcon />} iconPosition="right" size="small" {...props}>Button</Button>
                <Button icon={<SignoutIcon />} iconPosition="right" size="small" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon />} size="small" circular {...props}></Button>
                <Button icon={<SignoutIcon />} iconPosition="right" size="large" {...props}>Button</Button>
                <Button icon={<SignoutIcon />} iconPosition="right" size="large" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon />} size="large" circular {...props}></Button>
            </div>
            {/* icon */}
            <div className="flex flex-column items-start">
                <Button {...props} icon={<CalendarIcon />}></Button>
                <Button active {...props} icon={<CalendarIcon />}></Button>
                <Button disabled {...props} icon={<CalendarIcon />}></Button>
                <Button {...props} ghost icon={<CalendarIcon />}></Button>
                <Button active ghost {...props} icon={<CalendarIcon />}></Button>
                <Button disabled ghost {...props} icon={<CalendarIcon />}></Button>
                <div className="flex flex-column bg-cloud-50">
                    <Button {...props} basic icon={<CalendarIcon />}></Button>
                    <Button {...props} active basic icon={<CalendarIcon />}></Button>
                    <Button {...props} disabled basic icon={<CalendarIcon />}></Button>
                </div>
            </div>
            {/* icon / layout */}
            <div className="flex flex-column items-start">
                <Button compact {...props} icon={<CalendarIcon />}></Button>
                <Button size="tiny" {...props} icon={<CalendarIcon />}></Button>
                <Button size="tiny" compact {...props} icon={<CalendarIcon />}></Button>
                <Button size="small" {...props} icon={<CalendarIcon />}></Button>
                <Button size="small" compact {...props} icon={<CalendarIcon />}></Button>
                <Button size="large" {...props} icon={<CalendarIcon />}></Button>
                <Button size="large" compact {...props} icon={<CalendarIcon />}></Button>
            </div>
            {/* CONTENT? */}
            {/* tag + text / tag + text + icon / label + text / label + text + icon */}
            <div className="flex flex-column items-start">
                <Button tag={<Tag className="bg-red" />} {...props}>One</Button>
                <Button tag={<Tag className="bg-red" />} compact {...props}>One</Button>
                <Button tag={<Tag className="bg-red" />} icon={<CalendarIcon />} iconPosition="right" {...props}>One</Button>
                <Button tag={<Tag className="bg-red" />} icon={<CalendarIcon />} iconPosition="right" compact {...props}>One</Button>
                <Button label={<Label>6</Label>} {...props}>One</Button>
                <Button label={<Label>6</Label>} compact {...props}>One</Button>
                <Button label={<Label>6</Label>} icon={<CalendarIcon />} {...props}>One</Button>
                <Button label={<Label>6</Label>} icon={<CalendarIcon />} compact {...props}>One</Button>
            </div>
        </div>
    );
};
