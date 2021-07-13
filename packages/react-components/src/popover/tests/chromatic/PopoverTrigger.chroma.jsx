import { Button } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/heading";
import { Popover, PopoverTrigger } from "@react-components/popover";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/PopoverTrigger")
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({
                padding: "150px 350px"
            })
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

stories()
    .add("default", () =>
        <PopoverTrigger>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("default open", () =>
        <PopoverTrigger defaultOpen>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position auto", () =>
        <PopoverTrigger position="auto" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position auto-start", () =>
        <PopoverTrigger position="auto-start" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position auto-end", () =>
        <PopoverTrigger position="auto-end" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position top", () =>
        <PopoverTrigger position="top" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position top-start", () =>
        <PopoverTrigger position="top-start" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position top-end", () =>
        <PopoverTrigger position="top-end" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position bottom", () =>
        <PopoverTrigger position="bottom" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position bottom-start", () =>
        <PopoverTrigger position="bottom-start" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position bottom-end", () =>
        <PopoverTrigger position="bottom-end" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position right", () =>
        <PopoverTrigger position="right" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position right-start", () =>
        <PopoverTrigger position="right-start" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position right-end", () =>
        <PopoverTrigger position="right-end" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position left", () =>
        <PopoverTrigger position="left" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position left-start", () =>
        <PopoverTrigger position="left-start" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position left-end", () =>
        <PopoverTrigger position="left-end" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    );
