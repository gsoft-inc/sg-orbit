import { Button } from "@orbit-ui/react-button/src";
import { CalendarIcon, SignoutIcon } from "@orbit-ui/icons";
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
                <Button icon={<SignoutIcon />} {...props}>Button</Button>
                <Button icon={<SignoutIcon />} active {...props}>Button</Button>
                <Button icon={<SignoutIcon />} disabled {...props}>Button</Button>
                <Button icon={<SignoutIcon />} {...props} ghost>Button</Button>
                <Button icon={<SignoutIcon />} active ghost {...props}>Button</Button>
                <Button icon={<SignoutIcon />} disabled ghost {...props}>Button</Button>
                <Button icon={<SignoutIcon />} {...props} basic>Button</Button>
                <Button icon={<SignoutIcon />} {...props} active basic>Button</Button>
                <Button icon={<SignoutIcon />} {...props} disabled basic>Button</Button>
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
                <Button {...props} basic icon={<CalendarIcon />}></Button>
                <Button {...props} active basic icon={<CalendarIcon />}></Button>
                <Button {...props} disabled basic icon={<CalendarIcon />}></Button>
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
