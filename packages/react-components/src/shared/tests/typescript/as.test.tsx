import { Button } from "@react-components/button";
import { ComponentProps } from "react";
import { as } from "@react-components/shared";
import { expectAssignable } from "@typescript/tests";

interface RouterLinkProps {
    a: string;
    b?: boolean;
}

const RouterLink = (props: RouterLinkProps) => {
    return <div>{props.b && props.a}</div>;
};

const RouterButton = as(Button, RouterLink);

type RouterButtonProps = ComponentProps<typeof RouterButton>;

expectAssignable<RouterButtonProps>({ variant: "solid", a: "a", b: false, children: null });

// @ts-expect-error
expectAssignable<RouterButtonProps>({ c: "c", children: null });
