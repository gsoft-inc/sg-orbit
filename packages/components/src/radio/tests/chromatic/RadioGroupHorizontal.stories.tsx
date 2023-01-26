import { Radio, RadioGroup } from "@components/radio";
import { Counter } from "@components/counter";
import { Text } from "@components/typography";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/RadioGroup/horizontal",
    component: RadioGroup,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
} as ComponentMeta<typeof RadioGroup>;

type RadioGroupStory = ComponentStoryObj<typeof RadioGroup>;

export const Default: RadioGroupStory = {
    storyName: "default",
    render: () => (
        <RadioGroup orientation="horizontal">
            <Radio value="1">1</Radio>
            <Radio value="2">
                <Text>2</Text>
                <Counter>60</Counter>
            </Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
};

export const Reverse: RadioGroupStory = {
    storyName: "reverse",
    render: () => (
        <RadioGroup reverse orientation="horizontal">
            <Radio value="1">1</Radio>
            <Radio value="2">A very long option to read while you wait for the countdown to mars.</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
};
