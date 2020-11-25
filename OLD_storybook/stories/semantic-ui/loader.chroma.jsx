import { Dimmer, Image, Loader, Segment } from "semantic-ui-react";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Loader"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <div className="flex flex-column">
            <div className="mb5">
                <Segment>
                    <Dimmer active>
                        <Loader />
                    </Dimmer>
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Segment>
            </div>
            <div>
                <Segment>
                    <Dimmer active>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Segment>
            </div>
        </div>
    )
    .add("size", () =>
        <div className="flex">
            <div className="flex flex-column mr5">
                <div className="mb5">
                    <Segment>
                        <Dimmer active>
                            <Loader size="mini">Loading</Loader>
                        </Dimmer>
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    </Segment>
                </div>
                <div className="mb5">
                    <Segment>
                        <Dimmer active>
                            <Loader size="tiny">Loading</Loader>
                        </Dimmer>
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    </Segment>
                </div>
                <div className="mb5">
                    <Segment>
                        <Dimmer active>
                            <Loader size="small">Loading</Loader>
                        </Dimmer>
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    </Segment>
                </div>
                <div className="mb5">
                    <Segment>
                        <Dimmer active>
                            <Loader size="medium">Loading</Loader>
                        </Dimmer>
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    </Segment>
                </div>
                <div>
                    <Segment>
                        <Dimmer active>
                            <Loader size="large">Loading</Loader>
                        </Dimmer>
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    </Segment>
                </div>
            </div>
            <div className="flex flex-column">
                <div className="mb5">
                    <Segment>
                        <Dimmer active>
                            <Loader size="big">Loading</Loader>
                        </Dimmer>
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    </Segment>
                </div>
                <div className="mb5">
                    <Segment>
                        <Dimmer active>
                            <Loader size="huge">Loading</Loader>
                        </Dimmer>
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    </Segment>
                </div>
                <div>
                    <Segment>
                        <Dimmer active>
                            <Loader size="massive">Loading</Loader>
                        </Dimmer>
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    </Segment>
                </div>
            </div>
        </div>
    )
    .add("disabled", () =>
        <Segment>
            <Loader disabled />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
    )
    .add("inverted", () =>
        <div className="flex flex-column w-50">
            <div className="mb5">
                <Segment>
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Segment>
            </div>
            <div>
                <Segment inverted>
                    <Loader active inverted />
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Segment>
            </div>
        </div>
    );
