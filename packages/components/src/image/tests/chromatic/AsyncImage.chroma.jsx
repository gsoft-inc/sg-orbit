import { AsyncImage } from "@components/image";
import { Img } from "@components/html";
import { Launch } from "./assets";

export default {
    title: "Chromatic/AsyncImage",
    component: AsyncImage
};

export const Completing = () => <AsyncImage src="https://via.placeholder.com/128" width={11} height={11}>
    <Img src={Launch} alt="Launch" width={11} height={11} />
</AsyncImage>;

export const Failing = () => <AsyncImage src="https://via.placeholder.com" width={11} height={11}>
    <Img src={Launch} alt="Launch" width={11} height={11} />
</AsyncImage>;

Completing.storyName = "completing";
Failing.storyName = "failing";
