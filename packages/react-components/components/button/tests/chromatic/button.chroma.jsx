import { Button } from "@orbit-ui/react-button/src";
import { Buttons } from "./components";
import { CalendarIcon, ImageIcon, SignoutIcon } from "@orbit-ui/react-icons";
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
             <div className="flex flex-row">
                 <Buttons />
             </div>
    )
    .add("primary",
         () =>
             <div className="flex flex-row">
                 <Buttons primary />
             </div>
    )
    .add("secondary",
         () =>
             <div className="flex flex-row">
                 <Buttons secondary />
             </div>
    )
    .add("positive",
         () =>
             <div className="flex flex-row">
                 <Buttons positive />
             </div>
    )
    .add("negative",
         () =>
             <div className="flex flex-row">
                 <Buttons negative />
             </div>
    )
    .add("naked",
         () =>
             <div className="flex flex-row">
                 <Buttons naked />
             </div>
    );

stories()
    .add("naked coloured",
         () =>
             <div className="flex flex-row">
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
    );

stories()
    .add("groups",
         () =>
             <div className="flex flex-row">
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
    );

stories()
    .add("loading",
         () =>
             <div className="flex flex-row">
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
    );

stories()
    .add("custom css class", () =>
        <Button className="bg-red">Button</Button>
    );

stories("/shorthand props/icons")
    .add("default", () =>
        <Button icon={<CalendarIcon />}>Button</Button>
    )
    .add("right", () =>
        <Button icon={<CalendarIcon />} iconPosition="right">Button</Button>
    )
    .add("css class", () =>
        <Button icon={<CalendarIcon className="fill-red" />} iconPosition="right">Button</Button>
    );

function setRedBackground(element) {
    if (!isNil(element)) {
        element.classList.add("bg-red");
    }
}

stories("/shorthand props/label/render")
    .add("default", () =>
        <Button label={<Label>6</Label>}>Button</Button>
    )
    .add("css class", () =>
        <Button label={<Label className="bg-red">6</Label>}>Button</Button>
    )
    .add("ref", () =>
        <Button label={<Label ref={setRedBackground}>6</Label>}>Button</Button>
    );

stories("/shorthand props/label/object")
    .add("default", () =>
        <Button label={{ content: "6" }}>Button</Button>
    )
    .add("css class", () =>
        <Button label={{ content: "6", className: "bg-red" }}>Button</Button>
    )
    .add("ref", () =>
        <Button label={{ content: "6", ref: setRedBackground }}>Button</Button>
    );

stories("/shorthand props/tag/render")
    .add("default", () =>
        <Button tag={<Tag className="bg-red" />}>Button</Button>
    )
    .add("ref", () =>
        <Button tag={<Tag ref={setRedBackground} />}>Button</Button>
    );

stories("/shorthand props/tag/object")
    .add("default", () =>
        <Button tag={{ className: "bg-red" }}>Button</Button>
    )
    .add("ref", () =>
        <Button tag={{ ref: setRedBackground }}>Button</Button>
    );



