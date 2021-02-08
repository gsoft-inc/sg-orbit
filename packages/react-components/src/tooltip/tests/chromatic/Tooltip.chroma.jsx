import { Button } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { EmailIcon } from "@react-components/icons";
import { IconButton } from "@react-components/button";
import { Image } from "@react-components/image";
import { Launch } from "./assets";
import { Text } from "@react-components/text";
import { TextLink } from "@react-components/link";
import { Tooltip } from "@react-components/tooltip";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

/*
INTERACTION TESTS:
    - open on "hover"
    - close when leaving trigger
    - doesn't close when hover overlay
    - close when leaving overlay
    - close on blur
    - close on esc when focus in overlay
    - don't open when disabled
    - close on esc when focus on trigger
*/

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Tooltip")
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({
                paddingTop: "50px",
                paddingLeft: "200px"
            })
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Tooltip>
            <Button>Trigger</Button>
            <Content>Man must rise above the Earth</Content>
        </Tooltip>
    )
    .add("open", () =>
        <Tooltip open>
            <Button>Trigger</Button>
            <Content>Man must rise above the Earth</Content>
        </Tooltip>
    )
    .add("open on focus", () =>
        <Tooltip>
            <Button autoFocus>Trigger</Button>
            <Content>Man must rise above the Earth</Content>
        </Tooltip>
    )
    .add("icon trigger", () =>
        <Tooltip open>
            <EmailIcon />
            <Content>Man must rise above the Earth</Content>
        </Tooltip>
    )
    .add("icon button trigger", () =>
        <Tooltip open>
            <IconButton aria-label="Email">
                <EmailIcon />
            </IconButton>
            <Content>Man must rise above the Earth</Content>
        </Tooltip>
    )
    .add("link trigger", () =>
        <Tooltip open>
            <TextLink>Trigger</TextLink>
            <Content>Man must rise above the Earth</Content>
        </Tooltip>
    )
    .add("image trigger", () =>
        <Tooltip open>
            <Image src={Launch} width="400px" alt="SpaceX launch" />
            <Content>Man must rise above the Earth</Content>
        </Tooltip>
    )
    .add("disabled", () =>
        <Tooltip disabled open>
            <Button>Trigger</Button>
            <Content>Man must rise above the Earth</Content>
        </Tooltip>
    )
    .add("very long content", () =>
        <Tooltip open>
            <Button>Trigger</Button>
            <Content>Man must rise above the Earth—to the top of the atmosphere and beyond—for only thus will he fully understand the world in which he lives. Astronomy compels the soul to look upward, and leads us from this world to another.</Content>
        </Tooltip>
    )
    .add("icon in content", () =>
        <Tooltip open>
            <Button>Trigger</Button>
            <Content>
                <EmailIcon />
                <Text>Man must rise above the Earth</Text>
                <EmailIcon />
            </Content>
        </Tooltip>
    )
    .add("link in content", () =>
        <Tooltip open>
            <Button>Trigger</Button>
            <Content>
                Man must rise above the <TextLink href="https://en.wikipedia.org/wiki/Earth">Earth</TextLink>.
            </Content>
        </Tooltip>
    );
