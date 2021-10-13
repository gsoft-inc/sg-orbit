import { Apollo11Poster, Nasa, TheMartianPoster } from "./assets";
import { Button } from "@react-components/button";
import { ButtonGroup } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { Dialog } from "@react-components/dialog";
import { Div } from "@react-components/html";
import { Footer, Header } from "@react-components/placeholders";
import { Heading, Paragraph } from "@react-components/typography";
import { Illustration } from "@react-components/illustration";
import { Image } from "@react-components";
import { TextLink } from "@react-components/link";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Dialog")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>,
         {
             ...paramsBuilder()
                 .validateBreakpoints()
                 .build()
         }
    )
    .add("text header", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Header>02 December 2020</Header>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("link header", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Header>
                <TextLink href="https://www.nature.com/articles/d41586-020-03421-y" external>View the whole story</TextLink>
            </Header>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("text footer", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <Footer>02 December 2020</Footer>
        </Dialog>
    )
    .add("link footer", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <Footer>
                <TextLink href="https://www.nature.com/articles/d41586-020-03421-y" external>View the whole story</TextLink>
            </Footer>
        </Dialog>
    )
    .add("button", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <Button variant="secondary">Close</Button>
        </Dialog>
    )
    .add("button group", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <ButtonGroup>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Next</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("footer & button group", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <Footer>02 December 2020</Footer>
            <ButtonGroup>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Next</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("image too small", () =>
        <Dialog>
            <Image src={Apollo11Poster} alt="Apollo 11" />
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("image too big", () =>
        <Dialog>
            <Image src={TheMartianPoster} alt="The Martian" />
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("illustration", () =>
        <Dialog>
            <Illustration color="sunray-1">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("all sections", () =>
        <Dialog>
            <Illustration color="sunray-1">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Header>
                <TextLink href="https://www.nature.com/articles/d41586-020-03421-y" external>View the whole story</TextLink>
            </Header>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <Footer>02 December 2020</Footer>
            <ButtonGroup>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Next</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("heading overflow", () =>
        <Dialog>
            <Heading>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("header overflow", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Header>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Header>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("footer overflow", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <Footer>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Footer>
            <ButtonGroup>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Next</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("button overflow", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <ButtonGroup>
                <Button variant="secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
                <Button variant="secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
                <Button variant="primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("everything overflow", () =>
        <Dialog>
            <Heading>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Heading>
            <Header>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Header>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <Footer>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Footer>
            <ButtonGroup>
                <Button variant="secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
                <Button variant="secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
                <Button variant="primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("not dismissable", () =>
        <Dialog dismissable={false}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("small", () =>
        <Dialog size="sm">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <ButtonGroup>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Next</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("medium", () =>
        <Dialog size="md">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <ButtonGroup>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Next</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("large", () =>
        <Dialog size="lg">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <ButtonGroup>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Next</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("fullscreen", () =>
        <Dialog size="fullscreen">
            <Illustration color="sunray-1">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <Footer>02 December 2020</Footer>
            <ButtonGroup>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Next</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("fullscreen with overflow content", () =>
        <Dialog size="fullscreen">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a nunc nibh. Duis quis viverra urna. Proin pharetra justo sit amet quam faucibus pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque enim, ornare quis accumsan quis, dapibus eget augue. Quisque ultricies risus laoreet, pharetra libero eu, hendrerit eros. In feugiat sed elit et consectetur. Pellentesque blandit egestas mi id volutpat.</Paragraph>
                <Paragraph>Mauris eget ex non nisi finibus sollicitudin in eu quam. In tincidunt purus eu dui aliquam semper. Curabitur a rutrum lorem. Ut interdum risus ac est mattis laoreet id ut velit. Curabitur semper tincidunt justo. Mauris et neque eget lacus imperdiet tempus. Aenean sit amet commodo odio. Maecenas volutpat finibus libero ultrices sagittis. Proin in nisi scelerisque, convallis leo ut, scelerisque velit. Fusce non imperdiet urna, dictum scelerisque quam. Proin tincidunt metus quis eros sollicitudin vestibulum. Maecenas sem sapien, iaculis vel vehicula a, ullamcorper eget ex. Ut dignissim congue semper. Pellentesque bibendum a purus id ultrices.</Paragraph>
                <Paragraph>Donec nec lacus diam. Quisque ut tellus eu dui egestas varius. Vivamus quis urna sem. Aliquam leo nisi, viverra eget leo vitae, finibus elementum nibh. Donec a scelerisque justo. Integer aliquam aliquet purus, dapibus ultrices sapien. Aenean eu suscipit sem, non sollicitudin metus. Pellentesque et magna ornare, feugiat magna malesuada, ullamcorper erat. Etiam sit amet suscipit magna, ac consequat lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse lorem lacus, elementum ultricies nunc eget, blandit iaculis quam. Phasellus mattis ut nibh non feugiat. Nullam nisi neque, placerat ut vestibulum vel, efficitur sit amet enim.</Paragraph>
                <Paragraph>Mauris at finibus velit, tempus tincidunt ligula. Phasellus pretium justo vel neque commodo, non mattis orci malesuada. Fusce ornare non nisi vitae commodo. Aenean vitae rhoncus orci. In ante dui, convallis in scelerisque sit amet, tempor non nibh. Fusce et lobortis massa. Ut vitae condimentum nisl. Fusce pretium dolor sit amet nibh bibendum, at efficitur magna fringilla. Phasellus iaculis elementum est, ut malesuada nunc fermentum ac. Sed eu ultricies felis, vel porta ante. Mauris pharetra efficitur faucibus.</Paragraph>
                <Paragraph>Nulla mollis mauris ut cursus maximus. Suspendisse vitae condimentum turpis, at posuere purus. Fusce viverra justo non turpis gravida, maximus vulputate velit tincidunt. Integer volutpat pulvinar diam, at auctor felis consequat non. Nam ultrices, felis id maximus cursus, nulla quam aliquet turpis, nec feugiat magna urna sit amet nibh. Aenean quis sollicitudin nibh, sit amet feugiat dui. Phasellus maximus luctus arcu in aliquam. Ut a tortor quis justo ullamcorper euismod at sit amet leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam malesuada neque ac pulvinar malesuada.</Paragraph>
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a nunc nibh. Duis quis viverra urna. Proin pharetra justo sit amet quam faucibus pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque enim, ornare quis accumsan quis, dapibus eget augue. Quisque ultricies risus laoreet, pharetra libero eu, hendrerit eros. In feugiat sed elit et consectetur. Pellentesque blandit egestas mi id volutpat.</Paragraph>
                <Paragraph>Mauris eget ex non nisi finibus sollicitudin in eu quam. In tincidunt purus eu dui aliquam semper. Curabitur a rutrum lorem. Ut interdum risus ac est mattis laoreet id ut velit. Curabitur semper tincidunt justo. Mauris et neque eget lacus imperdiet tempus. Aenean sit amet commodo odio. Maecenas volutpat finibus libero ultrices sagittis. Proin in nisi scelerisque, convallis leo ut, scelerisque velit. Fusce non imperdiet urna, dictum scelerisque quam. Proin tincidunt metus quis eros sollicitudin vestibulum. Maecenas sem sapien, iaculis vel vehicula a, ullamcorper eget ex. Ut dignissim congue semper. Pellentesque bibendum a purus id ultrices.</Paragraph>
                <Paragraph>Donec nec lacus diam. Quisque ut tellus eu dui egestas varius. Vivamus quis urna sem. Aliquam leo nisi, viverra eget leo vitae, finibus elementum nibh. Donec a scelerisque justo. Integer aliquam aliquet purus, dapibus ultrices sapien. Aenean eu suscipit sem, non sollicitudin metus. Pellentesque et magna ornare, feugiat magna malesuada, ullamcorper erat. Etiam sit amet suscipit magna, ac consequat lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse lorem lacus, elementum ultricies nunc eget, blandit iaculis quam. Phasellus mattis ut nibh non feugiat. Nullam nisi neque, placerat ut vestibulum vel, efficitur sit amet enim.</Paragraph>
                <Paragraph>Mauris at finibus velit, tempus tincidunt ligula. Phasellus pretium justo vel neque commodo, non mattis orci malesuada. Fusce ornare non nisi vitae commodo. Aenean vitae rhoncus orci. In ante dui, convallis in scelerisque sit amet, tempor non nibh. Fusce et lobortis massa. Ut vitae condimentum nisl. Fusce pretium dolor sit amet nibh bibendum, at efficitur magna fringilla. Phasellus iaculis elementum est, ut malesuada nunc fermentum ac. Sed eu ultricies felis, vel porta ante. Mauris pharetra efficitur faucibus.</Paragraph>
                <Paragraph>Nulla mollis mauris ut cursus maximus. Suspendisse vitae condimentum turpis, at posuere purus. Fusce viverra justo non turpis gravida, maximus vulputate velit tincidunt. Integer volutpat pulvinar diam, at auctor felis consequat non. Nam ultrices, felis id maximus cursus, nulla quam aliquet turpis, nec feugiat magna urna sit amet nibh. Aenean quis sollicitudin nibh, sit amet feugiat dui. Phasellus maximus luctus arcu in aliquam. Ut a tortor quis justo ullamcorper euismod at sit amet leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam malesuada neque ac pulvinar malesuada.</Paragraph>
            </Content>
            <Footer>02 December 2020</Footer>
            <ButtonGroup>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Next</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("scrolling", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel magna tempor libero feugiat tincidunt vitae eget elit. Vivamus pretium euismod leo, vitae rutrum justo luctus euismod. Suspendisse blandit lobortis ipsum nec fringilla. Nulla ex enim, faucibus non consectetur id, molestie nec ante. Morbi massa diam, cursus eget efficitur vitae, fermentum quis ligula. Suspendisse ac turpis eget sapien scelerisque consectetur non vitae lorem. Nulla mollis lacus eget diam sollicitudin vestibulum. Sed iaculis velit orci, aliquet aliquam odio pharetra et. Vestibulum sit amet scelerisque justo. Nulla facilisi. Integer vitae justo aliquam, interdum mi in, pulvinar velit. Vestibulum convallis nisi nibh, vel venenatis lacus lacinia in.</Paragraph>
                <Paragraph>Nunc eu aliquam justo. Nulla blandit, mauris nec bibendum viverra, turpis ipsum laoreet urna, eget ullamcorper arcu eros id neque. Donec tincidunt aliquet accumsan. Aliquam ac dolor nec nisl auctor bibendum. Pellentesque iaculis leo purus, eu sodales libero porttitor vitae. Fusce eget nisi eu neque dapibus pharetra. Proin eget porttitor justo, id luctus metus. Nam mattis elementum neque, ac placerat arcu. Sed ornare, quam a elementum fringilla, justo lacus tristique purus, at lacinia ipsum lorem in eros. Maecenas eget turpis non massa bibendum ullamcorper non sed mauris. Aliquam sagittis augue sit amet lacus mattis pretium. Proin magna nisi, aliquam ac varius quis, dictum vel eros.</Paragraph>
                <Paragraph>Nam ac ipsum vulputate, vulputate lorem sit amet, egestas odio. Sed dignissim, lorem vitae ultricies auctor, neque est tincidunt nunc, ut congue odio erat eget mauris. Etiam a mattis turpis, nec porttitor elit. Proin dolor dolor, semper sed pretium a, consectetur id lacus. Nulla mattis placerat turpis, mattis commodo quam feugiat at. Sed ullamcorper dui vitae odio tempor, a porta tortor fringilla. Sed at dictum nibh, eu faucibus leo. Quisque a arcu porta, condimentum odio a, blandit massa. Nulla luctus mollis eros, ac porttitor neque euismod et.</Paragraph>
                <Paragraph>Maecenas tincidunt dignissim nisl, quis vestibulum lectus finibus et. Morbi justo justo, varius nec lacus nec, dignissim porttitor tellus. Fusce ullamcorper tristique ante, quis porttitor lectus interdum non. Donec pellentesque, eros at molestie ultricies, risus lacus ullamcorper neque, in ornare massa sapien nec dolor. Cras eros neque, aliquam eu faucibus eu, semper porttitor metus. Aenean quis ex ipsum. Sed congue purus urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla at magna et sapien sodales ullamcorper. Aliquam erat volutpat. Etiam eu tincidunt tellus. Pellentesque rutrum lacus ut ultricies condimentum.</Paragraph>
                <Paragraph>Donec malesuada turpis sapien, quis eleifend nulla euismod quis. Donec pulvinar dui vitae nibh mattis, sed feugiat magna fringilla. Vivamus nibh magna, pretium vel molestie et, consequat venenatis sem. Etiam sit amet metus eu leo tincidunt efficitur eu ut lectus. Ut molestie convallis congue. Ut nec tristique velit. Morbi efficitur massa quis sem sagittis, vitae venenatis felis pharetra.</Paragraph>
                <Paragraph>Sed imperdiet massa sed ipsum pharetra, id gravida nulla scelerisque. In hac habitasse platea dictumst. Sed eget erat malesuada, malesuada risus eu, consectetur mauris. Nunc mattis ultricies risus non viverra. Quisque libero lacus, finibus at ligula ut, finibus mattis arcu. Phasellus non lacus malesuada urna suscipit faucibus ac eget libero. Mauris eget dui sollicitudin, suscipit purus sed, pharetra lectus. Donec auctor metus eget orci scelerisque, sit amet rhoncus mi egestas. Proin ultrices porttitor feugiat. Nulla et sodales lectus. Proin ut turpis eget ipsum venenatis aliquam. Morbi non egestas lectus.</Paragraph>
                <Paragraph>Nunc sed odio quis ex lacinia tempor rhoncus ut est. Morbi dapibus, turpis congue tempus euismod, augue lorem posuere est, ut rhoncus arcu massa ut urna. Sed in enim quis magna facilisis consequat in nec dui. Vivamus eleifend id ex in pretium. Proin accumsan tincidunt ligula quis aliquet. Donec iaculis, nisi in ultricies facilisis, nisi neque blandit enim, sed lobortis erat magna id nisi. Cras imperdiet lacus eu ante mattis dignissim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam ornare tortor eu blandit condimentum. Duis sollicitudin lectus sit amet ullamcorper dignissim. Vivamus a massa ut velit laoreet posuere in sit amet mi.</Paragraph>
                <Paragraph>Suspendisse eu leo convallis metus pharetra viverra. Donec aliquet tempor eros, consectetur porta leo tempus vel. Ut at nibh sit amet erat mollis porta. Etiam eget libero ut nulla volutpat tristique. Sed laoreet hendrerit aliquam. Vivamus sagittis neque sed ante porttitor ornare. Donec aliquam auctor lorem vitae elementum. Phasellus in sem id lectus molestie dapibus. Donec est ante, efficitur id massa quis, luctus fermentum lacus.</Paragraph>
                <Paragraph>Proin hendrerit volutpat diam, at cursus elit euismod ac. Donec in enim quis diam fermentum auctor. Suspendisse dignissim eros quis consectetur mattis. Vestibulum vel hendrerit libero. Vestibulum auctor nisl a ligula accumsan pharetra. Morbi blandit tristique est ac pulvinar. Vestibulum ornare, nulla a elementum facilisis, erat justo tristique tortor, eget rutrum nisi tortor id sapien. Morbi mattis semper urna vitae ornare.</Paragraph>
                <Paragraph>Donec ut purus tempus, eleifend lacus sit amet, varius tellus. Aliquam sed fringilla enim. Suspendisse luctus neque volutpat justo finibus, id auctor purus pellentesque. Fusce vulputate commodo enim ut consequat. Sed elit justo, feugiat ac augue a, rhoncus imperdiet nulla. Maecenas rutrum nulla non massa elementum, sit amet volutpat ex dignissim. Duis vulputate turpis a nisi dictum, a finibus erat feugiat. Donec mollis tristique neque at commodo. Suspendisse quis lacus in erat gravida iaculis et a nisi.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("do not autofocus an element which is not in the initial viewport", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a nunc nibh. Duis quis viverra urna. Proin pharetra justo sit amet quam faucibus pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque enim, ornare quis accumsan quis, dapibus eget augue. Quisque ultricies risus laoreet, pharetra libero eu, hendrerit eros. In feugiat sed elit et consectetur. Pellentesque blandit egestas mi id volutpat.</Paragraph>
                <Paragraph>Mauris eget ex non nisi finibus sollicitudin in eu quam. In tincidunt purus eu dui aliquam semper. Curabitur a rutrum lorem. Ut interdum risus ac est mattis laoreet id ut velit. Curabitur semper tincidunt justo. Mauris et neque eget lacus imperdiet tempus. Aenean sit amet commodo odio. Maecenas volutpat finibus libero ultrices sagittis. Proin in nisi scelerisque, convallis leo ut, scelerisque velit. Fusce non imperdiet urna, dictum scelerisque quam. Proin tincidunt metus quis eros sollicitudin vestibulum. Maecenas sem sapien, iaculis vel vehicula a, ullamcorper eget ex. Ut dignissim congue semper. Pellentesque bibendum a purus id ultrices.</Paragraph>
                <Paragraph>Donec nec lacus diam. Quisque ut tellus eu dui egestas varius. Vivamus quis urna sem. Aliquam leo nisi, viverra eget leo vitae, finibus elementum nibh. Donec a scelerisque justo. Integer aliquam aliquet purus, dapibus ultrices sapien. Aenean eu suscipit sem, non sollicitudin metus. Pellentesque et magna ornare, feugiat magna malesuada, ullamcorper erat. Etiam sit amet suscipit magna, ac consequat lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse lorem lacus, elementum ultricies nunc eget, blandit iaculis quam. Phasellus mattis ut nibh non feugiat. Nullam nisi neque, placerat ut vestibulum vel, efficitur sit amet enim.</Paragraph>
                <Paragraph>Mauris at finibus velit, tempus tincidunt ligula. Phasellus pretium justo vel neque commodo, non mattis orci malesuada. Fusce ornare non nisi vitae commodo. Aenean vitae rhoncus orci. In ante dui, convallis in scelerisque sit amet, tempor non nibh. Fusce et lobortis massa. Ut vitae condimentum nisl. Fusce pretium dolor sit amet nibh bibendum, at efficitur magna fringilla. Phasellus iaculis elementum est, ut malesuada nunc fermentum ac. Sed eu ultricies felis, vel porta ante. Mauris pharetra efficitur faucibus.</Paragraph>
                <Paragraph>Nulla mollis mauris ut cursus maximus. Suspendisse vitae condimentum turpis, at posuere purus. Fusce viverra justo non turpis gravida, maximus vulputate velit tincidunt. Integer volutpat pulvinar diam, at auctor felis consequat non. Nam ultrices, felis id maximus cursus, nulla quam aliquet turpis, nec feugiat magna urna sit amet nibh. Aenean quis sollicitudin nibh, sit amet feugiat dui. Phasellus maximus luctus arcu in aliquam. Ut a tortor quis justo ullamcorper euismod at sit amet leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam malesuada neque ac pulvinar malesuada.</Paragraph>
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a nunc nibh. Duis quis viverra urna. Proin pharetra justo sit amet quam faucibus pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce neque enim, ornare quis accumsan quis, dapibus eget augue. Quisque ultricies risus laoreet, pharetra libero eu, hendrerit eros. In feugiat sed elit et consectetur. Pellentesque blandit egestas mi id volutpat.</Paragraph>
                <Paragraph>Mauris eget ex non nisi finibus sollicitudin in eu quam. In tincidunt purus eu dui aliquam semper. Curabitur a rutrum lorem. Ut interdum risus ac est mattis laoreet id ut velit. Curabitur semper tincidunt justo. Mauris et neque eget lacus imperdiet tempus. Aenean sit amet commodo odio. Maecenas volutpat finibus libero ultrices sagittis. Proin in nisi scelerisque, convallis leo ut, scelerisque velit. Fusce non imperdiet urna, dictum scelerisque quam. Proin tincidunt metus quis eros sollicitudin vestibulum. Maecenas sem sapien, iaculis vel vehicula a, ullamcorper eget ex. Ut dignissim congue semper. Pellentesque bibendum a purus id ultrices.</Paragraph>
                <Paragraph>Donec nec lacus diam. Quisque ut tellus eu dui egestas varius. Vivamus quis urna sem. Aliquam leo nisi, viverra eget leo vitae, finibus elementum nibh. Donec a scelerisque justo. Integer aliquam aliquet purus, dapibus ultrices sapien. Aenean eu suscipit sem, non sollicitudin metus. Pellentesque et magna ornare, feugiat magna malesuada, ullamcorper erat. Etiam sit amet suscipit magna, ac consequat lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse lorem lacus, elementum ultricies nunc eget, blandit iaculis quam. Phasellus mattis ut nibh non feugiat. Nullam nisi neque, placerat ut vestibulum vel, efficitur sit amet enim.</Paragraph>
                <Paragraph>Mauris at finibus velit, tempus tincidunt ligula. Phasellus pretium justo vel neque commodo, non mattis orci malesuada. Fusce ornare non nisi vitae commodo. Aenean vitae rhoncus orci. In ante dui, convallis in scelerisque sit amet, tempor non nibh. Fusce et lobortis massa. Ut vitae condimentum nisl. Fusce pretium dolor sit amet nibh bibendum, at efficitur magna fringilla. Phasellus iaculis elementum est, ut malesuada nunc fermentum ac. Sed eu ultricies felis, vel porta ante. Mauris pharetra efficitur faucibus.</Paragraph>
                <Paragraph>Nulla mollis mauris ut cursus maximus. Suspendisse vitae condimentum turpis, at posuere purus. Fusce viverra justo non turpis gravida, maximus vulputate velit tincidunt. Integer volutpat pulvinar diam, at auctor felis consequat non. Nam ultrices, felis id maximus cursus, nulla quam aliquet turpis, nec feugiat magna urna sit amet nibh. Aenean quis sollicitudin nibh, sit amet feugiat dui. Phasellus maximus luctus arcu in aliquam. Ut a tortor quis justo ullamcorper euismod at sit amet leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam malesuada neque ac pulvinar malesuada.</Paragraph>
            </Content>
            <Footer>02 December 2020</Footer>
            <ButtonGroup>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Next</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("focused", () =>
        <Dialog focus>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("wrapper styled system", () =>
        <Dialog wrapperProps={{ border: "sunray-10" }}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("wrapper className", () =>
        <Dialog wrapperProps={{ className: "border-red" }}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("wrapper style", () =>
        <Dialog wrapperProps={{ style: { border: "1px solid red" } }}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("styled system", () =>
        <Dialog border="sunray-10">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("className", () =>
        <Dialog className="border-red">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("zoom in", () =>
        <Div className="zoom-in">
            <Dialog>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                    <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                    <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
                </Content>
            </Dialog>
        </Div>
    )
    .add("zoom out", () =>
        <Div className="zoom-out">
            <Dialog>
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>
                    <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                    <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                    <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
                </Content>
            </Dialog>
        </Div>
    )
    .add("style", () =>
        <Dialog style={{ border: "1px solid red" }}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    );

