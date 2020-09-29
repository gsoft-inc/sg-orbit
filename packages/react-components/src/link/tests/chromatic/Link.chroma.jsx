import { Heading, Paragraph } from "@react-components/text";
import { Image } from "@react-components/image";
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

function LaunchImage() {
    return (
        <Image width="325" height="216" src={Launch} alt="SpaceX Launch" />
    );
}

function Card() {
    return (
        <div>
            <Heading as="h2" size="lg">
                SpaceX delays launch of South Korean military satellite
            </Heading>
            <Paragraph>
                SpaceX postponed the upcoming launch of a South Korean military satellite Monday (July 13), due to hardware issues with the Falcon 9 rocket.
            </Paragraph>
        </div>
    );
}

createLinkTestSuite(<Link><LaunchImage /></Link>, stories("/image"))
    .add("rounded", () =>
        <Link shape="rounded" focus href="#">
            <Image shape="rounded" width="100" height="100" src={Launch} alt="SpaceX Launch" />
        </Link>
    )
    .add("circular", () =>
        <Link shape="circular" focus href="#">
            <Image shape="circular" width="100" height="100" src={Launch} alt="SpaceX Launch" />
        </Link>
    )
    .add("box", () =>
        <Link shape="box" focus href="#">
            <Image width="100" height="100" src={Launch} alt="SpaceX Launch" />
        </Link>
    );

createLinkTestSuite(<Link><Card /></Link>, stories("/card"));

stories()
    .add("styling", () =>
        <Inline>
            <Link className="border-red" href="#">
                <LaunchImage />
            </Link>
            <Link style={{ border: "1px solid red" }} href="#">
                <LaunchImage />
            </Link>
        </Inline>
    )
    .add("autofocus", () =>
        <Link autoFocus href="#">
            <LaunchImage />
        </Link>
    )
    .add("when disabled do not autofocus", () =>
        <Link disabled autoFocus href="#">
            <LaunchImage />
        </Link>
    )
    .add("autofocus with delay", () =>
        <Link autoFocus autoFocusDelay={50} href="#">
            <LaunchImage />
        </Link>
    );

