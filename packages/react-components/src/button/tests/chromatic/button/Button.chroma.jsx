import styles from "./Button.chroma.module.css";

import { Button, createButton, createEmbeddedButton } from "@react-components/button";
import { SIZE } from "@react-components/shared";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createTestSuite } from "./createTestSuite";
import { isNil } from "lodash";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Button"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

createTestSuite(<Button />, stories("/standard"));

createTestSuite(<Button primary />, stories("/primary"));

createTestSuite(<Button secondary />, stories("/secondary"));

createTestSuite(<Button positive />, stories("/positive"));

createTestSuite(<Button negative />, stories("/negative"));

createTestSuite(<Button link />, stories("/link"))
    .add("secondary", () =>
        <div className="flex">
            <Button link secondary className="mr5">Button</Button>
            <Button link secondary active className="mr5">Button</Button>
            <Button link secondary focus className="mr5">Button</Button>
            <Button link secondary hover className="mr5">Button</Button>
            <Button link secondary focus hover>Button</Button>
        </div>
    );

createTestSuite(<Button naked />, stories("/naked"))
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

function setRedBackground(element) {
    if (!isNil(element)) {
        element.classList.add("bg-red");
    }
}

stories("/shorthands")
    .add("element", () =>
        <div className="flex">
            {createButton(<Button className="mr5">Button</Button>)}
            {createButton(<Button ref={setRedBackground}>Button</Button>)}
        </div>
    )
    .add("object", () =>
        <div className="flex">
            {createButton({ content: "Button", className: "mr5" })}
            {createButton({ content: "Button", ref: setRedBackground })}
        </div>
    )
    .add("string", () =>
        createButton("Button")
    )
    .add("embedded", () =>
        <div className="flex items-end">
            {createEmbeddedButton({ content: "Button", className: "mr5" }, { size: SIZE.micro })}
            {createEmbeddedButton({ content: "Button", className: "mr5" }, { size: SIZE.mini })}
            {createEmbeddedButton({ content: "Button", className: "mr5" }, { size: SIZE.tiny })}
            {createEmbeddedButton({ content: "Button", className: "mr5" }, { size: SIZE.small })}
            {createEmbeddedButton({ content: "Button", className: "mr5" })}
            {createEmbeddedButton({ content: "Button" }, { size: SIZE.large })}
        </div>
    );



