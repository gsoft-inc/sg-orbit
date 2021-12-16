import { Button, ToggleButton } from "@components/button";
import { Heading, Paragraph } from "@components/typography";
import { Modal, ModalTrigger } from "@components/modal";
import { Radio, RadioGroup } from "@components/radio";
import { subMonths, subWeeks } from "date-fns";

import { CheckboxGroup } from "@components/checkbox";
import { Content } from "@components/placeholders";
import { DateRangeInput } from "@components/date-input";
import { Item } from "@components/collection";
import { Select } from "@components/select";
import { TextInput } from "@components/text-input";
import { Toolbar } from "@components/toolbar";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ModalTrigger")
        .segment(segment)
        .build();
}

stories()
    .add("test", () =>
        <ModalTrigger>
            <Button variant="secondary">Open</Button>
            <Modal>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Select placeholder="Select a planet" aria-label="Planets">
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Select>
                    <Button>Button</Button>
                    <DateRangeInput
                        presets={[
                            { text: "Last week", startDate: subWeeks(new Date(), 1), endDate: new Date() },
                            { text: "Last month", startDate: subMonths(new Date(), 1), endDate: new Date() },
                            { text: "Last 3 months", startDate: subMonths(new Date(), 3), endDate: new Date() },
                            { text: "Last 6 months", startDate: subMonths(new Date(), 6), endDate: new Date() }
                        ]}
                        presetsVariant="compact"
                    />
                    <RadioGroup>
                        <Radio>Radio 1</Radio>
                        <Radio>Radio 2</Radio>
                        <Radio>Radio 3</Radio>
                    </RadioGroup>
                    <Toolbar>
                        <CheckboxGroup>
                            <ToggleButton value="1">1</ToggleButton>
                            <ToggleButton value="2">2</ToggleButton>
                            <ToggleButton value="3">3</ToggleButton>
                        </CheckboxGroup>
                        <TextInput />
                        <RadioGroup>
                            <Radio value="1">1</Radio>
                            <Radio value="2">2</Radio>
                            <Radio value="3">3</Radio>
                        </RadioGroup>
                    </Toolbar>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                    <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                    <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
                </Content>
            </Modal>
        </ModalTrigger>
    )
    .add("default", () =>
        <ModalTrigger>
            <Button variant="secondary">Open</Button>
            <Modal>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye." </Paragraph>
                    <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                    <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
                </Content>
            </Modal>
        </ModalTrigger>
    )
    .add("default open", () =>
        <ModalTrigger defaultOpen>
            <Button variant="secondary">Open</Button>
            <Modal>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye." </Paragraph>
                    <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                    <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
                </Content>
                <Button variant="secondary">Close</Button>
            </Modal>
        </ModalTrigger>
    )
    .add("not dismissable", () =>
        <ModalTrigger dismissable={false} defaultOpen>
            <Button variant="secondary">Open</Button>
            <Modal>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye." </Paragraph>
                    <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                    <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
                </Content>
            </Modal>
        </ModalTrigger>
    );
