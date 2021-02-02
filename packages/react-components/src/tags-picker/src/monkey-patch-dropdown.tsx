import { Dropdown } from "semantic-ui-react";
import { invoke, size } from "lodash";
import keyboardKey from "keyboard-key";

// Monkey patch fixes:
//
// https://github.com/Semantic-Org/Semantic-UI-React/issues/3768
// Sadly, specifying "search" doesn't work for us since it renders the dropdown as a "combolist" instead of a "listbox" and it cause a
// whole new set of problems.
export class MonkeyPatchDropdown extends Dropdown {
    selectItemOnEnter = (e: any) => {
        const { search } = this.props;

        if (keyboardKey.getCode(e) !== keyboardKey.Enter) {
            return;
        }

        e.preventDefault();

        const optionSize = size((this as any).getMenuOptions());

        if (search && optionSize === 0) {
            return;
        }

        (this as any).makeSelectedItemActive(e);
        (this as any).closeOnChange(e);
        (this as any).clearSearchQuery();

        if (search) {
            invoke((this as any).searchRef.current, "focus");
        }
    }
}
