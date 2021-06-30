import { Button } from "@react-components/button";
import { ButtonGroup } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { Dialog } from "@react-components/dialog";
import { Footer, Header } from "@react-components/placeholders";
import { Heading } from "@react-components/heading";
import { Illustration } from "@react-components/illustration";
import { Image } from "@react-components";
import { Nasa } from "./assets";
import { Paragraph } from "@react-components/paragraph";
import { TextLink } from "@react-components/link";
import { storiesOfBuilder } from "@stories/utils";

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
        </Dialog>
    )
    .add("with text header", () =>
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
    .add("with link header", () =>
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
    .add("with text footer", () =>
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
    .add("with link footer", () =>
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
    .add("with button", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <Button>Close</Button>
        </Dialog>
    )
    .add("with button group", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <ButtonGroup>
                <Button>Close</Button>
                <Button color="primary">Next</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("with footer & button group", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <Footer>02 December 2020</Footer>
            <ButtonGroup>
                <Button>Close</Button>
                <Button color="primary">Next</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("with illustration", () =>
        <Dialog>
            <Illustration>
                <Image src={Nasa} alt="NASA" width="200px" />
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
            <Illustration>
                <Image src={Nasa} alt="NASA" width="200px" />
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
            <Footer>
                <TextLink href="https://www.nature.com/articles/d41586-020-03421-y" external>02 December 2020</TextLink>
            </Footer>
            <ButtonGroup>
                <Button>Close</Button>
                <Button color="primary">Next</Button>
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
        </Dialog>
    )
    .add("fullscreen", () =>
        <Dialog size="fullscreen">
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
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
    .add("(MOVE TO JEST) autofocus with focusable element", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <ButtonGroup>
                <Button>Close</Button>
                <Button color="primary">Next</Button>
            </ButtonGroup>
        </Dialog>
    )
    .add("(MOVE TO JEST) autofocus without any focusable element", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    )
    .add("(MOVE TO JEST) manual focus", () =>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
            <ButtonGroup>
                <Button>Close</Button>
                <Button autoFocus color="primary">Next</Button>
            </ButtonGroup>
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

