import { Button } from "@orbit-ui/react-button/src";
import { Buttons } from "./components";
import { CalendarIcon, ImageIcon, SignoutIcon } from "@orbit-ui/react-icons/src";
import { Label, Tag } from "@orbit-ui/react-label/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { isNil } from "lodash";

import styles from "./styles.module.css";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Button"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex">
                 <Buttons />
             </div>
    )
    .add("primary",
         () =>
             <div className="flex">
                 <Buttons primary />
             </div>
    )
    .add("secondary",
         () =>
             <div className="flex">
                 <Buttons secondary />
             </div>
    )
    .add("positive",
         () =>
             <div className="flex">
                 <Buttons positive />
             </div>
    )
    .add("negative",
         () =>
             <div className="flex">
                 <Buttons negative />
             </div>
    )
    .add("naked",
         () =>
             <div className="flex">
                 <Buttons naked />
             </div>
    )
    .add("naked coloured",
         () =>
             <div className="flex">
                 <div className="flex flex-column items-start">
                     <Button className={styles.button}
                         naked
                         style={{
                             backgroundColor: "#FCD5BC",
                             boxShadow: "0px 0px 0px 1px #FCD003 inset"
                         }}
                     >
                         Button
                     </Button>
                     <Button className={styles.button} naked active>Button</Button>
                     <Button disabled className={styles.button} naked>Button</Button>
                 </div>
             </div>
    )
    .add("groups",
         () =>
             <div className="flex">
                 <div className="flex flex-column items-start">
                     <Button.Group>
                         <Button label={<Label size="mini">6</Label>}>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group>
                         <Button disabled>One</Button>
                         <Button active>Two</Button>
                     </Button.Group>
                     <Button.Group negative>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group negative>
                         <Button disabled>One</Button>
                         <Button active>Two</Button>
                     </Button.Group>
                     <Button.Group positive>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group positive>
                         <Button disabled>One</Button>
                         <Button active>Two</Button>
                     </Button.Group>
                     <Button.Group primary>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group primary>
                         <Button disabled>One</Button>
                         <Button active>Two</Button>
                     </Button.Group>
                     <Button.Group secondary>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group secondary>
                         <Button disabled>One</Button>
                         <Button active>Two</Button>
                     </Button.Group>
                     <Button.Group secondary>
                         <Button icon={<SignoutIcon />} />
                         <Button icon={<CalendarIcon />} />
                         <Button icon={<ImageIcon />} />
                     </Button.Group>
                     <Button.Group secondary>
                         <Button disabled icon={<SignoutIcon />} />
                         <Button active icon={<CalendarIcon />} />
                     </Button.Group>
                     <Button.Group basic>
                         <Button icon={<SignoutIcon />}></Button>
                         <Button icon={<CalendarIcon />}></Button>
                         <Button icon={<ImageIcon />}></Button>
                     </Button.Group>
                     <Button.Group basic>
                         <Button disabled icon={<SignoutIcon />}></Button>
                         <Button disabled icon={<CalendarIcon />}></Button>
                         <Button icon={<ImageIcon />}></Button>
                     </Button.Group>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button.Group compact>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group size="tiny">
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group size="small">
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group size="large">
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group size="tiny" compact>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group size="small" compact>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group size="large" compact>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group size="tiny" fluid>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group secondary widths="10">
                         <Button>1</Button>
                         <Button>2</Button>
                         <Button>3</Button>
                         <Button>4</Button>
                     </Button.Group>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button.Group basic widths="3" compact>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group basic>
                         <Button disabled>One</Button>
                         <Button disabled>Two</Button>
                         <Button disabled>Three</Button>
                     </Button.Group>
                     <Button.Group basic>
                         <Button disabled>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group basic>
                         <Button>One</Button>
                         <Button active>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group basic>
                         <Button active>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group basic>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button active>Three</Button>
                     </Button.Group>
                     <Button.Group basic widths="7">
                         <Button>1</Button>
                         <Button>2</Button>
                         <Button>3</Button>
                         <Button>4</Button>
                         <Button>5</Button>
                         <Button>6</Button>
                         <Button>7</Button>
                     </Button.Group>
                 </div>
             </div>
    )
    .add("loading",
         () =>
             <div className="flex">
                 {/* text / loading */}
                 <div className="flex flex-column items-start">
                     <Button loading>Button</Button>
                     <Button loading active>Button</Button>
                     <Button loading disabled>Button</Button>
                     <Button loading ghost>Button</Button>
                     <Button loading active ghost>Button</Button>
                     <Button loading disabled ghost>Button</Button>
                     <Button loading basic>Button</Button>
                     <Button loading active basic>Button</Button>
                     <Button loading disabled basic>Button</Button>
                 </div>
                 {/* loading / Layout */}
                 <div className="flex flex-column items-start">
                     <Button loading compact>Button</Button>
                     <Button loading circular>Aa</Button>
                     <Button loading size="tiny">Button</Button>
                     <Button loading size="tiny" compact>Button</Button>
                     <Button loading size="tiny" circular>Aa</Button>
                     <Button loading size="small">Button</Button>
                     <Button loading size="small" compact>Button</Button>
                     <Button loading size="small" circular>Aa</Button>
                     <Button loading size="large">Button</Button>
                     <Button loading size="large" compact>Button</Button>
                     <Button loading size="large" circular>Aa</Button>
                 </div>
                 {/* icon / loading */}
                 <div className="flex flex-column items-start">
                     <Button loading icon={<CalendarIcon />}></Button>
                     <Button loading active icon={<CalendarIcon />}></Button>
                     <Button loading disabled icon={<CalendarIcon />}></Button>
                     <Button loading ghost icon={<CalendarIcon />}></Button>
                     <Button loading active ghost icon={<CalendarIcon />}></Button>
                     <Button loading disabled ghost icon={<CalendarIcon />}></Button>
                     <Button loading basic icon={<CalendarIcon />}></Button>
                     <Button loading active basic icon={<CalendarIcon />}></Button>
                     <Button loading disabled basic icon={<CalendarIcon />}></Button>
                 </div>
                 {/* loading / layout */}
                 <div className="flex flex-column items-start">
                     <Button loading compact icon={<CalendarIcon />}></Button>
                     <Button loading size="tiny" icon={<CalendarIcon />}></Button>
                     <Button loading size="tiny" compact icon={<CalendarIcon />}></Button>
                     <Button loading size="small" icon={<CalendarIcon />}></Button>
                     <Button loading size="small" compact icon={<CalendarIcon />}></Button>
                     <Button loading size="large" icon={<CalendarIcon />}></Button>
                     <Button loading size="large" compact icon={<CalendarIcon />}></Button>
                 </div>
             </div>
    )
    .add("custom css class", () =>
        <Button className="bg-red">Button</Button>
    )
    .add("icon", () =>
        <div className="flex">
            <Button icon={<CalendarIcon />}>Button</Button>
            <Button icon={<CalendarIcon />} iconPosition="right">Button</Button>
            <Button icon={<CalendarIcon className="fill-red" />} iconPosition="right">Button</Button>
        </div>
    );

