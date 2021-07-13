import { Button, ButtonGroup } from "@react-components/button";
import { Content, Footer } from "@react-components/placeholders";
import { Field, Label } from "@react-components/field";
import { Form } from "@react-components/form";
import { Heading } from "@react-components/typography";
import { Image } from "@react-components/image";
import { Launch } from "./assets";
import { Popover } from "@react-components/popover";
import { TextInput } from "@react-components/text-input";
import { TextLink } from "@react-components/link";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Popover")
        .segment(segment)
        .parameters(paramsBuilder()
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
        </Popover>
    )
    .add("text footer", () =>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            <Footer>Step 2/4</Footer>
        </Popover>
    )
    .add("link footer", () =>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            <Footer>
                <TextLink href="https://www.google.com" external>Step 2/4</TextLink>
            </Footer>
        </Popover>
    )
    .add("button", () =>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            <Button>Accept</Button>
        </Popover>
    )
    .add("button group", () =>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            <ButtonGroup>
                <Button color="secondary">Cancel</Button>
                <Button color="primary">Accept</Button>
            </ButtonGroup>
        </Popover>
    )
    .add("all slots", () =>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            <Footer>Step 2/4</Footer>
            <ButtonGroup>
                <Button color="secondary">Cancel</Button>
                <Button color="primary">Accept</Button>
            </ButtonGroup>
        </Popover>
    )
    .add("form", () =>
        <Popover>
            <Heading>Space News</Heading>
            <Content>
                <Form fluid>
                    <Field>
                        <Label>First Name</Label>
                        <TextInput name="first-name" />
                    </Field>
                    <Field>
                        <Label>Last Name</Label>
                        <TextInput name="last-name" />
                    </Field>
                </Form>
            </Content>
            <ButtonGroup>
                <Button color="secondary">Cancel</Button>
                <Button color="primary">Save</Button>
            </ButtonGroup>
        </Popover>
    )
    .add("image", () =>
        <Popover>
            <Heading>Space News</Heading>
            <Content>
                <Image src={Launch} alt="SpaceX launch" />
            </Content>
            <ButtonGroup>
                <Button color="secondary">Cancel</Button>
                <Button color="primary">Save</Button>
            </ButtonGroup>
        </Popover>
    )
    .add("className", () =>
        <Popover className="border-red">
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
        </Popover>
    )
    .add("style", () =>
        <Popover style={{ border: "1px solid red" }}>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
        </Popover>
    );
