import { Apollo11Poster, BlueOrigin, Nasa, SpaceX } from "./assets";
import { Button } from "@react-components/button";
import { Card } from "@react-components/card";
import { Content } from "@react-components/placeholders";
import { Div } from "@react-components/html";
import { Heading, Paragraph } from "@react-components/typography";
import { Illustration } from "@react-components/illustration";
import { Image } from "@react-components/image";
import { Modal } from "@react-components/modal";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Modal")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Modal>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Modal>
    )
    .add("image", () =>
        <Modal>
            <Image src={Apollo11Poster} alt="Apollo 11" />
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Modal>
    )
    .add("illustration", () =>
        <Modal>
            <Illustration color="sunray-1">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Modal>
    )
    .add("choice", () =>
        <Modal>
            <Heading>Space agencies</Heading>
            <Content>
                <Card>
                    <Image src={SpaceX} alt="SpaceX" />
                    <Heading>Space X</Heading>
                    <Content> It's about believing in the future and thinking that the future will be better than the past.</Content>
                    <Button variant="secondary">Choose</Button>
                </Card>
                <Card>
                    <Image src={BlueOrigin} alt="Blue Origin" />
                    <Heading>Blue Origin</Heading>
                    <Content>We're committed to building a road to space so our children can build the future.</Content>
                    <Button variant="secondary">Choose</Button>
                </Card>
            </Content>
        </Modal>
    )
    .add("choice with text", () =>
        <Modal>
            <Heading>Space agencies</Heading>
            <Content>
                <Paragraph>Which of the following space agency do you prefer?</Paragraph>
                <Card>
                    <Image src={SpaceX} alt="SpaceX" />
                    <Heading>Space X</Heading>
                    <Content>It's about believing in the future and thinking that the future will be better than the past.</Content>
                    <Button>Choose</Button>
                </Card>
                <Card>
                    <Image src={BlueOrigin} alt="Blue Origin" />
                    <Heading>Blue Origin</Heading>
                    <Content>We're committed to building a road to space so our children can build the future.</Content>
                    <Button>Choose</Button>
                </Card>
            </Content>
        </Modal>
    )
    .add("choice with content between cards", () =>
        <Modal>
            <Heading>Space agencies</Heading>
            <Content>
                <Paragraph>Which of the following space agency do you prefer?</Paragraph>
                <Card>
                    <Image src={SpaceX} alt="SpaceX" />
                    <Heading>Space X</Heading>
                    <Content>It's about believing in the future and thinking that the future will be better than the past.</Content>
                    <Button>Choose</Button>
                </Card>
                <Paragraph>Thank you for participating.</Paragraph>
                <Card>
                    <Image src={BlueOrigin} alt="Blue Origin" />
                    <Heading>Blue Origin</Heading>
                    <Content>We're committed to building a road to space so our children can build the future.</Content>
                    <Button>Choose</Button>
                </Card>
            </Content>
        </Modal>
    )
    .add("fullscreen", () =>
        <Modal fullscreen>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Modal>
    )
    .add("fullscreen with illustration (should not render as fullscreen)", () =>
        <Modal fullscreen>
            <Illustration color="sunray-1">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Modal>
    )
    .add("fullscreen with choice (should not render as fullscreen)", () =>
        <Modal fullscreen>
            <Heading>Space agencies</Heading>
            <Content>
                <Card>
                    <Image src={SpaceX} alt="SpaceX" />
                    <Heading>Space X</Heading>
                    <Content> It's about believing in the future and thinking that the future will be better than the past.</Content>
                    <Button>Choose</Button>
                </Card>
                <Card>
                    <Image src={BlueOrigin} alt="Blue Origin" />
                    <Heading>Blue Origin</Heading>
                    <Content>We're committed to building a road to space so our children can build the future.</Content>
                    <Button>Choose</Button>
                </Card>
            </Content>
        </Modal>
    )
    .add("styled system", () =>
        <Modal border="sunray-10">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Modal>
    )
    .add("className", () =>
        <Modal className="border-red">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Modal>
    )
    .add("zoom in", () =>
        <Div className="zoom-in">
            <Modal>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                    <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                    <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
                </Content>
            </Modal>
        </Div>
    )
    .add("zoom out", () =>
        <Div className="zoom-out">
            <Modal>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                    <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                    <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
                </Content>
            </Modal>
        </Div>
    )
    .add("styled system", () =>
        <Modal style={{ border: "1px solid red" }}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Modal>
    );