function setRedBackground(element) {
    if (!isNil(element)) {
        element.classList.add("bg-red");
    }
}

stories("/label")
    // TODO: Move to shared component
    .add("element", () =>
        <div className="flex">
            <Button label={<Label>6</Label>}>Button</Button>
            <Button label={<Label className="bg-red">6</Label>}>Button</Button>
            <Button label={<Label ref={setRedBackground}>6</Label>}>Button</Button>
        </div>
    )
    .add("object", () =>
        <div className="flex">
            <Button label={{ content: "6" }}>Button</Button>
            <Button label={{ content: "6", className: "bg-red" }}>Button</Button>
            <Button label={{ content: "6", ref: setRedBackground }}>Button</Button>
        </div>
    )
    .add("size", () =>
        <div className="flex items-end">
            <Button size="tiny" label={<Label>6</Label>}>Button</Button>
            <Button size="small" label={<Label>6</Label>}>Button</Button>
            <Button label={<Label>6</Label>}>Button</Button>
            <Button size="large" label={<Label>6</Label>}>Button</Button>
        </div>
    );

stories("/tag")
    // TODO: Move to shared component
    .add("element", () =>
        <div className="flex">
            <Button tag={<Tag className="bg-red" />}>Button</Button>
            <Button tag={<Tag ref={setRedBackground} />}>Button</Button>
        </div>

    )
    .add("object", () =>
        <div className="flex">
            <Button tag={{ className: "bg-red" }}>Button</Button>
            <Button tag={{ ref: setRedBackground }}>Button</Button>
        </div>
    )
    .add("size", () =>
        <div className="flex items-end">
            <Button size="tiny" tag={<Tag className="bg-red" />}>Button</Button>
            <Button size="small" tag={<Tag className="bg-red" />}>Button</Button>
            <Button tag={<Tag className="bg-red" />}>Button</Button>
            <Button size="large" tag={<Tag className="bg-red" />}>Button</Button>
        </div>
    );



