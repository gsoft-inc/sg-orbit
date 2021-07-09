import { Button, ButtonGroup } from "@react-components/button";
import { Content, Header } from "@react-components/placeholders";
import { Heading } from "@react-components/heading";
import { Image } from "@react-components/image";
import { Item } from "@react-components/collection";
import { ListItem, UnorderedList } from "@react-components/list";
import { Nasa } from "./assets";
import { Paragraph } from "@react-components/paragraph";
import { Tabs } from "@react-components/tabs";
import { TextLink } from "@react-components/link";
import { cloneElement } from "react";

function Card({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Card element={element}>
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
            </Card>
        )
        .add("image", () =>
            <Card element={element}>
                <Image src={Nasa} alt="Nasa" width="100px" />
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
            </Card>
        )
        .add("text header", () =>
            <Card element={element}>
                <Heading>Nasa</Heading>
                <Header>2021/01/01</Header>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
            </Card>
        )
        .add("link header", () =>
            <Card element={element}>
                <Heading>Nasa</Heading>
                <Header>
                    <TextLink href="https://www.nasa.gov">Website</TextLink>
                </Header>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
            </Card>
        )
        .add("rich content", () =>
            <Card element={element}>
                <Heading>Nasa</Heading>
                <Content>
                    <Paragraph>
                        <TextLink href="https://www.nasa.gov" external>The National Aeronautics and Space Administration</TextLink> is an <strong>independent agency of the U.S</strong>. federal government responsible for the civilian space program, as well as aeronautics and space research.
                    </Paragraph>
                    <UnorderedList>
                        <ListItem>Space Shuttle program</ListItem>
                        <ListItem>International Space Station</ListItem>
                        <ListItem>Constellation program</ListItem>
                        <ListItem>Commercial Crew program</ListItem>
                    </UnorderedList>
                </Content>
            </Card>
        )
        .add("button", () =>
            <Card element={element}>
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
                <Button>Visit</Button>
            </Card>
        )
        .add("button group", () =>
            <Card element={element}>
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
                <ButtonGroup>
                    <Button>Next</Button>
                    <Button>Visit</Button>
                </ButtonGroup>
            </Card>
        )
        .add("all sections", () =>
            <Card element={element}>
                <Heading>Nasa</Heading>
                <Header>
                    <TextLink href="https://www.nasa.gov">
                        Website
                    </TextLink>
                </Header>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
                <ButtonGroup>
                    <Button>Next</Button>
                    <Button>Visit</Button>
                </ButtonGroup>
            </Card>
        )
        .add("tabs", () =>
            <Card element={element}>
                <Heading>Nasa</Heading>
                <Content>
                    <Tabs aria-label="NASA">
                        <Item key="vision">
                            <Header>Vision</Header>
                            <Content>We reach for new heights and reveal the unknown for the benefit of humankind</Content>
                        </Item>
                        <Item key="mission">
                            <Header>Mission</Header>
                            <Content>Drive advances in science, technology, aeronautics, and space exploration to enhance knowledge, education, innovation, economic vitality and stewardship of Earth</Content>
                        </Item>
                    </Tabs>
                </Content>
            </Card>
        )
        .add("tabs & button", () =>
            <Card element={element}>
                <Heading>Nasa</Heading>
                <Content>
                    <Tabs aria-label="NASA">
                        <Item key="vision">
                            <Header>Vision</Header>
                            <Content>We reach for new heights and reveal the unknown for the benefit of humankind</Content>
                        </Item>
                        <Item key="mission">
                            <Header>Mission</Header>
                            <Content>Drive advances in science, technology, aeronautics, and space exploration to enhance knowledge, education, innovation, economic vitality and stewardship of Earth</Content>
                        </Item>
                    </Tabs>
                    <Button>Next</Button>
                </Content>
            </Card>
        )
        .add("heading overflow", () =>
            <Card element={element}>
                <Heading>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Heading>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
            </Card>
        )
        .add("header overflow", () =>
            <Card element={element}>
                <Heading>Nasa</Heading>
                <Header>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Header>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
            </Card>
        )
        .add("button overflow", () =>
            <Card element={element}>
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
                <ButtonGroup>
                    <Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
                    <Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
                    <Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
                </ButtonGroup>
            </Card>
        )
        .add("everything overflow", () =>
            <Card element={element}>
                <Heading>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Heading>
                <Header>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Header>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
                <ButtonGroup>
                    <Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
                    <Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
                    <Button>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
                </ButtonGroup>
            </Card>
        )
        .add("fluid", () =>
            <Card
                fluid
                element={element}
            >
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
            </Card>
        );
}
