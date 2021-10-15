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
        <AsyncImage src="https://via.placeholder.com/128" width="11" height="11">
            <Img src={Launch} alt="Launch" width="11" height="11" />
        </AsyncImage>
    )
    .add("failing", () =>
        <AsyncImage src="https://via.placeholder.com" width="11" height="11">
            <Img src={Launch} alt="Launch" width="11" height="11" />
        </AsyncImage>
    );


