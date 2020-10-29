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

describe("createOrAugmentElement", () => {
    test("can create an element from a type", () => {
        const element = createOrAugmentElement(TextInput);

        expect(isElement(element)).toBeTruthy();
    });

    test("can create an element from a type and add additional props", () => {
        const element = createOrAugmentElement(TextInput, {
            placeholder: "SpaceX made it!"
        });

        expect(element.props.placeholder).toBe("SpaceX made it!");
    });

    test("can add additional props to an existing element", () => {
        const element = createOrAugmentElement(<TextInput />, {
            placeholder: "SpaceX made it!"
        });

        expect(element.props.placeholder).toBe("SpaceX made it!");
    });
});
