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

Aria
- a dialog role attribute match the specified role
- a dialog aria-modal attribute value is "true"

- aria-labelledby blabla

*/

// ***** Behaviors *****
