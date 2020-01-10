import { Button } from "@orbit-ui/react-buttons/src";
import { CalendarIcon24 } from "@orbit-ui/icons";
import { Label } from "semantic-ui-react";
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
                 <div className="flex flex-column items-start">
                     <Button>Cutoff</Button>
                     <Button active>Cutoff</Button>
                     <Button disabled>Cutoff</Button>
                     <Button primary>Delay</Button>
                     <Button primary active>Delay</Button>
                     <Button primary disabled>Delay</Button>
                     <Button basic>Deflect</Button>
                     <Button basic active>Deflect</Button>
                     <Button basic disabled>Deflect</Button>
                     <Button basic primary>Stow</Button>
                     <Button basic primary active>Stow</Button>
                     <Button basic primary disabled>Stow</Button>
                     <Button secondary>Apollo</Button>
                     <Button secondary active>Appollo</Button>
                     <Button secondary disabled>Appollo</Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button><CalendarIcon24 className="w6 h6 mr1" />Astro Orbiter</Button>
                     <Button active><CalendarIcon24 className="w6 h6 mr1" />Astro Orbiter</Button>
                     <Button disabled><CalendarIcon24 className="w6 h6 mr1" />Astro Orbiter</Button>
                     <Button basic><CalendarIcon24 className="w6 h6 mr1" />Primeval Whirl</Button>
                     <Button basic active><CalendarIcon24 className="w6 h6 mr1" />Primeval Whirl</Button>
                     <Button basic disabled><CalendarIcon24 className="w6 h6 mr1" />Primeval Whirl</Button>
                     <Button primary><CalendarIcon24 className="w6 h6 mr1" />Space Mountain</Button>
                     <Button primary active><CalendarIcon24 className="w6 h6 mr1" />Space Mountain</Button>
                     <Button primary disabled><CalendarIcon24 className="w6 h6 mr1" />Space Mountain</Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button className="paused"loading>Loading</Button>
                     <Button className="paused"loading disabled>Loading</Button>
                     <Button className="paused"primary loading>Loading</Button>
                     <Button className="paused"primary loading disabled>Loading</Button>
                     <Button className="paused"basic loading>Loading</Button>
                     <Button className="paused"basic loading disabled>Loading</Button>
                     <Button className="paused"basic primary loading>Loading</Button>
                     <Button className="paused"basic primary loading disabled>Loading</Button>
                     <Button className="paused"positive>Mission Space</Button>
                     <Button className="paused"positive active>Mission Space</Button>
                     <Button className="paused"positive disabled>Mission Space</Button>
                     <Button className="paused"negative>Spaceship Earth</Button>
                     <Button className="paused"negative active>Spaceship Earth</Button>
                     <Button className="paused"negative disabled>Spaceship Earth</Button>
                     <Button className="paused"fluid>Fluid</Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button ghost>Cutoff</Button>
                     <Button ghost primary>Cutoff</Button>
                     <Button ghost secondary>Cutoff</Button>
                     <Button ghost active>Cutoff</Button>
                     <Button ghost active primary>Cutoff</Button>
                     <Button ghost active secondary>Cutoff</Button>
                     <Button ghost disabled>Cutoff</Button>
                     <Button ghost disabled primary>Cutoff</Button>
                     <Button ghost disabled secondary>Cutoff</Button>
                     <Button ghost compact>Cutoff</Button>
                     <Button ghost fluid>Cutoff</Button>
                     <Button ghost circular>Cutoff</Button>
                     <Button ghost circular primary>Cutoff</Button>
                     <Button ghost circular secondary>Cutoff</Button>
                     <Button ghost circular active>Cutoff</Button>
                     <Button ghost circular disabled>Cutoff</Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button ghost icon><CalendarIcon24 className="w6 h6 mr1" />Cutoff</Button>
                     <Button ghost icon active><CalendarIcon24 className="w6 h6 mr1" />Cutoff</Button>
                     <Button ghost icon disabled><CalendarIcon24 className="w6 h6 mr1" />Cutoff</Button>
                     <Button ghost icon><CalendarIcon24 className="w6 h6" /></Button>
                     <Button ghost icon active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button ghost icon disabled><CalendarIcon24 className="w6 h6" /></Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button naked>Cutoff</Button>
                     <Button naked active>Cutoff</Button>
                     <Button naked disabled>Cutoff</Button>
                     <Button naked compact>Cutoff</Button>
                     <Button naked fluid>Cutoff</Button>
                     <Button naked circular>Cu</Button>
                     <Button naked circular active>Cu</Button>
                     <Button naked circular disabled>Cu</Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button naked icon><CalendarIcon24 className="w6 h6 mr1" />Cutoff</Button>
                     <Button naked icon active><CalendarIcon24 className="w6 h6 mr1" />Cutoff</Button>
                     <Button naked icon disabled><CalendarIcon24 className="w6 h6 mr1" />Cutoff</Button>
                     <Button naked icon><CalendarIcon24 className="w6 h6" /></Button>
                     <Button naked icon active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button naked icon disabled><CalendarIcon24 className="w6 h6" /></Button>
                 </div>
             </div>
    )
    .add("tall",
         () =>
             <div className="flex flex-row">
                 <div className="flex flex-column items-start">
                     <Button className="tall">Cutoff</Button>
                     <Button className="tall" active>Cutoff</Button>
                     <Button className="tall" disabled>Cutoff</Button>
                     <Button className="tall" primary>Delay</Button>
                     <Button className="tall" primary active>Delay</Button>
                     <Button className="tall" primary disabled>Delay</Button>
                     <Button className="tall" basic>Deflect</Button>
                     <Button className="tall" basic active>Deflect</Button>
                     <Button className="tall" basic disabled>Deflect</Button>
                     <Button className="tall" basic primary>Stow</Button>
                     <Button className="tall" basic primary active>Stow</Button>
                     <Button className="tall" basic primary disabled>Stow</Button>
                     <Button className="tall" secondary>Apollo</Button>
                     <Button className="tall" secondary active>Appollo</Button>
                     <Button className="tall" secondary disabled>Appollo</Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button className="tall"><CalendarIcon24 className="w6 h6 mr1" />Astro Orbiter</Button>
                     <Button className="tall" active><CalendarIcon24 className="w6 h6 mr1" />Astro Orbiter</Button>
                     <Button className="tall" disabled><CalendarIcon24 className="w6 h6 mr1" />Astro Orbiter</Button>
                     <Button className="tall" basic><CalendarIcon24 className="w6 h6 mr1" />Primeval Whirl</Button>
                     <Button className="tall" basic active><CalendarIcon24 className="w6 h6 mr1" />Primeval Whirl</Button>
                     <Button className="tall" basic disabled><CalendarIcon24 className="w6 h6 mr1" />Primeval Whirl</Button>
                     <Button className="tall" primary><CalendarIcon24 className="w6 h6 mr1" />Space Mountain</Button>
                     <Button className="tall" primary active><CalendarIcon24 className="w6 h6 mr1" />Space Mountain</Button>
                     <Button className="tall" primary disabled><CalendarIcon24 className="w6 h6 mr1" />Space Mountain</Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button className="tall paused" loading>Loading</Button>
                     <Button className="tall paused" loading disabled>Loading</Button>
                     <Button className="tall paused" primary loading>Loading</Button>
                     <Button className="tall paused" primary loading disabled>Loading</Button>
                     <Button className="tall paused" basic loading>Loading</Button>
                     <Button className="tall paused" basic loading disabled>Loading</Button>
                     <Button className="tall paused" basic primary loading>Loading</Button>
                     <Button className="tall paused" basic primary loading disabled>Loading</Button>
                     <Button className="tall paused" positive>Mission Space</Button>
                     <Button className="tall paused" positive active>Mission Space</Button>
                     <Button className="tall paused" positive disabled>Mission Space</Button>
                     <Button className="tall paused" negative>Spaceship Earth</Button>
                     <Button className="tall paused" negative active>Spaceship Earth</Button>
                     <Button className="tall paused" negative disabled>Spaceship Earth</Button>
                     <Button className="tall paused" fluid>Fluid</Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button ghost className="tall">Danger</Button>
                     <Button ghost className="tall" active>Danger</Button>
                     <Button ghost className="tall" disabled>Danger</Button>
                     <Button ghost className="tall" primary>Fuel</Button>
                     <Button ghost className="tall" primary active>Fuel</Button>
                     <Button ghost className="tall" primary disabled>Fuel</Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button naked className="tall">Danger</Button>
                     <Button naked className="tall" active>Danger</Button>
                     <Button naked className="tall" disabled>Danger</Button>
                 </div>
             </div>
    )
    .add("short",
         () =>
             <div className="flex flex-row">
                 <div className="flex flex-column items-start">
                     <Button className="short">Cutoff</Button>
                     <Button className="short" active>Cutoff</Button>
                     <Button className="short" disabled>Cutoff</Button>
                     <Button className="short" primary>Delay</Button>
                     <Button className="short" primary active>Delay</Button>
                     <Button className="short" primary disabled>Delay</Button>
                     <Button className="short" basic>Deflect</Button>
                     <Button className="short" basic active>Deflect</Button>
                     <Button className="short" basic disabled>Deflect</Button>
                     <Button className="short" basic primary>Stow</Button>
                     <Button className="short" basic primary active>Stow</Button>
                     <Button className="short" basic primary disabled>Stow</Button>
                     <Button className="short" secondary>Apollo</Button>
                     <Button className="short" secondary active>Appollo</Button>
                     <Button className="short" secondary disabled>Appollo</Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button className="short"><CalendarIcon24 className="w6 h6 mr1" />Astro Orbiter</Button>
                     <Button className="short" active><CalendarIcon24 className="w6 h6 mr1" />Astro Orbiter</Button>
                     <Button className="short" disabled><CalendarIcon24 className="w6 h6 mr1" />Astro Orbiter</Button>
                     <Button className="short" basic><CalendarIcon24 className="w6 h6 mr1" />Primeval Whirl</Button>
                     <Button className="short" basic active><CalendarIcon24 className="w6 h6 mr1" />Primeval Whirl</Button>
                     <Button className="short" basic disabled><CalendarIcon24 className="w6 h6 mr1" />Primeval Whirl</Button>
                     <Button className="short" primary><CalendarIcon24 className="w6 h6 mr1" />Space Mountain</Button>
                     <Button className="short" primary active><CalendarIcon24 className="w6 h6 mr1" />Space Mountain</Button>
                     <Button className="short" primary disabled><CalendarIcon24 className="w6 h6 mr1" />Space Mountain</Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button className="short paused" loading>Loading</Button>
                     <Button className="short paused" loading disabled>Loading</Button>
                     <Button className="short paused" primary loading>Loading</Button>
                     <Button className="short paused" primary loading disabled>Loading</Button>
                     <Button className="short paused" basic loading>Loading</Button>
                     <Button className="short paused" basic loading disabled>Loading</Button>
                     <Button className="short paused" basic primary loading>Loading</Button>
                     <Button className="short paused" basic primary loading disabled>Loading</Button>
                     <Button className="short paused" positive>Mission Space</Button>
                     <Button className="short paused" positive active>Mission Space</Button>
                     <Button className="short paused" positive disabled>Mission Space</Button>
                     <Button className="short paused" negative>Spaceship Earth</Button>
                     <Button className="short paused" negative active>Spaceship Earth</Button>
                     <Button className="short paused" negative disabled>Spaceship Earth</Button>
                     <Button className="short paused" fluid>Fluid</Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button ghost className="short">Danger</Button>
                     <Button ghost className="short" active>Danger</Button>
                     <Button ghost className="short" disabled>Danger</Button>
                     <Button ghost className="short" primary>Fuel</Button>
                     <Button ghost className="short" primary active>Fuel</Button>
                     <Button ghost className="short" primary disabled>Fuel</Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button naked className="short">Danger</Button>
                     <Button naked className="short" active>Danger</Button>
                     <Button naked className="short" disabled>Danger</Button>
                 </div>
             </div>
    )
    .add("circular",
         () =>
             <div className="flex flex-row">
                 <div className="flex flex-column items-start">
                     <Button icon circular size="tiny"><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular size="tiny" active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular size="tiny" disabled><CalendarIcon24 className="w6 h6" /></Button>
                     <Button primary icon circular size="tiny"><CalendarIcon24 className="w6 h6" /></Button>
                     <Button primary icon circular size="tiny" active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button primary icon circular size="tiny" disabled><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular size="small"><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular size="small" active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular size="small" disabled><CalendarIcon24 className="w6 h6" /></Button>
                     <Button primary icon circular size="small"><CalendarIcon24 className="w6 h6" /></Button>
                     <Button primary icon circular size="small" active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button primary icon circular size="small" disabled><CalendarIcon24 className="w6 h6" /></Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button icon circular><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular disabled><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular primary><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular primary active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular primary disabled><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular size="large"><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular size="large" active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular size="large" disabled><CalendarIcon24 className="w6 h6" /></Button>
                     <Button primary icon circular size="large"><CalendarIcon24 className="w6 h6" /></Button>
                     <Button primary icon circular size="large" active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button primary icon circular size="large" disabled><CalendarIcon24 className="w6 h6" /></Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button basic icon circular size="tiny"><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic icon circular size="tiny" active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic icon circular size="tiny" disabled><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic primary icon circular size="tiny"><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic primary icon circular size="tiny" active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic primary icon circular size="tiny" disabled><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic icon circular size="small"><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic icon circular size="small" active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic icon circular size="small" disabled><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic primary icon circular size="small"><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic primary icon circular size="small" active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic primary icon circular size="small" disabled><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular basic primary><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular basic primary active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button icon circular basic primary disabled><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic icon circular size="large"><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic icon circular size="large" active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic icon circular size="large" disabled><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic primary icon circular size="large"><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic primary icon circular size="large" active><CalendarIcon24 className="w6 h6" /></Button>
                     <Button basic primary icon circular size="large" disabled><CalendarIcon24 className="w6 h6" /></Button>
                 </div>
             </div>
    )
    .add("groups",
         () =>
             <div className="flex flex-row">
                 <div className="flex flex-column items-start">
                     <Button.Group basic toggle>
                         <Button type="button"><Label circular size="mini" empty color="red" />One</Button>
                         <Button icon type="button"><CalendarIcon24 className="w6 h6 mr1" />Two</Button>
                         <Button icon type="button"><CalendarIcon24 className="w6 h6 mr1" />Three</Button>
                     </Button.Group>
                     <Button.Group basic toggle>
                         <Button active type="button"><Label circular size="mini" empty color="red" />One</Button>
                         <Button active icon type="button"><CalendarIcon24 className="w6 h6 mr1" />Two</Button>
                         <Button active icon type="button"><CalendarIcon24 className="w6 h6 mr1" />Three</Button>
                     </Button.Group>
                     <Button.Group basic toggle>
                         <Button disabled type="button"><Label circular size="mini" empty color="red" />One</Button>
                         <Button disabled icon type="button"><CalendarIcon24 className="w6 h6 mr1" />Two</Button>
                         <Button disabled icon type="button"><CalendarIcon24 className="w6 h6 mr1" />Three</Button>
                     </Button.Group>
                     <Button.Group basic toggle>
                         <Button active disabled type="button"><Label circular size="mini" empty color="red" />One</Button>
                         <Button active disabled icon type="button"><CalendarIcon24 className="w6 h6 mr1" />Two</Button>
                         <Button active disabled icon type="button" ><CalendarIcon24 className="w6 h6 mr1" />Three</Button>
                     </Button.Group>
                 </div>
             </div>
    );

