import { Button } from "@orbit-ui/react-button/src";
import { ThemeButtons} from "./buttons";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

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
                 <ThemeButtons />
             </div>
    )
    .add("primary",
         () =>
             <div className="flex flex-row">
                 <ThemeButtons primary />
             </div>
    )
    .add("secondary",
         () =>
             <div className="flex flex-row">
                 <ThemeButtons secondary />
             </div>
    )
    .add("positive",
         () =>
             <div className="flex flex-row">
                 <ThemeButtons positive />
             </div>
    )
    .add("negative",
         () =>
             <div className="flex flex-row">
                 <ThemeButtons negative />
             </div>
    )
    .add("naked",
         () =>
             <div className="flex flex-row">
                 <ThemeButtons naked />
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
                     <Button.Group basic>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group primary>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group secondary>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
                     </Button.Group>
                     <Button.Group naked>
                         <Button>One</Button>
                         <Button>Two</Button>
                         <Button>Three</Button>
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
                 </div>
             </div>
    );

