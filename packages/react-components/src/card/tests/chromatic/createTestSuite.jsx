import { Button, ButtonGroup } from "@react-components/button";
import { Content, Header } from "@react-components/placeholders";
import { Heading, Paragraph } from "@react-components/typography";
import { Illustration } from "@react-components/illustration";
import { Image } from "@react-components/image";
import { Inline, Stack } from "@react-components/layout";
import { Item } from "@react-components/collection";
import { LI, UL } from "@react-components/html";
import { Nasa } from "./assets";
import { Tabs } from "@react-components/tabs";
import { TextLink } from "@react-components/link";
import { cloneElement } from "react";
import { paramsBuilder } from "@stories/utils";

function Card({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline>
                    <Card size="xs" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                    <Card size="sm" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                    <Card element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                </Inline>
                <Inline>
                    <Card size="lg" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                    <Card size="xl" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                </Inline>
                <Card fluid element={element}>
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
            </Stack>,
             {
                 ...paramsBuilder()
                     .validateBreakpoints()
                     .build()
             }
        )
        .add("illustration 1", () =>
            <Stack>
                <Inline>
                    <Card size="xs" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                    <Card size="sm" element={element}>
                        <Illustration color="sunray-1">
                            <Image src={Nasa} alt="Nasa" />
                        </Illustration>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                    <Card element={element}>
                        <Illustration color="sunray-1">
                            <Image src={Nasa} alt="Nasa" />
                        </Illustration>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                </Inline>
                <Inline>
                    <Card size="lg" element={element}>
                        <Illustration color="sunray-1">
                            <Image src={Nasa} alt="Nasa" />
                        </Illustration>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                    <Card size="xl" element={element}>
                        <Illustration color="sunray-1">
                            <Image src={Nasa} alt="Nasa" />
                        </Illustration>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                </Inline>
            </Stack>
        )
        .add("illustration 2", () =>
            <Stack>
                <Card fluid element={element}>
                    <Illustration color="sunray-1" width="200px">
                        <Image src={Nasa} alt="Nasa" />
                    </Illustration>
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
                <Card height="250px" element={element}>
                    <Illustration color="sunray-1">
                        <Image src={Nasa} alt="Nasa" />
                    </Illustration>
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
            </Stack>
        )
        .add("text header", () =>
            <Stack>
                <Inline>
                    <Card size="xs" element={element}>
                        <Heading>Nasa</Heading>
                        <Header>2021/01/01</Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                    <Card size="sm" element={element}>
                        <Heading>Nasa</Heading>
                        <Header>2021/01/01</Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                    <Card element={element}>
                        <Heading>Nasa</Heading>
                        <Header>2021/01/01</Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                </Inline>
                <Inline>
                    <Card size="lg" element={element}>
                        <Heading>Nasa</Heading>
                        <Header>2021/01/01</Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                    <Card size="xl" element={element}>
                        <Heading>Nasa</Heading>
                        <Header>2021/01/01</Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                </Inline>
                <Card fluid element={element}>
                    <Heading>Nasa</Heading>
                    <Header>2021/01/01</Header>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
            </Stack>
        )
        .add("link header", () =>
            <Stack>
                <Inline>
                    <Card size="xs" element={element}>
                        <Heading>Nasa</Heading>
                        <Header>
                            <TextLink href="https://www.nasa.gov">Website</TextLink>
                        </Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                    <Card size="sm" element={element}>
                        <Heading>Nasa</Heading>
                        <Header>
                            <TextLink href="https://www.nasa.gov">Website</TextLink>
                        </Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                    <Card element={element}>
                        <Heading>Nasa</Heading>
                        <Header>
                            <TextLink href="https://www.nasa.gov">Website</TextLink>
                        </Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                </Inline>
                <Inline>
                    <Card size="lg" element={element}>
                        <Heading>Nasa</Heading>
                        <Header>
                            <TextLink href="https://www.nasa.gov">Website</TextLink>
                        </Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                    <Card size="xl" element={element}>
                        <Heading>Nasa</Heading>
                        <Header>
                            <TextLink href="https://www.nasa.gov">Website</TextLink>
                        </Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                    </Card>
                </Inline>
                <Card fluid element={element}>
                    <Heading>Nasa</Heading>
                    <Header>
                        <TextLink href="https://www.nasa.gov">Website</TextLink>
                    </Header>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
            </Stack>
        )
        .add("rich content", () =>
            <Stack>
                <Inline>
                    <Card size="xs" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Paragraph>
                                <TextLink href="https://www.nasa.gov" external>The National Aeronautics and Space Administration</TextLink>
                            </Paragraph>
                            <UL>
                                <LI>Space Shuttle program</LI>
                                <LI>International Space Station</LI>
                            </UL>
                        </Content>
                    </Card>
                    <Card size="sm" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Paragraph>
                                <TextLink href="https://www.nasa.gov" external>The National Aeronautics and Space Administration</TextLink>
                            </Paragraph>
                            <UL>
                                <LI>Space Shuttle program</LI>
                                <LI>International Space Station</LI>
                            </UL>
                        </Content>
                    </Card>
                    <Card element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Paragraph>
                                <TextLink href="https://www.nasa.gov" external>The National Aeronautics and Space Administration</TextLink>
                            </Paragraph>
                            <UL>
                                <LI>Space Shuttle program</LI>
                                <LI>International Space Station</LI>
                            </UL>
                        </Content>
                    </Card>
                </Inline>
                <Inline>
                    <Card size="lg" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Paragraph>
                                <TextLink href="https://www.nasa.gov" external>The National Aeronautics and Space Administration</TextLink>
                            </Paragraph>
                            <UL>
                                <LI>Space Shuttle program</LI>
                                <LI>International Space Station</LI>
                            </UL>
                        </Content>
                    </Card>
                    <Card size="xl" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Paragraph>
                                <TextLink href="https://www.nasa.gov" external>The National Aeronautics and Space Administration</TextLink>
                            </Paragraph>
                            <UL>
                                <LI>Space Shuttle program</LI>
                                <LI>International Space Station</LI>
                            </UL>
                        </Content>
                    </Card>
                </Inline>
                <Card fluid element={element}>
                    <Heading>Nasa</Heading>
                    <Content>
                        <Paragraph>
                            <TextLink href="https://www.nasa.gov" external>The National Aeronautics and Space Administration</TextLink>
                        </Paragraph>
                        <UL>
                            <LI>Space Shuttle program</LI>
                            <LI>International Space Station</LI>
                        </UL>
                    </Content>
                </Card>
            </Stack>
        )
        .add("button", () =>
            <Stack>
                <Inline>
                    <Card size="xs" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <Button>Visit</Button>
                    </Card>
                    <Card size="sm" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <Button>Visit</Button>
                    </Card>
                    <Card element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <Button>Visit</Button>
                    </Card>
                </Inline>
                <Inline>
                    <Card size="lg" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <Button>Visit</Button>
                    </Card>
                    <Card size="xl" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <Button>Visit</Button>
                    </Card>
                </Inline>
                <Card fluid element={element}>
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                    <Button>Visit</Button>
                </Card>
            </Stack>
        )
        .add("button group", () =>
            <Stack>
                <Inline>
                    <Card size="xs" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <ButtonGroup>
                            <Button>Next</Button>
                            <Button>Visit</Button>
                        </ButtonGroup>
                    </Card>
                    <Card size="sm" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <ButtonGroup>
                            <Button>Next</Button>
                            <Button>Visit</Button>
                        </ButtonGroup>
                    </Card>
                    <Card element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <ButtonGroup>
                            <Button>Next</Button>
                            <Button>Visit</Button>
                        </ButtonGroup>
                    </Card>
                </Inline>
                <Inline>
                    <Card size="lg" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <ButtonGroup>
                            <Button>Next</Button>
                            <Button>Visit</Button>
                        </ButtonGroup>
                    </Card>
                    <Card size="xl" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <ButtonGroup>
                            <Button>Next</Button>
                            <Button>Visit</Button>
                        </ButtonGroup>
                    </Card>
                </Inline>
                <Card fluid element={element}>
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                    <ButtonGroup>
                        <Button>Next</Button>
                        <Button>Visit</Button>
                    </ButtonGroup>
                </Card>
            </Stack>
        )
        .add("all sections 1", () =>
            <Stack>
                <Inline>
                    <Card size="xs" element={element}>
                        <Heading>Nasa</Heading>
                        <Header>
                            <TextLink href="https://www.nasa.gov">Website</TextLink>
                        </Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <ButtonGroup>
                            <Button>Next</Button>
                            <Button>Visit</Button>
                        </ButtonGroup>
                    </Card>
                    <Card size="sm" element={element}>
                        <Illustration color="sunray-1">
                            <Image src={Nasa} alt="Nasa" />
                        </Illustration>
                        <Heading>Nasa</Heading>
                        <Header>
                            <TextLink href="https://www.nasa.gov">Website</TextLink>
                        </Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <ButtonGroup>
                            <Button>Next</Button>
                            <Button>Visit</Button>
                        </ButtonGroup>
                    </Card>
                    <Card element={element}>
                        <Illustration color="sunray-1">
                            <Image src={Nasa} alt="Nasa" />
                        </Illustration>
                        <Heading>Nasa</Heading>
                        <Header>
                            <TextLink href="https://www.nasa.gov">Website</TextLink>
                        </Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <ButtonGroup>
                            <Button>Next</Button>
                            <Button>Visit</Button>
                        </ButtonGroup>
                    </Card>
                </Inline>
                <Inline>
                    <Card size="lg" element={element}>
                        <Illustration color="sunray-1">
                            <Image src={Nasa} alt="Nasa" />
                        </Illustration>
                        <Heading>Nasa</Heading>
                        <Header>
                            <TextLink href="https://www.nasa.gov">Website</TextLink>
                        </Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <ButtonGroup>
                            <Button>Next</Button>
                            <Button>Visit</Button>
                        </ButtonGroup>
                    </Card>
                    <Card size="xl" element={element}>
                        <Illustration color="sunray-1">
                            <Image src={Nasa} alt="Nasa" />
                        </Illustration>
                        <Heading>Nasa</Heading>
                        <Header>
                            <TextLink href="https://www.nasa.gov">Website</TextLink>
                        </Header>
                        <Content>The National Aeronautics and Space Administration</Content>
                        <ButtonGroup>
                            <Button>Next</Button>
                            <Button>Visit</Button>
                        </ButtonGroup>
                    </Card>
                </Inline>
            </Stack>
        )
        .add("all sections 2", () =>
            <Card fluid element={element}>
                <Illustration color="sunray-1">
                    <Image src={Nasa} alt="Nasa" width="200px" />
                </Illustration>
                <Heading>Nasa</Heading>
                <Header>
                    <TextLink href="https://www.nasa.gov">Website</TextLink>
                </Header>
                <Content>The National Aeronautics and Space Administration</Content>
                <ButtonGroup>
                    <Button>Next</Button>
                    <Button>Visit</Button>
                </ButtonGroup>
            </Card>
        )
        .add("tabs", () =>
            <Stack>
                <Inline>
                    <Card size="xs" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Tabs aria-label="Nasa">
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
                    <Card size="sm" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Tabs aria-label="Nasa">
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
                    <Card element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Tabs aria-label="Nasa">
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
                </Inline>
                <Inline>
                    <Card size="lg" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Tabs aria-label="Nasa">
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
                    <Card size="xl" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Tabs aria-label="Nasa">
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
                </Inline>
                <Card fluid element={element}>
                    <Heading>Nasa</Heading>
                    <Content>
                        <Tabs aria-label="Nasa">
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
            </Stack>
        )
        .add("tabs & button", () =>
            <Stack>
                <Inline>
                    <Card size="xs" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Tabs aria-label="Nasa">
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
                    <Card size="sm" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Tabs aria-label="Nasa">
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
                    <Card element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Tabs aria-label="Nasa">
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
                </Inline>
                <Inline>
                    <Card size="lg" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Tabs aria-label="Nasa">
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
                    <Card size="xl" element={element}>
                        <Heading>Nasa</Heading>
                        <Content>
                            <Tabs aria-label="Nasa">
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
                </Inline>
            </Stack>
        )
        .add("heading overflow", () =>
            <Card element={element}>
                <Heading>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Heading>
                <Content>The National Aeronautics and Space Administration</Content>
            </Card>
        )
        .add("header overflow", () =>
            <Card element={element}>
                <Heading>Nasa</Heading>
                <Header>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Header>
                <Content>The National Aeronautics and Space Administration</Content>
            </Card>
        )
        .add("button overflow", () =>
            <Card element={element}>
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration</Content>
                <ButtonGroup>
                    <Button>Lorem ipsum dolor sit amet.</Button>
                    <Button>Lorem ipsum dolor sit amet.</Button>
                    <Button>Lorem ipsum dolor sit amet.</Button>
                </ButtonGroup>
            </Card>
        )
        .add("everything overflow", () =>
            <Card element={element}>
                <Heading>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Heading>
                <Header>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Header>
                <Content>The National Aeronautics and Space Administration</Content>
                <ButtonGroup>
                    <Button>Lorem ipsum dolor sit amet.</Button>
                    <Button>Lorem ipsum dolor sit amet.</Button>
                    <Button>Lorem ipsum dolor sit amet.</Button>
                </ButtonGroup>
            </Card>
        );
}
