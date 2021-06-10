import { EmailIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { SearchInput } from "@react-components/text-input";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/SearchInput")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <SearchInput aria-label="Label" />
            <SearchInput loading aria-label="Label"></SearchInput>
            <SearchInput disabled aria-label="Label"></SearchInput>
            <SearchInput readOnly aria-label="Label"></SearchInput>
            <div>
                <SearchInput fluid aria-label="Label"></SearchInput>
            </div>
            <div className="w-10">
                <SearchInput fluid aria-label="Label"></SearchInput>
            </div>
            <div>
                <SearchInput loading fluid aria-label="Label"></SearchInput>
            </div>
        </Stack>
    )
    .add("placeholder", () =>
        <Stack>
            <SearchInput placeholder="Where to?" />
            <SearchInput loading placeholder="Where to?" />
            <SearchInput disabled placeholder="Where to?"></SearchInput>
            <SearchInput readOnly placeholder="Where to?"></SearchInput>
            <div>
                <SearchInput fluid placeholder="Where to?"></SearchInput>
            </div>
            <div className="w-10">
                <SearchInput fluid placeholder="Where to?"></SearchInput>
            </div>
            <div>
                <SearchInput loading fluid placeholder="Where to?"></SearchInput>
            </div>
        </Stack>
    )
    .add("value", () =>
        <Stack>
            <SearchInput defaultValue="Mars" aria-label="Label" />
            <SearchInput loading defaultValue="Mars" aria-label="Label" />
            <SearchInput disabled defaultValue="Mars" aria-label="Label" />
            <SearchInput readOnly defaultValue="Mars" aria-label="Label" />
            <Inline>
                <SearchInput placeholder="Where to?" defaultValue="Mars" />
                <SearchInput value="Mars" />
            </Inline>
            <div>
                <SearchInput fluid defaultValue="Mars" aria-label="Label"></SearchInput>
            </div>
            <div className="w-10">
                <SearchInput fluid defaultValue="Mars" aria-label="Label"></SearchInput>
            </div>
            <div>
                <SearchInput loading fluid defaultValue="Mars" aria-label="Label"></SearchInput>
            </div>
        </Stack>
    )
    .add("custom icon", () =>
        <Stack>
            <SearchInput icon={<EmailIcon />} placeholder="Where to?" aria-label="Label" />
            <SearchInput icon={<EmailIcon />} defaultValue="SpaceX will win the race!" aria-label="Label" />
            <SearchInput loading icon={<EmailIcon />} placeholder="Where to?" />
            <SearchInput disabled icon={<EmailIcon />} placeholder="Where to?" />
            <SearchInput readOnly icon={<EmailIcon />} placeholder="Where to?" />
            <div>
                <SearchInput fluid icon={<EmailIcon />} placeholder="Where to?" />
            </div>
            <div className="w-10">
                <SearchInput fluid icon={<EmailIcon />} placeholder="Where to?" />
            </div>
        </Stack>
    )
    .add("no icon", () =>
        <Stack>
            <SearchInput icon={null} placeholder="Where to?" />
            <SearchInput icon={null} defaultValue="SpaceX will win the race!" />
            <SearchInput loading icon={null} placeholder="Where to?" />
            <SearchInput disabled icon={null} placeholder="Where to?" />
            <SearchInput readOnly icon={null} placeholder="Where to?" />
            <div>
                <SearchInput fluid icon={null} placeholder="Where to?" />
            </div>
            <div className="w-10">
                <SearchInput fluid icon={null} placeholder="Where to?" />
            </div>
        </Stack>
    )
    .add("states", () =>
        <Stack>
            <SearchInput active placeholder="Where to?" />
            <Inline>
                <SearchInput focus placeholder="Where to?" />
                <SearchInput defaultValue="Mars" focus placeholder="Where to?" />
                <SearchInput loading defaultValue="Mars" focus placeholder="Where to?" />
            </Inline>
            <Inline>
                <SearchInput hover placeholder="Where to?" />
                <SearchInput defaultValue="Mars" hover placeholder="Where to?" />
                <SearchInput loading defaultValue="Mars" hover placeholder="Where to?" />
            </Inline>
            <Inline>
                <SearchInput focus hover placeholder="Where to?" />
                <SearchInput defaultValue="Mars" focus hover placeholder="Where to?" />
                <SearchInput loading defaultValue="Mars" focus hover placeholder="Where to?" />
            </Inline>
            <SearchInput disabled placeholder="Where to?" />
            <SearchInput readOnly placeholder="Where to?" />
        </Stack>
    );
