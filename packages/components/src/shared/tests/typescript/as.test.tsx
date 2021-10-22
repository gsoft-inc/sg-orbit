import { Button } from "@components/button";
import { ComponentProps } from "react";
import { Div } from "@components/html";
import { as } from "@components/shared";
import { expectAssignable } from "@typescript/tests";

interface RouterLinkProps {
    a: string;
    b?: boolean;
}

const RouterLink = (props: RouterLinkProps) => {
    return <Div>{props.b && props.a}</Div>;
};

const RouterButton = as(Button, RouterLink);

type RouterButtonProps = ComponentProps<typeof RouterButton>;

expectAssignable<RouterButtonProps>({ variant: "secondary", a: "a", b: false, children: null });

// @ts-expect-error
expectAssignable<RouterButtonProps>({ c: "c", children: null });
