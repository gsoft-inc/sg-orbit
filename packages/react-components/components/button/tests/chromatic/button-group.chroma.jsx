import { Button } from "@orbit-ui/react-button/src";
import { CalendarIcon, ImageIcon, SignoutIcon } from "@orbit-ui/react-icons/src";
import { Label } from "@orbit-ui/react-label/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Button Group"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
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
    );


