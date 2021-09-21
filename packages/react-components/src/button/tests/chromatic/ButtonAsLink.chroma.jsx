import { ButtonAsLink } from "@react-components/button";
import { Inline } from "@react-components/layout";
import { createButtonTestSuite } from "./createButtonTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ButtonAsLink")
        .segment(segment)
        .build();
}

createButtonTestSuite(<ButtonAsLink variant="primary" />, stories("/primary"));

createButtonTestSuite(<ButtonAsLink variant="secondary" />, stories("/secondary"));

createButtonTestSuite(<ButtonAsLink variant="tertiary" />, stories("/tertiary"));

createButtonTestSuite(<ButtonAsLink variant="danger" />, stories("/danger"));

stories()
    .add("styling", () =>
        <Inline>
            <ButtonAsLink border="sunray-10" variant="secondary">Button</ButtonAsLink>
            <ButtonAsLink className="bg-red" variant="secondary">Button</ButtonAsLink>
            <ButtonAsLink style={{ backgroundColor: "red" }} variant="secondary">Button</ButtonAsLink>
        </Inline>
    );
