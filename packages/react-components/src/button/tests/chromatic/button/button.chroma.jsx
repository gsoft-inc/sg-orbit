import { Button } from "@react-components/button";
import { Label } from "@react-components/label";
import { Tag } from "@react-components/tag";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createSharedTestSuite } from "./shared-test-suite";
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

createSharedTestSuite(<Button />, stories("/standard"));

createSharedTestSuite(<Button primary />, stories("/primary"));

createSharedTestSuite(<Button secondary />, stories("/secondary"));

createSharedTestSuite(<Button positive />, stories("/positive"));

createSharedTestSuite(<Button negative />, stories("/negative"));

createSharedTestSuite(<Button link />, stories("/link"));

createSharedTestSuite(<Button naked />, stories("/naked"))
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
    )
    .add("content prop", () =>
        <Button content="Button"></Button>
    );

stories("/label")
    .add("element ref", () =>
        <Button label={<Label ref={setRedBackground}>6</Label>}>Button</Button>
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
        <Button tag={<Tag ref={setRedBackground} />}>Button</Button>
    )
    .add("object", () =>
        <div className="flex">
            <Button tag={{ className: "bg-red" }} className="mr5">Button</Button>
            <Button tag={{ ref: setRedBackground }}>Button</Button>
        </div>
    );



