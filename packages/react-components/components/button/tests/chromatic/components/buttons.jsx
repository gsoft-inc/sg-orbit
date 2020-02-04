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
                <Button icon={<SignoutIcon24 />} iconPosition="right" circular {...props}></Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="tiny" {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="tiny" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="tiny" circular {...props}></Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="small" {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="small" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="small" circular {...props}></Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="large" {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="large" compact {...props}>Button</Button>
                <Button icon={<SignoutIcon24 />} iconPosition="right" size="large" circular {...props}></Button>
            </div>
            {/* icon */}
            <div className="flex flex-column items-start">
                <Button {...props}><CalendarIcon /></Button>
                <Button active {...props}><CalendarIcon /></Button>
                <Button disabled {...props}><CalendarIcon /></Button>
                <Button {...props} ghost><CalendarIcon /></Button>
                <Button active ghost {...props}><CalendarIcon /></Button>
                <Button disabled ghost {...props}><CalendarIcon /></Button>
                <Button {...props} basic><CalendarIcon /></Button>
                <Button {...props} active basic><CalendarIcon /></Button>
                <Button {...props} disabled basic><CalendarIcon /></Button>
            </div>
            {/* icon / layout */}
            <div className="flex flex-column items-start">
                <Button compact {...props}><CalendarIcon /></Button>
                <Button size="tiny" {...props}><CalendarIcon24 /></Button>
                <Button size="tiny" compact {...props}><CalendarIcon24 /></Button>
                <Button size="small" {...props}><CalendarIcon24 /></Button>
                <Button size="small" compact {...props}><CalendarIcon24 /></Button>
                <Button size="large" {...props}><CalendarIcon /></Button>
                <Button size="large" compact {...props}><CalendarIcon /></Button>
            </div>
            {/* tag + text / tag + text + icon / label + text / label + text + icon */}
            <div className="flex flex-column items-start">
                <Button tag={<Tag className="bg-red" />}>One</Button>
                <Button tag={<Tag className="bg-red" />} compact>One</Button>
                <Button tag={<Tag className="bg-red" />} icon={<CalendarIcon24 />} iconPosition="right">One</Button>
                <Button tag={<Tag className="bg-red" />} icon={<CalendarIcon24 />} iconPosition="right" compact>One</Button>
                <Button label={<Label>6</Label>}>One</Button>
                <Button label={<Label>6</Label>} compact>One</Button>
                <Button label={<Label>6</Label>} icon={<CalendarIcon24 />}>One</Button>
                <Button label={<Label>6</Label>} icon={<CalendarIcon24 />} compact>One</Button>
            </div>
            {/* text / loading */}
            <div className="flex flex-column items-start">
                <Button loading {...props} className="paused">Button</Button>
                <Button loading active {...props} className="paused">Button</Button>
                <Button loading disabled {...props} className="paused">Button</Button>
                <Button loading {...props} className="paused" ghost>Button</Button>
                <Button loading active ghost {...props} className="paused">Button</Button>
                <Button loading disabled ghost {...props} className="paused">Button</Button>
                <Button loading {...props} className="paused" basic>Button</Button>
                <Button loading {...props} className="paused" active basic>Button</Button>
                <Button loading {...props} className="paused" disabled basic>Button</Button>
            </div>
            {/* loading / Layout */}
            <div className="flex flex-column items-start">
                <Button loading className="paused" compact {...props}>Button</Button>
                <Button loading className="paused" circular {...props}>Aa</Button>
                <Button loading className="paused" size="tiny" {...props}>Button</Button>
                <Button loading className="paused" size="tiny" compact {...props}>Button</Button>
                <Button loading className="paused" size="tiny" circular {...props}>Aa</Button>
                <Button loading className="paused" size="small" {...props}>Button</Button>
                <Button loading className="paused" size="small" compact {...props}>Button</Button>
                <Button loading className="paused" size="small" circular {...props}>Aa</Button>
                <Button loading className="paused" size="large" {...props}>Button</Button>
                <Button loading className="paused" size="large" compact {...props}>Button</Button>
                <Button loading className="paused" size="large" circular {...props}>Aa</Button>
            </div>
            {/* icon / loading */}
            <div className="flex flex-column items-start">
                <Button loading className="paused" {...props}><CalendarIcon /></Button>
                <Button loading className="paused" active {...props}><CalendarIcon /></Button>
                <Button loading className="paused" disabled {...props}><CalendarIcon /></Button>
                <Button loading className="paused" {...props} ghost><CalendarIcon /></Button>
                <Button loading className="paused" active ghost {...props}><CalendarIcon /></Button>
                <Button loading className="paused" disabled ghost {...props}><CalendarIcon /></Button>
                <Button loading className="paused" {...props} basic><CalendarIcon /></Button>
                <Button loading className="paused" {...props} active basic><CalendarIcon /></Button>
                <Button loading className="paused" {...props} disabled basic><CalendarIcon /></Button>
            </div>
            {/* loading / layout */}
            <div className="flex flex-column items-start">
                <Button loading className="paused" compact {...props}><CalendarIcon /></Button>
                <Button loading className="paused" size="tiny" {...props}><CalendarIcon24 /></Button>
                <Button loading className="paused" size="tiny" compact {...props}><CalendarIcon24 /></Button>
                <Button loading className="paused" size="small" {...props}><CalendarIcon24 /></Button>
                <Button loading className="paused" size="small" compact {...props}><CalendarIcon24 /></Button>
                <Button loading className="paused" size="large" {...props}><CalendarIcon /></Button>
                <Button loading className="paused" size="large" compact {...props}><CalendarIcon /></Button>
            </div>
        </div>
    );
};
