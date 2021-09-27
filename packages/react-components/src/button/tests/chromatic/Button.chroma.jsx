import { Button } from "@react-components/button";
import { Div, TD, TR } from "@react-components/html";
import { Inline } from "@react-components/layout";
import { cloneElement } from "react";
import { createButtonTestSuite } from "./createButtonTestSuite";
import { storiesOfBuilder } from "@stories/utils";
import { useBreakpoint, useStyledSystem2 } from "@orbit-ui/styles";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Button")
        .segment(segment)
        .build();
}

function SunrayBackground({ button, ...rest }) {
    console.log(button, rest);

    return (
        <Div color="sunray-10" backgroundColor="sunray-1">
            {cloneElement(button, rest)}
        </Div>
    );
}

createButtonTestSuite(<Button variant="primary" />, stories("/primary"));

createButtonTestSuite(<Button variant="secondary" />, stories("/secondary"));

createButtonTestSuite(<SunrayBackground button={<Button variant="secondary" inherit />} />, stories("/secondary (inherit)"));

createButtonTestSuite(<Button variant="tertiary" />, stories("/tertiary"));

createButtonTestSuite(<SunrayBackground button={<Button variant="tertiary" inherit />} />, stories("/tertiary (inherit)"));

createButtonTestSuite(<Button variant="danger" />, stories("/danger"));

function Test(props) {
    const newProps = useStyledSystem2(props);

    return <div {...newProps}></div>;
}

stories()
    .add("styling", () =>
        <Inline>
            <Button border="sunray-10" variant="secondary">Button</Button>
            <Button className="bg-red" variant="secondary">Button</Button>
            <Button style={{ backgroundColor: "red" }} variant="secondary">Button</Button>
        </Inline>
    )
    .add("test", () => {
        console.log("*** test is refreshed");

        const breakpoint = useBreakpoint();

        return (
            <>
                <Test backgroundColor="red">Toto</Test>
                <Test backgroundColor="sunray-10">Tata</Test>
                <Test backgroundColor={{ base: "black", s: "blue", m: "sunray-10", l: "primary-10" }}>Tata</Test>
                <Test backgroundColor="green" backgroundColorHover="sunray-10">Tata</Test>
                <Test backgroundColor="green" backgroundColorHover={{ s: "blue", m: "sunray-10", l: "primary-10" }}>Tata</Test>
                <Test backgroundColorHover="red">
                    <Test backgroundColor="green" backgroundColorHover="black">Tata</Test>
                </Test>
                <Test fontWeight="400">Toto</Test>
                <Test fontWeight="500">Toto</Test>
                <Test fontWeight="600">Toto</Test>
                <div>{breakpoint}</div>
            </>
        );
    })
    .add("test2", () => {
        return (
            <table>
                <tbody>
                    {Array.from(Array(250).keys()).map(x => {
                        return (
                            <TR key={x}>
                                <TD backgroundColor="sunray-5">{`${x}-1`}</TD>
                                <TD backgroundColor="sunray-6">{`${x}-2`}</TD>
                                <TD backgroundColor="sunray-7">{`${x}-3`}</TD>
                            </TR>
                        );
                    })}
                </tbody>
            </table>
        );
    });
