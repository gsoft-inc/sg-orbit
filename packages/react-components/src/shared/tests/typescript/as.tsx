import { Button } from "../../../button";
import { as } from "../../src";

interface RouterLinkProps {
    a: string;
    b?: boolean;
}

const RouterLink = (props: RouterLinkProps) => {
    console.log(props.a);
    console.log(props.b);

    return <div></div>;
};

const RouterButton = as(Button, RouterLink);

<RouterButton onClick={() => console.log("test")} a="a" b={false} >aa</RouterButton>;
