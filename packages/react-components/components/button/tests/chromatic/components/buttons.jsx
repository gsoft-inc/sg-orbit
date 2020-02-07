import { Button } from "@orbit-ui/react-button/src";
import { CalendarIcon, CalendarIcon24, SignoutIcon24 } from "@orbit-ui/icons";
import { Label, Tag } from "@orbit-ui/react-label/src";

export const Buttons = props => {
    return (
        <div className="flex flex-row items-start">
            <div className="flex flex-column items-start">
                <Button {...props}>Button</Button>
                <Button active {...props}>Button</Button>
                <Button disabled {...props}>Button</Button>
                <Button {...props} ghost>Button</Button>
                <Button active ghost {...props}>Button</Button>
                <Button disabled ghost {...props}>Button</Button>
                <Button {...props} basic>Button</Button>
                <Button {...props} active basic>Button</Button>
                <Button {...props} disabled basic>Button</Button>
            </div>
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
                <Button icon={<SignoutIcon24 />} {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} active {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} disabled {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} {...props} ghost>Button</Button>
                <Button icon={<SignoutIcon24 />} active ghost {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} disabled ghost {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} {...props} basic>Button</Button>
                <Button icon={<SignoutIcon24 />} {...props} active basic>Button</Button>
                <Button icon={<SignoutIcon24 />} {...props} disabled basic>Button</Button>
            </div>
            {/* icon + text */}
            <div className="flex flex-column items-start">
                <Button icon={<SignoutIcon24 />} compact {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} circular {...props}></Button>
                <Button icon={<SignoutIcon24 />} size="tiny" {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} size="tiny" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} size="tiny" circular {...props}></Button>
                <Button icon={<SignoutIcon24 />} size="small" {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} size="small" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} size="small" circular {...props}></Button>
                <Button icon={<SignoutIcon24 />} size="large" {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} size="large" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} size="large" circular {...props}></Button>
            </div>
            {/* icon right + text */}
            <div className="flex flex-column items-start">
                <Button icon={<SignoutIcon24 />} iconPosition="right" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} circular {...props}></Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="tiny" {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="tiny" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} size="tiny" circular {...props}></Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="small" {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="small" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} size="small" circular {...props}></Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="large" {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="large" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} size="large" circular {...props}></Button>
            </div>
            {/* icon */}
            <div className="flex flex-column items-start">
                <Button {...props} icon={<CalendarIcon />}></Button>
                <Button active {...props} icon={<CalendarIcon />}></Button>
                <Button disabled {...props} icon={<CalendarIcon />}></Button>
                <Button {...props} ghost icon={<CalendarIcon />}></Button>
                <Button active ghost {...props} icon={<CalendarIcon />}></Button>
                <Button disabled ghost {...props} icon={<CalendarIcon />}></Button>
                <Button {...props} basic icon={<CalendarIcon />}></Button>
                <Button {...props} active basic icon={<CalendarIcon />}></Button>
                <Button {...props} disabled basic icon={<CalendarIcon />}></Button>
            </div>
            {/* icon / layout */}
            <div className="flex flex-column items-start">
                <Button compact {...props} icon={<CalendarIcon />}></Button>
                <Button size="tiny" {...props} icon={<CalendarIcon24 />}></Button>
                <Button size="tiny" compact {...props} icon={<CalendarIcon24 />}></Button>
                <Button size="small" {...props} icon={<CalendarIcon24 />}></Button>
                <Button size="small" compact {...props} icon={<CalendarIcon24 />}></Button>
                <Button size="large" {...props} icon={<CalendarIcon />}></Button>
                <Button size="large" compact {...props} icon={<CalendarIcon />}></Button>
            </div>
            {/* tag + text / tag + text + icon / label + text / label + text + icon */}
            <div className="flex flex-column items-start">
                <Button tag={<Tag className="bg-red" />} {...props}>One</Button>
                <Button tag={<Tag className="bg-red" />} compact {...props}>One</Button>
                <Button tag={<Tag className="bg-red" />} icon={<CalendarIcon24 />} iconPosition="right" {...props}>One</Button>
                <Button tag={<Tag className="bg-red" />} icon={<CalendarIcon24 />} iconPosition="right" compact {...props}>One</Button>
                <Button label={<Label>6</Label>} {...props}>One</Button>
                <Button label={<Label>6</Label>} compact {...props}>One</Button>
                <Button label={<Label>6</Label>} icon={<CalendarIcon24 />} {...props}>One</Button>
                <Button label={<Label>6</Label>} icon={<CalendarIcon24 />} compact {...props}>One</Button>
            </div>
        </div>
    );
};
