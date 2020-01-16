import { Button } from "@orbit-ui/react-buttons/src";
import { CalendarIcon, CalendarIcon24, SignoutIcon24 } from "@orbit-ui/icons";

export const ThemeButtons = props => {

    return (
        <>
            <div className="flex flex-row items-start">
                <div className="flex flex-column items-start">
                    <Button {...props}>Default</Button>
                    <Button active {...props}>Default</Button>
                    <Button disabled {...props}>Default</Button>
                    <Button {...props} ghost>Default</Button>
                    <Button active ghost {...props}>Default</Button>
                    <Button disabled ghost {...props}>Default</Button>
                    <Button {...props} basic>Default</Button>
                    <Button {...props} active basic>Default</Button>
                    <Button {...props} disabled basic>Default</Button>
                </div>
                {/* Layout */}
                <div className="flex flex-column items-start">
                    <Button compact {...props}>Default</Button>
                    <Button circular {...props}>Aa</Button>
                    <Button size="tiny" {...props}>Default</Button>
                    <Button size="tiny" compact {...props}>Default</Button>
                    <Button size="tiny" circular {...props}>Aa</Button>
                    <Button size="small" {...props}>Default</Button>
                    <Button size="small" compact {...props}>Default</Button>
                    <Button size="small" circular {...props}>Aa</Button>
                    <Button size="large" {...props}>Default</Button>
                    <Button size="large" compact {...props}>Default</Button>
                    <Button size="large" circular {...props}>Aa</Button>
                </div>
                {/* skin should affect content here (icon colour) */}
                <div className="flex flex-column items-start">
                    <Button icon {...props}><SignoutIcon24 className="w6 h6 mr1" />Default</Button>
                    <Button icon active {...props}><SignoutIcon24 className="w6 h6 mr1" />Default</Button>
                    <Button icon disabled {...props}><SignoutIcon24 className="w6 h6 mr1" />Default</Button>
                    <Button icon {...props} ghost><SignoutIcon24 className="w6 h6 mr1" />Default</Button>
                    <Button icon active ghost {...props}><SignoutIcon24 className="w6 h6 mr1" />Default</Button>
                    <Button icon disabled ghost {...props}><SignoutIcon24 className="w6 h6 mr1" />Default</Button>
                    <Button icon {...props} basic><SignoutIcon24 className="w6 h6 mr1" />Default</Button>
                    <Button icon {...props} active basic><SignoutIcon24 className="w6 h6 mr1" />Default</Button>
                    <Button icon {...props} disabled basic><SignoutIcon24 className="w6 h6 mr1" />Default</Button>
                </div>
                {/* icon + text */}
                <div className="flex flex-column items-start">
                    <Button icon compact {...props}><SignoutIcon24 className="w6 h6 mr1" />Default</Button>
                    <Button icon circular {...props}><SignoutIcon24 className="icon" /></Button>
                    <Button icon size="tiny" {...props}><SignoutIcon24 className="w4 h4 mr1" />Default</Button>
                    <Button icon size="tiny" compact {...props}><SignoutIcon24 className="w4 h4 mr1" />Default</Button>
                    <Button icon size="tiny" circular {...props}><SignoutIcon24 className="icon" /></Button>
                    <Button icon size="small" {...props}><SignoutIcon24 className="w5 h5 mr1" />Default</Button>
                    <Button icon size="small" compact {...props}><SignoutIcon24 className="w5 h5 mr1" />Default</Button>
                    <Button icon size="small" circular {...props}><SignoutIcon24 className="icon" /></Button>
                    <Button icon size="large" {...props}><SignoutIcon24 className="w6 h6 mr1" />Default</Button>
                    <Button icon size="large" compact {...props}><SignoutIcon24 className="w6 h6 mr1" />Default</Button>
                    <Button icon size="large" circular {...props}><SignoutIcon24 className="icon" /></Button>
                </div>
                {/* icon */}
                <div className="flex flex-column items-start">
                    <Button {...props}><CalendarIcon className="w6 h6" /></Button>
                    <Button active {...props}><CalendarIcon className="w6 h6" /></Button>
                    <Button disabled {...props}><CalendarIcon className="w6 h6" /></Button>
                    <Button {...props} ghost><CalendarIcon className="w6 h6" /></Button>
                    <Button active ghost {...props}><CalendarIcon className="w6 h6" /></Button>
                    <Button disabled ghost {...props}><CalendarIcon className="w6 h6" /></Button>
                    <Button {...props} basic><CalendarIcon className="w6 h6" /></Button>
                    <Button {...props} active basic><CalendarIcon className="w6 h6" /></Button>
                    <Button {...props} disabled basic><CalendarIcon className="w6 h6" /></Button>
                </div>
                {/* icon / layout */}
                <div className="flex flex-column items-start">
                    <Button compact {...props}><CalendarIcon className="w6 h6" /></Button>
                    <Button size="tiny" {...props}><CalendarIcon24 className="w4 h4" /></Button>
                    <Button size="tiny" compact {...props}><CalendarIcon24 className="w4 h4" /></Button>
                    <Button size="small" {...props}><CalendarIcon24 className="w5 h5" /></Button>
                    <Button size="small" compact {...props}><CalendarIcon24 className="w5 h5" /></Button>
                    <Button size="large" {...props}><CalendarIcon className="w7 h7" /></Button>
                    <Button size="large" compact {...props}><CalendarIcon className="w7 h7" /></Button>
                </div>
            </div>
        </>
    );
};
