import { Button } from "@react-components/button";
import { InfoIcon } from "@react-components/icons";
import { PureMessage } from "@react-components/message";
import { cloneElement } from "react";
import { noop } from "lodash";

function Message({ element, ...rest }) {
    return cloneElement(element, rest);
}

Message.Icon = PureMessage.Icon;
Message.Button = PureMessage.Button;
Message.Content = PureMessage.Content;
Message.Header = PureMessage.Header;
Message.Item = PureMessage.Item;
Message.List = PureMessage.List;

export function createSharedStories(message, stories) {
    return stories
        .add("default", () =>
            <div>
                <Message size="small" element={message}>
                    Easily manage external sharing links and set-up automatic access reviews for entrusted group owners.
                </Message>
                <Message element={message}>
                    Easily manage external sharing links and set-up automatic access reviews for entrusted group owners.
                </Message>
                <Message size="large" element={message}>
                    Easily manage external sharing links and set-up automatic access reviews for entrusted group owners.
                </Message>
                <Message size="big" element={message}>
                    Easily manage external sharing links and set-up automatic access reviews for entrusted group owners.
                </Message>
            </div>
        )
        .add("header", () =>
            <div>
                <Message size="small" element={message}>
                    <Message.Header>Setup a security policy for external sharing</Message.Header>
                    <p>Easily manage external sharing links and set-up automatic access reviews for entrusted group owners.</p>
                </Message>
                <Message element={message}>
                    <Message.Header>Setup a security policy for external sharing</Message.Header>
                    <p>Easily manage external sharing links and set-up automatic access reviews for entrusted group owners.</p>
                </Message>
                <Message size="large" element={message}>
                    <Message.Header>Setup a security policy for external sharing</Message.Header>
                    <p>Easily manage external sharing links and set-up automatic access reviews for entrusted group owners.</p>
                </Message>
                <Message size="big" element={message}>
                    <Message.Header>Setup a security policy for external sharing</Message.Header>
                    <p>Easily manage external sharing links and set-up automatic access reviews for entrusted group owners.</p>
                </Message>
            </div>
        )
        .add("icon", () =>
            <div className="flex">
                <div className="w-100 mr5">
                    <Message columns size="small" element={message}>
                        <Message.Icon icon={<InfoIcon />} />
                        <Message.Content>We are fetching that content for you.</Message.Content>
                    </Message>
                    <Message columns element={message}>
                        <Message.Icon icon={<InfoIcon />} />
                        <Message.Content>We are fetching that content for you.</Message.Content>
                    </Message>
                    <Message columns size="large" element={message}>
                        <Message.Icon icon={<InfoIcon />} />
                        <Message.Content>We are fetching that content for you.</Message.Content>
                    </Message>
                    <Message columns size="big" element={message}>
                        <Message.Icon icon={<InfoIcon />} />
                        <Message.Content>We are fetching that content for you.</Message.Content>
                    </Message>
                </div>
                <div className="w-100">
                    <Message columns size="small" element={message}>
                        <Message.Content>We are fetching that content for you.</Message.Content>
                        <Message.Icon icon={<InfoIcon />} />
                    </Message>
                    <Message columns element={message}>
                        <Message.Content>We are fetching that content for you.</Message.Content>
                        <Message.Icon icon={<InfoIcon />} />
                    </Message>
                    <Message columns size="large" element={message}>
                        <Message.Content>We are fetching that content for you.</Message.Content>
                        <Message.Icon icon={<InfoIcon />} />
                    </Message>
                    <Message columns size="big" element={message}>
                        <Message.Content>We are fetching that content for you.</Message.Content>
                        <Message.Icon icon={<InfoIcon />} />
                    </Message>
                    <Message columns element={message}>
                        <Message.Content>Easily manage external sharing links and set-up automatic access reviews for entrusted group owners.</Message.Content>
                        <Message.Icon icon={<InfoIcon />} />
                    </Message>
                </div>
            </div>
        )
        .add("icon + header", () =>
            <div className="flex">
                <div className="w-100 mr5">
                    <Message columns size="small" element={message}>
                        <Message.Icon icon={<InfoIcon />} />
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                    </Message>
                    <Message columns element={message}>
                        <Message.Icon icon={<InfoIcon />} />
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                    </Message>
                    <Message columns size="large" element={message}>
                        <Message.Icon icon={<InfoIcon />} />
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                    </Message>
                    <Message columns size="big" element={message}>
                        <Message.Icon icon={<InfoIcon />} />
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                    </Message>
                </div>
                <div className="w-100">
                    <Message columns size="small" element={message}>
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                        <Message.Icon icon={<InfoIcon />} />
                    </Message>
                    <Message columns element={message}>
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                        <Message.Icon icon={<InfoIcon />} />
                    </Message>
                    <Message columns size="large" element={message}>
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                        <Message.Icon icon={<InfoIcon />} />
                    </Message>
                    <Message columns size="big" element={message}>
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                        <Message.Icon icon={<InfoIcon />} />
                    </Message>
                    <Message columns element={message}>
                        <Message.Content>
                            <Message.Header>Just one second we are setupping a security policy for external sharing</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                        <Message.Icon icon={<InfoIcon />} />
                    </Message>
                </div>
            </div>
        )
        .add("button", () =>
            <div className="flex">
                <div className="w-100 mr5">
                    <Message columns size="small" element={message}>
                        <Message.Button button={<Button>Click Here</Button>} />
                        <Message.Content>We are fetching that content for you.</Message.Content>
                    </Message>
                    <Message columns element={message}>
                        <Message.Button button={<Button>Click Here</Button>} />
                        <Message.Content>We are fetching that content for you.</Message.Content>
                    </Message>
                    <Message columns size="large" element={message}>
                        <Message.Button button={<Button>Click Here</Button>} />
                        <Message.Content>We are fetching that content for you.</Message.Content>
                    </Message>
                    <Message columns size="big" element={message}>
                        <Message.Button button={<Button>Click Here</Button>} />
                        <Message.Content>We are fetching that content for you.</Message.Content>
                    </Message>
                </div>
                <div className="w-100">
                    <Message columns size="small" element={message}>
                        <Message.Content>We are fetching that content for you.</Message.Content>
                        <Message.Button button={<Button>Click Here</Button>} />
                    </Message>
                    <Message columns element={message}>
                        <Message.Content>We are fetching that content for you.</Message.Content>
                        <Message.Button button={<Button>Click Here</Button>} />
                    </Message>
                    <Message columns size="large" element={message}>
                        <Message.Content>We are fetching that content for you.</Message.Content>
                        <Message.Button button={<Button>Click Here</Button>} />
                    </Message>
                    <Message columns size="big" element={message}>
                        <Message.Content>We are fetching that content for you.</Message.Content>
                        <Message.Button button={<Button>Click Here</Button>} />
                    </Message>
                    <Message columns element={message}>
                        <Message.Content>Easily manage external sharing links and set-up automatic access reviews for entrusted group owners.</Message.Content>
                        <Message.Button button={<Button>Click Here</Button>} />
                    </Message>
                </div>
            </div>
        )
        .add("button + header", () =>
            <div className="flex">
                <div className="w-100 mr5">
                    <Message columns size="small" element={message}>
                        <Message.Button button={<Button>Click Here</Button>} />
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                    </Message>
                    <Message columns element={message}>
                        <Message.Button button={<Button>Click Here</Button>} />
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                    </Message>
                    <Message columns size="large" element={message}>
                        <Message.Button button={<Button>Click Here</Button>} />
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                    </Message>
                    <Message columns size="big" element={message}>
                        <Message.Button button={<Button>Click Here</Button>} />
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                    </Message>
                </div>
                <div className="w-100">
                    <Message columns size="small" element={message}>
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                        <Message.Button button={<Button>Click Here</Button>} />
                    </Message>
                    <Message columns element={message}>
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                        <Message.Button button={<Button>Click Here</Button>} />
                    </Message>
                    <Message columns size="large" element={message}>
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                        <Message.Button button={<Button>Click Here</Button>} />
                    </Message>
                    <Message columns size="big" element={message}>
                        <Message.Content>
                            <Message.Header>Just one second</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                        <Message.Button button={<Button>Click Here</Button>} />
                    </Message>
                    <Message columns element={message}>
                        <Message.Content>
                            <Message.Header>Just one second we are setupping a security policy for external sharing</Message.Header>
                            <p>We are fetching that content for you.</p>
                        </Message.Content>
                        <Message.Button button={<Button>Click Here</Button>} />
                    </Message>
                </div>
            </div>
        )
        .add("floating", () =>
            <div>
                <Message floating size="small" element={message}>
                    We are fetching that content for you.
                </Message>
                <Message floating element={message}>
                    We are fetching that content for you.
                </Message>
                <Message floating size="large" element={message}>
                    We are fetching that content for you.
                </Message>
                <Message floating size="big" element={message}>
                    We are fetching that content for you.
                </Message>
            </div>
        )
        .add("compact", () =>
            <div>
                <div className="mb5">
                    <Message compact size="small" element={message}>
                        We are fetching that content for you.
                    </Message>
                </div>
                <div className="mb5">
                    <Message compact element={message}>
                        We are fetching that content for you.
                    </Message>
                </div>
                <div className="mb5">
                    <Message compact size="large" element={message}>
                        We are fetching that content for you.
                    </Message>
                </div>
                <div>
                    <Message compact size="big" element={message}>
                        We are fetching that content for you.
                    </Message>
                </div>
            </div>
        )
        .add("list", () =>
            <div>
                <Message size="small" element={message}>
                    <Message.List>
                        <Message.Item>You can now have cover images on blog pages</Message.Item>
                        <Message.Item>Drafts will now auto-save while writing</Message.Item>
                    </Message.List>
                </Message>
                <Message element={message}>
                    <Message.List>
                        <Message.Item>You can now have cover images on blog pages</Message.Item>
                        <Message.Item>Drafts will now auto-save while writing</Message.Item>
                    </Message.List>
                </Message>
                <Message size="large" element={message}>
                    <Message.List>
                        <Message.Item>You can now have cover images on blog pages</Message.Item>
                        <Message.Item>Drafts will now auto-save while writing</Message.Item>
                    </Message.List>
                </Message>
                <Message size="big" element={message}>
                    <Message.List>
                        <Message.Item>You can now have cover images on blog pages</Message.Item>
                        <Message.Item>Drafts will now auto-save while writing</Message.Item>
                    </Message.List>
                </Message>
            </div>
        )
        .add("list + header", () =>
            <div>
                <Message size="small" element={message}>
                    <Message.Header>New Site Features</Message.Header>
                    <Message.List>
                        <Message.Item>You can now have cover images on blog pages</Message.Item>
                        <Message.Item>Drafts will now auto-save while writing</Message.Item>
                    </Message.List>
                </Message>
                <Message element={message}>
                    <Message.Header>New Site Features</Message.Header>
                    <Message.List>
                        <Message.Item>You can now have cover images on blog pages</Message.Item>
                        <Message.Item>Drafts will now auto-save while writing</Message.Item>
                    </Message.List>
                </Message>
                <Message size="large" element={message}>
                    <Message.Header>New Site Features</Message.Header>
                    <Message.List>
                        <Message.Item>You can now have cover images on blog pages</Message.Item>
                        <Message.Item>Drafts will now auto-save while writing</Message.Item>
                    </Message.List>
                </Message>
                <Message size="big" element={message}>
                    <Message.Header>New Site Features</Message.Header>
                    <Message.List>
                        <Message.Item>You can now have cover images on blog pages</Message.Item>
                        <Message.Item>Drafts will now auto-save while writing</Message.Item>
                    </Message.List>
                </Message>
            </div>
        )
        .add("dismissible", () =>
            <div className="flex">
                <div className="w-100 mr5">
                    <Message onDismiss={noop} size="small" element={message}>
                        We are fetching that content for you.
                    </Message>
                    <Message onDismiss={noop} element={message}>
                        We are fetching that content for you.
                    </Message>
                    <Message onDismiss={noop} size="large" element={message}>
                        We are fetching that content for you.
                    </Message>
                    <Message onDismiss={noop} size="big" element={message}>
                        We are fetching that content for you.
                    </Message>
                </div>
                <div className="w-100">
                    <div className="mb5">
                        <Message compact onDismiss={noop} size="small" element={message}>
                            We are fetching that content for you.
                        </Message>
                    </div>
                    <div className="mb5">
                        <Message compact onDismiss={noop} element={message}>
                            We are fetching that content for you.
                        </Message>
                    </div>
                    <div className="mb5">
                        <Message compact onDismiss={noop} size="large" element={message}>
                            We are fetching that content for you.
                        </Message>
                    </div>
                    <div>
                        <Message compact onDismiss={noop} size="big" element={message}>
                            We are fetching that content for you.
                        </Message>
                    </div>
                </div>
            </div>
        );
}
