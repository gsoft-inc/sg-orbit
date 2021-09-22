import { Div } from "@react-components/html";
import { Inline, Stack } from "@react-components/layout";
import { PasswordInput } from "@react-components/text-input";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/PasswordInput")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <PasswordInput aria-label="Label" />
            <PasswordInput disabled aria-label="Label"></PasswordInput>
            <PasswordInput readOnly aria-label="Label"></PasswordInput>
            <PasswordInput fluid aria-label="Label"></PasswordInput>
            <Div width="10%">
                <PasswordInput fluid aria-label="Label"></PasswordInput>
            </Div>
        </Stack>
    )
    .add("placeholder", () =>
        <Stack>
            <PasswordInput placeholder="What's your secret?" />
            <PasswordInput disabled placeholder="What's your secret?"></PasswordInput>
            <PasswordInput readOnly placeholder="What's your secret?"></PasswordInput>
            <PasswordInput fluid placeholder="What's your secret?"></PasswordInput>
            <Div width="10%">
                <PasswordInput fluid placeholder="What's your secret?"></PasswordInput>
            </Div>
        </Stack>
    )
    .add("value", () =>
        <Stack>
            <PasswordInput defaultValue="test123!" aria-label="Label" />
            <PasswordInput disabled defaultValue="test123!" aria-label="Label" />
            <PasswordInput readOnly defaultValue="test123!" aria-label="Label" />
            <Inline>
                <PasswordInput placeholder="What's your secret?" defaultValue="test123!" />
                <PasswordInput value="test123!" aria-label="Label" />
            </Inline>
            <PasswordInput fluid defaultValue="test123!" aria-label="Label"></PasswordInput>
            <Div width="10%">
                <PasswordInput fluid defaultValue="test123!" aria-label="Label"></PasswordInput>
            </Div>
        </Stack>
    )
    .add("states", () =>
        <Stack>
            <PasswordInput active placeholder="What's your secret?" />
            <Inline>
                <PasswordInput focus placeholder="What's your secret?" />
                <PasswordInput defaultValue="test123!" focus placeholder="What's your secret?" />
            </Inline>
            <Inline>
                <PasswordInput hover placeholder="What's your secret?" />
                <PasswordInput defaultValue="test123!" hover placeholder="What's your secret?" />
            </Inline>
            <Inline>
                <PasswordInput focus hover placeholder="What's your secret?" />
                <PasswordInput defaultValue="test123!" focus hover placeholder="What's your secret?" />
            </Inline>
            <PasswordInput disabled placeholder="What's your secret?" />
            <PasswordInput readOnly placeholder="What's your secret?" />
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <PasswordInput border="sunray-10" aria-label="Label" />
            <PasswordInput className="border-red" aria-label="Label" />
            <PasswordInput style={{ border: "1px solid red" }} aria-label="Label" />
        </Inline>
    );
