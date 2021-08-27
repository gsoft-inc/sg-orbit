import { Button } from "../../../button";
import { as } from "../../src";

interface RouterLinkProps {
    a: string;
    b?: boolean;
}

const RouterLink = (props: RouterLinkProps) => {
    return <div>{props.b && props.a}</div>;
};

const RouterButton = as(Button, RouterLink);

// eslint-disable-next-line @typescript-eslint/no-empty-function
<RouterButton onClick={() => {}} a="a" b={false} >aa</RouterButton>;
