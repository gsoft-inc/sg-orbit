import { Heading, Paragraph } from "@react-components/text";
import { Inline } from "@react-components/layout";
import { Link } from "@react-components/link";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createLinkTestSuite } from "./createLinkTestSuite";
import Launch from "./assets/launch.jpg";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Link"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

function Card() {
    return (
        <div>
            <Heading as="h2" size="lg">
                SpaceX delays launch of South Korean military satellite to perform rocket checks
            </Heading>
            <Paragraph>
                <img src={Launch} alt="Launch" />
            </Paragraph>
            <Paragraph>
                SpaceX postponed the upcoming launch of a South Korean military satellite Monday (July 13), due to hardware issues with the Falcon 9 rocket.
            </Paragraph>
        </div>
    );
}

createLinkTestSuite(<Link><img src={Launch} alt="Launch" /></Link>, stories("/image"));

createLinkTestSuite(<Link><Card /></Link>, stories("/card"));

stories()
    .add("styling", () =>
        <Inline>
            <Link className="border-red" href="#">
                <img src={Launch} alt="Launch" />
            </Link>
            <Link style={{ border: "1px solid red" }} href="#">
                <img src={Launch} alt="Launch" />
            </Link>
        </Inline>
    )
    .add("autofocus", () =>
        <Link autoFocus href="#">
            <img src={Launch} alt="Launch" />
        </Link>
    )
    .add("when disabled do not autofocus", () =>
        <Link disabled autoFocus href="#">
            <img src={Launch} alt="Launch" />
        </Link>
    )
    .add("autofocus with delay", () =>
        <Link autoFocus autoFocusDelay={50} href="#">
            <img src={Launch} alt="Launch" />
        </Link>
    );

