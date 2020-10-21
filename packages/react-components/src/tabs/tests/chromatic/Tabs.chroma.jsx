// import { Content, Header } from "@react-components/view";
import { Box } from "@react-components/box";
import { Tab, Tabs } from "@react-components/tabs";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { forwardRef, useMemo, useState } from "react";
import { isNil } from "lodash";
import { slot } from "@react-components/shared";

const Header = slot(forwardRef(({ children, ...rest }, ref) => {
    return (
        <Box
            {...rest}
            ref={ref}
        >
            {children}
        </Box>
    );
}), "header");

const Content = slot(({ children, ...rest }) => {
    return (
        <Box {...rest}>
            {children}
        </Box>
    );
}, "content");

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Tabs"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Tabs>
            <Tab>
                <Header>Mars</Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System (in adherence with the IAU's controversial 2006 definition of planet),
                    being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".[17][18] The latter refers
                    to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye.
                    [19] Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth.
                </Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half
                    times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has
                    been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be
                    bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.
                </Content>
            </Tab>
        </Tabs>
    )
    .add("support custom components", () => {
        const RedHeader = slot(({ children }) => {
            return (
                <Header style={{ backgroundColor: "red" }}>
                    {children}
                </Header>
            );
        }, "header");

        const BlueHeader = slot(forwardRef(({ children }, ref) => {
            return (
                <Header style={{ backgroundColor: "blue" }} ref={ref}>
                    {children}
                </Header>
            );
        }), "header");

        const PurpleHeader = ({ children, ...rest }) => {
            return (
                <Box style={{ backgroundColor: "purple" }} {...rest}>
                    {children}
                </Box>
            );
        };

        return (
            <Tabs>
                <Tab>
                    <RedHeader>Mars</RedHeader>
                    <Content>
                        Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System (in adherence with the IAU's controversial 2006 definition of planet),
                        being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".[17][18] The latter refers
                        to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye.
                        [19] Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth.
                    </Content>
                </Tab>
                <Tab>
                    <BlueHeader>Jupiter</BlueHeader>
                    <Content>
                        Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half
                        times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has
                        been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be
                        bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.
                    </Content>
                </Tab>
                <Tab>
                    <PurpleHeader slot="header">Venus</PurpleHeader>
                    <Content>
                        Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.
                    </Content>
                </Tab>
            </Tabs>
        );
    })
    // .add("test", () => {
    //     const useTest = ({ children }) => {
    //         return useMemo(() => {
    //             console.log("** updated");

//             return children;
//         }, [children]);
//     };

//     const Comp1 = props => {
//         const children = useTest(props);

//         return (
//             <div>{children}</div>
//         );
//     };

//     const Comp2 = ({ children }) => {
//         return (
//             <div>{children}</div>
//         );
//     };

//     const Comp = () => {
//         const [state, setState] = useState(1);

//         const handleIncrement = () => {
//             setState(x => x + 1);
//         };

//         return (
//             <div>
//                 <Comp1>value:</Comp1>
//                 <Comp2>{state}</Comp2>
//                 <button type="button" onClick={handleIncrement}>increment</button>
//             </div>
//         );
//     };

    //     return (
    //         <Comp />
    //     );
    // })
    // TO REMOVE WHEN DONE
    .add("tab ref", () => {
        return (
            <Tabs>
                <Tab>
                    <Header
                        ref={node => {
                            if (!isNil(node)) {
                                console.log(node);
                            }
                        }}
                    >
                        Mars
                    </Header>
                    <Content>
                        Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System (in adherence with the IAU's controversial 2006 definition of planet),
                        being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".[17][18] The latter refers
                        to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye.
                        [19] Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth.
                    </Content>
                </Tab>
            </Tabs>
        );
    });
