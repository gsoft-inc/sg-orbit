import { AsyncImage } from "@react-components/image";
import { Img } from "@react-components/html";
import { Launch } from "./assets";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/AsyncImage")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(500)
            .build())
        .build();
}

stories()
    .add("completing", () =>
        <AsyncImage src="https://via.placeholder.com/150" width="150" height="150">
            <Img src={Launch} alt="Launch" width="150" height="150" />
        </AsyncImage>
    )
    .add("failing", () =>
        <AsyncImage src="https://via.placeholder.com" width="150" height="150">
            <Img src={Launch} alt="Launch" width="150" height="150" />
        </AsyncImage>
    );


