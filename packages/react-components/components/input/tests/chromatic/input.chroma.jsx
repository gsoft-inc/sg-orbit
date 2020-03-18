import { Button } from "@orbit-ui/react-button/src";
import { CloseIcon, MagnifierIcon } from "@orbit-ui/react-icons/src";
import { Input } from "@orbit-ui/react-input/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { isNil } from "lodash";

// TODO: variations doesn't make sense right now since error is also variations and are part of default & transparent stories.

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Input"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <div className="flex">
            <div className="flex">
                <div className="flex flex-column items-start">
                    <Input placeholder="Search..." />
                    <Input focus placeholder="Search..." />
                    <Input disabled placeholder="Search..." />
                    <Input placeholder="Search..." defaultValue="Obiwan" />
                    <Input focus placeholder="Search..." defaultValue="Obiwan" />
                    <Input disabled placeholder="Search..." defaultValue="Obiwan" />
                    <Input icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input focus icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input disabled icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input focus icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input disabled icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." />
                    <Input icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." />
                    <Input icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." />
                    <Input icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    <Input icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    <Input icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                </div>
                <div className="flex flex-column items-start">
                    <Input loading placeholder="Search..." />
                    <Input loading disabled placeholder="Search..." />
                    <Input loading disabled placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input loading focus icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input loading disabled icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input loading icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading focus icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading disabled icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." />
                    <Input loading icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." />
                    <Input loading icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." />
                    <Input loading icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-column items-start">
                    <Input error placeholder="Search..." />
                    <Input error focus placeholder="Search..." />
                    <Input error disabled placeholder="Search..." />
                    <Input error placeholder="Search..." defaultValue="Obiwan" />
                    <Input error focus placeholder="Search..." defaultValue="Obiwan" />
                    <Input error disabled placeholder="Search..." defaultValue="Obiwan" />
                    <Input error icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input error focus icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input error disabled icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input error icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input error focus icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input error disabled icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input error icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." />
                    <Input error icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." />
                    <Input error icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." />
                    <Input error icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    <Input error icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    <Input error icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                </div>
                <div className="flex flex-column items-start">
                    <Input loading error placeholder="Search..." />
                    <Input loading error disabled placeholder="Search..." />
                    <Input loading error disabled placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading error icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input loading error focus icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input loading error disabled icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input loading error icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading error focus icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading error disabled icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading error icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." />
                    <Input loading error icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." />
                    <Input loading error icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." />
                    <Input loading error icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading error icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading error icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                </div>
            </div>
        </div>
    )
    .add("transparent", () =>
        <div className="flex">
            <div className="flex">
                <div className="flex flex-column items-start">
                    <Input transparent placeholder="Search..." />
                    <Input transparent focus placeholder="Search..." />
                    <Input transparent disabled placeholder="Search..." />
                    <Input transparent placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent focus placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent disabled placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent focus icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent disabled icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent focus icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent disabled icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." />
                    <Input transparent icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." />
                    <Input transparent icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." />
                    <Input transparent icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    <Input transparent icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    <Input transparent icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                </div>
                <div className="flex flex-column items-start">
                    <Input loading transparent placeholder="Search..." />
                    <Input loading transparent disabled placeholder="Search..." />
                    <Input loading transparent disabled placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading transparent icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input loading transparent focus icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input loading transparent disabled icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input loading transparent icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading transparent focus icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading transparent disabled icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading transparent icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." />
                    <Input loading transparent icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." />
                    <Input loading transparent icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." />
                    <Input loading transparent icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading transparent icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    <Input loading transparent icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-column items-start">
                    <Input transparent className="success" placeholder="Search..." />
                    <Input transparent className="success" focus placeholder="Search..." />
                    <Input transparent className="success" disabled placeholder="Search..." />
                    <Input transparent className="success" placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent className="success" focus placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent className="success" disabled placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent className="success" icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent className="success" focus icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent className="success" disabled icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent className="success" icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent className="success" focus icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent className="success" disabled icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent className="success" icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." />
                    <Input transparent className="success" icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." />
                    <Input transparent className="success" icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." />
                    <Input transparent className="success" icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    <Input transparent className="success" icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    <Input transparent className="success" icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                </div>
                <div className="flex flex-column items-start">
                    <Input transparent loading className="success" placeholder="Search..." />
                    <Input transparent loading className="success" disabled placeholder="Search..." />
                    <Input transparent loading className="success" disabled placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent loading className="success" icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent loading className="success" focus icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent loading className="success" disabled icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent loading className="success" icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent loading className="success" focus icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent loading className="success" disabled icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent loading className="success" icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." />
                    <Input transparent loading className="success" icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." />
                    <Input transparent loading className="success" icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." />
                    <Input transparent loading className="success" icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent loading className="success" icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent loading className="success" icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-column items-start">
                    <Input transparent error placeholder="Search..." />
                    <Input transparent error focus placeholder="Search..." />
                    <Input transparent error disabled placeholder="Search..." />
                    <Input transparent error placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent error focus placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent error disabled placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent error icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent error focus icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent error disabled icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent error icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent error focus icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent error disabled icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent error icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." />
                    <Input transparent error icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." />
                    <Input transparent error icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." />
                    <Input transparent error icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    <Input transparent error icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    <Input transparent error icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                </div>
                <div className="flex flex-column items-start">
                    <Input transparent loading error placeholder="Search..." />
                    <Input transparent loading error disabled placeholder="Search..." />
                    <Input transparent loading error disabled placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent loading error icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent loading error focus icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent loading error disabled icon={<MagnifierIcon />} placeholder="Search..." />
                    <Input transparent loading error icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent loading error focus icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent loading error disabled icon={<MagnifierIcon />} placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent loading error icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." />
                    <Input transparent loading error icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." />
                    <Input transparent loading error icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." />
                    <Input transparent loading error icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent loading error icon={<MagnifierIcon />} focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    <Input transparent loading error icon={<MagnifierIcon />} disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                </div>
            </div>
        </div>
    )
    .add("variations", () =>
        <div style={{ width: "333px" }}>
            <Input fluid placeholder="Search..." />
            <Input fluid focus placeholder="Search..." />
            <Input fluid disabled placeholder="Search..." />
        </div>
    )
    .add("fluid", () =>
        <Input fluid placeholder="Search..." />
    )
    .add("size", () =>
        <div className="flex">
            <div className="flex flex-column">
                <Input size="small" placeholder="Search..." />
                <Input placeholder="Search..." />
                <Input size="large" placeholder="Search..." />
                <Input icon={<MagnifierIcon />} size="small" placeholder="Search..." />
                <Input icon={<MagnifierIcon />} placeholder="Search..." />
                <Input icon={<MagnifierIcon />} size="large" placeholder="Search..." />
                <Input icon={<MagnifierIcon />} iconPosition="left" size="small" placeholder="Search..." />
                <Input icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." />
                <Input icon={<MagnifierIcon />} iconPosition="left" size="large" placeholder="Search..." />
            </div>
            <div className="flex flex-column">
                <Input size="small" loading placeholder="Search..." />
                <Input loading placeholder="Search..." />
                <Input size="large" loading placeholder="Search..." />
                <Input size="small" iconPosition="left" loading placeholder="Search..." />
                <Input loading iconPosition="left" placeholder="Search..." />
                <Input size="large" iconPosition="left" loading placeholder="Search..." />
            </div>
        </div>
    );

function setRedBackground(element) {
    if (!isNil(element)) {
        element.classList.add("bg-red");
    }
}

stories("/button")
    .add("element", () =>
        <div className="flex">
            <Input button={<Button icon={<CloseIcon />} />} />
            <Input button={<Button icon={<CloseIcon />} className= "bg-red" />} />
            <Input button={<Button icon={<CloseIcon />} ref={setRedBackground} />} />
        </div>
    )
    .add("object", () =>
        <div className="flex">
            <Input button={{ icon: <CloseIcon /> }} />
            <Input button={{ icon: <CloseIcon />, className: "bg-red" }} />
            <Input button={{ icon: <CloseIcon />, ref: setRedBackground }} />
        </div>
    )
    .add("disabled", () =>
        <Input button={<Button icon={<CloseIcon />} />} disabled />
    )
    .add("loading", () =>
        <Input button={<Button icon={<CloseIcon />} />} loading />
    )
    .add("size", () =>
        <div className="flex items-end">
            <Input size="small" button={<Button icon={<CloseIcon />} />} />
            <Input button={<Button icon={<CloseIcon />} />} />
            <Input size="large" button={<Button icon={<CloseIcon />} />} />
        </div>
    );
