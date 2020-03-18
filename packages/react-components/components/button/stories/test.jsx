import { Button } from "@orbit-ui/react-button/src";
import { createRef } from "react";

export function Test() {
    const theRef = createRef();

    setTimeout(() => {
        console.log(theRef);
    }, 500);

    return (
        <Button ref={theRef}>Hey!</Button>
    );
}
