import { Apollo11Poster, Nasa, TheMartianPoster } from "./assets";
import { Content, Footer, Header } from "@components/placeholders";
import { Heading, Paragraph } from "@components/typography";
import { ButtonGroup, Button } from "@components/button";
import { Dialog } from "@components/dialog";
import { Div } from "@components/html";
import { Illustration } from "@components/illustration";
import { Image } from "@components/image";
import { TextLink } from "@components/link";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Dialog",
    component: Dialog
} as ComponentMeta<typeof Dialog>;

type DialogStory = ComponentStoryObj<typeof Dialog>;

export const Default: DialogStory = {
    storyName: "default",
    render: () => (
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
};

export const TextHeader: DialogStory = {
    storyName: "text header",
    render: () => (
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
};

export const LinkHeader: DialogStory = {
    storyName: "link header",
    render: () => (
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
};

export const TextFooter: DialogStory = {
    storyName: "text footer",
    render: () => (
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
};

export const LinkFooter: DialogStory = {
    storyName: "link footer",
    render: () => (
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
};

export const DialogButton: DialogStory = {
    storyName: "button",
    render: () => (
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
};


export const DialogButtonGroup: DialogStory = {
    storyName: "button group",
    render: () => (
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
};

export const FooterButtonGroup: DialogStory = {
    storyName: "footer & button group",
    render: () => (
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
};

export const ImageTooSmall: DialogStory = {
    storyName: "image too small",
    render: () => (
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
};

export const ImageTooBig: DialogStory = {
    storyName: "image too big",
    render: () => (
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
};

export const DialogIllustration: DialogStory = {
    storyName: "illustration",
    render: () => (
        <Dialog>
            <Illustration color="warning-1">
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
};

export const AllSections: DialogStory = {
    storyName: "all sections",
    render: () => (
        <Dialog>
            <Illustration color="warning-1">
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
};

export const HeadingOverflow: DialogStory = {
    storyName: "heading overflow",
    render: () => (
        <Dialog>
            <Heading>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
};

export const HeaderOverflow: DialogStory = {
    storyName: "header overflow",
    render: () => (
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
};

export const FooterOverflow: DialogStory = {
    storyName: "footer overflow",
    render: () => (
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
};

export const ButtonOverflow: DialogStory = {
    storyName: "button overflow",
    render: () => (
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
};

export const EverythingOverflow: DialogStory = {
    storyName: "everything overflow",
    render: () => (
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
};

export const NotDismissable: DialogStory = {
    storyName: "not dismissable",
    render: () => (
        <Dialog dismissable={false}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
};

export const Small: DialogStory = {
    storyName: "small",
    render: () => (
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
};

export const Medium: DialogStory = {
    storyName: "medium",
    render: () => (
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
};

export const Large: DialogStory = {
    storyName: "large",
    render: () => (
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
};

export const NoAutofocus: DialogStory = {
    storyName: "do not autofocus an element which is not in the initial viewport",
    render: () => (
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
};

export const Focused: DialogStory = {
    storyName: "focused",
    render: () => (
        <Dialog focus>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
};

export const WrapperStyledSystem: DialogStory = {
    storyName: "wrapper styled system",
    render: () => (
        <Dialog wrapperProps={{ border: "warning-7" }}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
};

export const WrapperClassName: DialogStory = {
    storyName: "wrapper className",
    render: () => (
        <Dialog wrapperProps={{ className: "border-red" }}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
};

export const WrapperStyle: DialogStory = {
    storyName: "wrapper style",
    render: () => (
        <Dialog wrapperProps={{ style: { border: "0.0625rem solid red" } }}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
};

export const StyledSystem: DialogStory = {
    storyName: "styled system",
    render: () => (
        <Dialog border="warning-7">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
};

export const ClassName: DialogStory = {
    storyName: "className",
    render: () => (
        <Dialog className="border-red">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
};

export const ZoomIn: DialogStory = {
    storyName: "zoom in",
    render: () => (
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
};

export const ZoomOut: DialogStory = {
    storyName: "zoom out",
    render: () => (
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
};

export const Style: DialogStory = {
    storyName: "style",
    render: () => (
        <Dialog style={{ border: "0.0625rem solid red" }}>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
};
