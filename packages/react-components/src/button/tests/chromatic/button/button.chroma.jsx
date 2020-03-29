import { Button } from "@react-components/button";
import { Label } from "@react-components/label";
import { Tag } from "@react-components/tag";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createSharedStories } from "./shared-stories";
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

createSharedStories(<Button />, stories("/standard"));

createSharedStories(<Button primary />, stories("/primary"));

createSharedStories(<Button secondary />, stories("/secondary"));

createSharedStories(<Button positive />, stories("/positive"));

createSharedStories(<Button negative />, stories("/negative"));

createSharedStories(<Button link />, stories("/link"));

createSharedStories(<Button naked />, stories("/naked"))
    .add("coloured", () =>
        <div className="flex flex-column">
            <div className="flex mb5">
                <Button
                    className={`${styles.button} mr5`}
                    naked
                    style={{
                        backgroundColor: "#FCD5BC",
                        boxShadow: "0px 0px 0px 1px #FCD003 inset"
                    }}
                >Button</Button>
                <Button active className={`${styles.button} mr5`} naked>Button</Button>
                <Button disabled className={styles.button} naked>Button</Button>
            </div>
            <div className="flex">
                <Button
                    className={`${styles.button} mr5`}
                    circular
                    naked
                    style={{
                        backgroundColor: "#FCD5BC",
                        boxShadow: "0px 0px 0px 1px #FCD003 inset"
                    }}
                >Aa</Button>
                <Button active className={`${styles.button} mr5`} circular naked>Aa</Button>
                <Button disabled className={styles.button} circular naked>Aa</Button>
            </div>
        </div>
    );

function setRedBackground(element) {
    if (!isNil(element)) {
        element.classList.add("bg-red");
    }
}

stories()
    .add("fluid", () =>
        <div className="flex flex-column">
            <div className="mb5">
                <Button fluid>Button</Button>
            </div>
            <div className="w-10">
                <Button fluid>Button</Button>
            </div>
        </div>
    );

stories("/label")
    .add("element ref", () =>
        <div className="flex">
            <Button label={<Label ref={setRedBackground}>6</Label>}>Button</Button>
        </div>
    )
    .add("object", () =>
        <div className="flex">
            <Button label={{ content: "6" }} className="mr5">Button</Button>
            <Button label={{ content: "6", className: "bg-red" }} className="mr5">Button</Button>
            <Button label={{ content: "6", ref: setRedBackground }}>Button</Button>
        </div>
    );

stories("/tag")
    .add("element ref", () =>
        <div className="flex">
            <Button tag={<Tag ref={setRedBackground} />}>Button</Button>
        </div>

    )
    .add("object", () =>
        <div className="flex">
            <Button tag={{ className: "bg-red" }} className="mr5">Button</Button>
            <Button tag={{ ref: setRedBackground }}>Button</Button>
        </div>
    );



