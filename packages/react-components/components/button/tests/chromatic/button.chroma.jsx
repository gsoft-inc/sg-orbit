import { Button } from "@orbit-ui/react-button/src";
import { Buttons } from "./components";
import { CalendarIcon24, ImageIcon, SignoutIcon24 } from "@orbit-ui/icons";
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
                         <Button>One <Label size="mini">12</Label></Button>
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
                     <Button.Group icon secondary>
                         <Button><SignoutIcon24 /></Button>
                         <Button><CalendarIcon24 /></Button>
                         <Button><ImageIcon /></Button>
                     </Button.Group>
                     <Button.Group icon secondary>
                         <Button disabled><SignoutIcon24 /></Button>
                         <Button active><CalendarIcon24 /></Button>
                     </Button.Group>
                     <Button.Group icon basic>
                         <Button><SignoutIcon24 /></Button>
                         <Button><CalendarIcon24 /></Button>
                         <Button><ImageIcon /></Button>
                     </Button.Group>
                     <Button.Group icon basic>
                         <Button disabled><SignoutIcon24 /></Button>
                         <Button disabled><CalendarIcon24 /></Button>
                         <Button><ImageIcon /></Button>
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
    .add("custom css class", () =>
        <Button className="bg-red">Button</Button>
    );

stories("/shorthand props/icons")
    .add("default", () =>
        <Button icon={<CalendarIcon24 />}>Button</Button>
    )
    .add("right", () =>
        <Button icon={<CalendarIcon24 />} iconPosition="right">Button</Button>
    )
    .add("css class", () =>
        <Button icon={<CalendarIcon24 className="fill-red" />} iconPosition="right">Button</Button>
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



