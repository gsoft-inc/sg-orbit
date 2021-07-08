import { Dialog } from "@react-components/dialog";
import { act, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";

/*
Behaviors
- when an element is manually autofocus, keep the focus on this element
- when no element is focused, autofocus the first focusable element
- when no element is focused and there are no focusablement element, autofocus the dialog element
- do not autofocus the dismiss button
- do not autofocus an anchor element
- clicking on the dismiss button close the dialog

Api
- call onOpenChange when the dismiss button is clicked

Aria
-
- a dialog role attribute match the specified role
- a dialog aria-modal attribute value is "true"
- when an aria-label and an aria-labelledby are provided, do not set aria-labelledby on the dialog
- when an aria-labelledby is provided, the dialog aria-labelledby attribute value match the provided value
- when no aria-label or aria-labelledby are provided, the dialog aria-labelledby attribute value match the heading id
- when an id is provided, the dialog id attribute match the provided id value.

Ref
- classic refs

*/

// ***** Behaviors *****
