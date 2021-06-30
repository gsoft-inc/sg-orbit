import { Button } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { Dialog, DialogTrigger } from "@react-components/dialog";
import { Heading } from "@react-components/heading";
import { Paragraph } from "@react-components/paragraph";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/DialogTrigger")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

stories()
    .add("default", () =>
        <DialogTrigger>
            <Button>Open</Button>
            <Dialog>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye." </Paragraph>
                    <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                    <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
                </Content>
            </Dialog>
        </DialogTrigger>
    )
    .add("open", () =>
        <DialogTrigger defaultOpen>
            <Button>Open</Button>
            <Dialog>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye." </Paragraph>
                    <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                    <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
                </Content>
            </Dialog>
        </DialogTrigger>
    )
    .add("dismissable", () =>
        <DialogTrigger dismissable defaultOpen>
            <Button>Open</Button>
            <Dialog>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye." </Paragraph>
                    <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                    <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
                </Content>
            </Dialog>
        </DialogTrigger>
    );
