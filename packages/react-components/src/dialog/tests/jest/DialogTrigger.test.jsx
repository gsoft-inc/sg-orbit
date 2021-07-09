import { Button } from "@react-components/button";
import { Content, Footer, Header } from "@react-components/placeholders";
import { Dialog, DialogTrigger } from "@react-components/dialog";
import { Heading } from "@react-components/heading";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

/*
Behaviors
- when dismissable is true, close the dialog on dismiss button click
- when dismissable is true, close the dialog on outside click
- when dismissable is true, close the dialog on esc keypress
- when dismissable is false, do not close the dialog on outside click
- when dismissable is false, close the dialog on esc keypress
- when the close function from render props is called, close the dialog
- when the close function from the context is called, close the dialog

Api
- when the dialog open, call onOpenChange
- call onOpenChange when the dismiss button is clicked
- call onOpenChange on outside click
- call onOpenChange on esc keypress
- when the close is called, call onOpenChange

Refs
- classic tests
*/

// ***** Behaviors *****

test("when dismissable is true, close the dialog on dismiss button click", async () => {
    const { getByLabelText, getByTestId } = render(
        <DialogTrigger dismissable>
            <Button data-testid="trigger">Trigger</Button>
            <Dialog data-testid="dialog">
                <Heading>Iconic Arecibo Observatory collapses</Heading>
                <Content>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse.</Content>
            </Dialog>
        </DialogTrigger>
    );

    act(() => {
        userEvent.click(getByTestId("trigger"));
    });

    await waitFor(() => expect());

    act(() => {
        userEvent.click(getByLabelText("Dismiss"));
    });
});
