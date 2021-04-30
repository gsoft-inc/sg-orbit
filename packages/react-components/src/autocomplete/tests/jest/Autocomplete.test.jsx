import { Autocomplete } from "@react-components/autocomplete";
import { Item, Section } from "@react-components/collection";
import { Keys } from "@react-components/shared";
import { Text } from "@react-components/text";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createRef } from "react";
import userEvent from "@utils/userEvent";

/*
Behaviors
- when a query is entered, show the overlay (might be useless?)
- when a query matching existing values is entered, show the overlay with the matching values
- when a query matching no values is entered, show the overlay with a not found message
- when a query is cleared with backspaces, hide the overlay
- when a query is cleared with the clear button, hide the overlay

- when opened, clicking on a value select the value
- when opened, enter keypress on a value select the value
- when a value is selected, hide the overlay
- when a value is selected, the input value match the selected value

- when opening, the focus stay on the input
- on esc keypress, hide the overlay and focus the input

- when opened, down arrow keypress virtually focus the first value
- when opened, up arrow keypress virtually focus the last value

- when opened, home keypress virtually focus the first value
- when opened, end keypress virtually focus the last value

- when no value is selected, leaving the autocomplete without selecting a value clear the input
- when a value is selected, leaving the autocomplete without selecting a value reset the input with the selected value

- when opened, on tab keydown, close and select the next tabbable element
- when opened, on shift+tab keydown, close and select the previous tabbable element

Aria
- an autocomplete have the "combobox" role
- an autocomplete have an aria-haspopup attribute
- when opened, the autocomplete aria-expanded is "true"
- when opened, the autocomplete aria-controls match the overlay id

Api
- call onSearch when the query is updated
- call onSearch when the query is cleared
- call onSelectionChange when a value is selected
- call onOpenChange when the autocomplete overlay open
- call onOpenChange when the autocomplete overlay close

Refs
- classic refs
- calling the focus function on the select ref will focus the select trigger
*/

// ***** Behaviors *****

// test("when a query matching existing values is entered, show the overlay with the matching values", async () => {
//     const { getByTestId } = render(
//         <Autocomplete>
//             <Item key="earth">Earth</Item>
//             <Item key="jupiter">Jupiter</Item>
//             <Item key="mars">Mars</Item>
//         </Autocomplete>
//     );

//     act(() => {

//     });

//     // await waitFor(() => expect(getByTestId("earth-option")).toHaveAttribute("tabindex", "0"));
// });
