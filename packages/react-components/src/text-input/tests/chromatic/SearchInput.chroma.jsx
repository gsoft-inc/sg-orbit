import { Inline, Stack } from "@react-components/layout";
import { MailIcon } from "@react-components/icons";
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
            <SearchInput />
            <SearchInput loading></SearchInput>
            <SearchInput disabled></SearchInput>
            <SearchInput readOnly></SearchInput>
            <div>
                <SearchInput fluid></SearchInput>
            </div>
            <div className="w-10">
                <SearchInput fluid></SearchInput>
            </div>
            <div>
                <SearchInput loading fluid></SearchInput>
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
            <SearchInput defaultValue="Mars" />
            <SearchInput loading defaultValue="Mars" />
            <SearchInput disabled defaultValue="Mars" />
            <SearchInput readOnly defaultValue="Mars" />
            <Inline>
                <SearchInput placeholder="Where to?" defaultValue="Mars" />
                <SearchInput value="Mars" />
            </Inline>
            <div>
                <SearchInput fluid defaultValue="Mars"></SearchInput>
            </div>
            <div className="w-10">
                <SearchInput fluid defaultValue="Mars"></SearchInput>
            </div>
            <div>
                <SearchInput loading fluid defaultValue="Mars"></SearchInput>
            </div>
        </Stack>
    )
    .add("custom icon", () =>
        <Stack>
            <SearchInput icon={<MailIcon />} placeholder="Where to?" />
            <SearchInput icon={<MailIcon />} defaultValue="SpaceX will win the race!" />
            <SearchInput loading icon={<MailIcon />} placeholder="Where to?" />
            <SearchInput disabled icon={<MailIcon />} placeholder="Where to?" />
            <SearchInput readOnly icon={<MailIcon />} placeholder="Where to?" />
            <div>
                <SearchInput fluid icon={<MailIcon />} placeholder="Where to?" />
            </div>
            <div className="w-10">
                <SearchInput fluid icon={<MailIcon />} placeholder="Where to?" />
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
