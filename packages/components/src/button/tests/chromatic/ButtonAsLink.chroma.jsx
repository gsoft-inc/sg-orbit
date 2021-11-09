import { ButtonAsLink } from "@components/button";
import { Inline } from "@components/layout";
import { createButtonTestSuite } from "./createButtonTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ButtonAsLink")
        .segment(segment)
        .build();
}

createButtonTestSuite(<ButtonAsLink color="primary" />, stories("/primary"));

createButtonTestSuite(<ButtonAsLink variant="outline" color="secondary" />, stories("/secondary"));

createButtonTestSuite(<ButtonAsLink color="danger" />, stories("/danger"));

stories()
    .add("styling", () =>
        <Inline>
            <ButtonAsLink border="warning-7" variant="outline" color="secondary">Button</ButtonAsLink>
            <ButtonAsLink className="bg-red" variant="outline" color="secondary">Button</ButtonAsLink>
            <ButtonAsLink style={{ backgroundColor: "red" }} variant="outline" color="secondary">Button</ButtonAsLink>
        </Inline>
    );
