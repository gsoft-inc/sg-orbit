import { Button } from "@orbit-ui/react-button/src";
import { Buttons } from "./buttons";
import { CalendarIcon24, ImageIcon, SignoutIcon24 } from "@orbit-ui/icons";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
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

stories("/theme")
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
    )
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
                     >Button</Button>
                     <Button className={styles.button} naked active>Button</Button>
                     <Button disabled className={styles.button} naked>Button</Button>
                 </div>
             </div>
    )
    .add("groups",
         () =>
             <div className="flex flex-row">
                 <div className="flex flex-column items-start">
                     <Button.Group>
                         <Button>One</Button>
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
                 </div>
                 <div className="flex flex-column items-start">
                     <Button.Group basic widths="3">
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Cheese Pizza</Button>
                     </Button.Group>
                     <Button.Group toggle basic>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Cheese Pizza</Button>
                     </Button.Group>
                     <Button.Group basic widths="16">
                         <Button>1</Button>
                         <Button>2</Button>
                         <Button>3</Button>
                         <Button>4</Button>
                         <Button>5</Button>
                         <Button>6</Button>
                         <Button>7</Button>
                         <Button>8</Button>
                         <Button>9</Button>
                         <Button>10</Button>
                         <Button>11</Button>
                         <Button>12</Button>
                         <Button>13</Button>
                         <Button>14</Button>
                         <Button>15</Button>
                         <Button>16</Button>
                     </Button.Group>
                     <Button.Group basic vertical>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Cheese Pizza</Button>
                     </Button.Group>
                 </div>
             </div>
    );

