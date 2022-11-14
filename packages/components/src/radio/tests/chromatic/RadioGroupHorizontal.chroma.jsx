import { Radio, RadioGroup } from "@components/radio";
import { Counter } from "@components/counter";
import { Text } from "@components/typography";

export default {
    title: "Chromatic/RadioGroup/horizontal",
    component: RadioGroup,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
};

export const Default = () => (
    <RadioGroup orientation="horizontal">
        <Radio value="1">1</Radio>
        <Radio value="2">
            <Text>2</Text>
            <Counter>60</Counter>
        </Radio>
        <Radio value="3">3</Radio>
    </RadioGroup>
);

Default.storyName = "default";

export const Reverse = () => (
    <RadioGroup reverse orientation="horizontal">
        <Radio value="1">1</Radio>
        <Radio value="2">A very long option to read while you wait for the countdown to mars.</Radio>
        <Radio value="3">3</Radio>
    </RadioGroup>
);

Reverse.storyName = "reverse";
