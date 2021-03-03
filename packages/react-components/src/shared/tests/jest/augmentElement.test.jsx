import { TextInput } from "@react-components/input";
import { augmentElement, createOrAugmentElement } from "@react-components/shared";
import { isElement } from "react-is";

describe("augmentElement", () => {
    test("augment existing element props", () => {
        const element = augmentElement(<TextInput />, {
            placeholder: "SpaceX made it!"
        });

        expect(element.props.placeholder).toBe("SpaceX made it!");
    });
});
