import { Button } from "@orbit-ui/react-button/src";
import { Buttons } from "./buttons";
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
                         <Button disabled>One</Button>
                         <Button active>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group basic>
                         <Button disabled>One</Button>
                         <Button active>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                 </div>
             </div>
    );

