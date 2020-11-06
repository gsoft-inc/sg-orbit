import { ArrowIcon } from "@react-components/icons";
import { Box } from "@react-components/box";
import { Button } from "@react-components/button";
import { Content } from "@react-components/view";
import { Disclosure, useDisclosureContext } from "@react-components/disclosure";
import { Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Disclosure"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

/*
Use a button for all the test except the custom trigger.

- default -> DONE
- open -> DONE
- custom trigger (open / close use arrow) -> use context -> DONE
- render props -> button + isOpen
- textlink as button
*/

stories()
    .add("default", () =>
        <Disclosure>
            <Button>Mars</Button>
            <Content>
                Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System (in adherence with the IAU's controversial 2006 definition of planet),
                being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".[17][18] The latter refers
                to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye.
                [19] Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth.
            </Content>
        </Disclosure>
    )
    .add("opened", () =>
        <Stack>
            <div>
                <Disclosure open>
                    <Button>Mars</Button>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Disclosure>
            </div>
            <div>
                <Disclosure defaultOpen>
                    <Button>Mars</Button>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Disclosure>
            </div>
        </Stack>
    )
    .add("custom trigger", () => {
        const Trigger = ({ children, ...rest }) => {
            const { isOpen } = useDisclosureContext();

            return (
                <Box
                    {...rest}
                    className="flex items-center"
                >
                    {children}
                    <ArrowIcon className={isOpen ? "rotate-90" : undefined} />
                </Box>
            );
        };

        return (
            <Stack>
                <div>
                    <Disclosure>
                        <Trigger>Mars</Trigger>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                    </Disclosure>
                </div>
                <div>
                    <Disclosure defaultOpen>
                        <Trigger>Mars</Trigger>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                    </Disclosure>
                </div>
            </Stack>
        );
    })
    .add("render props", () =>
        <Stack>
            <div>
                <Disclosure>
                    {({ isOpen }) => (
                        <>
                            <Button>
                                <Text>Mars</Text>
                                <ArrowIcon slot="right-icon" className={isOpen ? "rotate-90" : undefined} />
                            </Button>
                            <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                        </>
                    )}
                </Disclosure>
            </div>
            <div>
                <Disclosure defaultOpen>
                    {({ isOpen }) => (
                        <>
                            <Button>
                                <Text>Mars</Text>
                                <ArrowIcon slot="right-icon" className={isOpen ? "rotate-90" : undefined} />
                            </Button>
                            <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                        </>
                    )}
                </Disclosure>
            </div>
        </Stack>
    );
