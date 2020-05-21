/* eslint-disable react/forbid-foreign-prop-types */

import { BaseMonkeyPatchSemanticDropdown, focusTriggerOnClosing } from "../../dropdown";
import { KEYS } from "../../shared";
import { isNil } from "lodash";

export class MonkeyPatchSemanticDropdown extends BaseMonkeyPatchSemanticDropdown {
    moveSelectionOnKeyDown = event => {
        const moves = {
            [KEYS.down]: 1,
            [KEYS.up]: -1
        };

        const move = moves[event.keyCode];

        if (isNil(move)) {
            return;
        }

        event.preventDefault();

        this.moveSelectionBy(move);

        // HACK: focus the selected item to enable enter keydown on links and buttons.
        setTimeout(() => {
            if (!isNil(this.ref.current)) {
                const selectedItemNode = this.ref.current.querySelector(".item.selected");

                if (!isNil(selectedItemNode)) {
                    selectedItemNode.focus();
                }
            }
        }, 0);
    }

    handleBlur = event => {
        const { closeOnBlur, selectOnBlur, onBlur } = this.props;

        // Do not "blur" when the mouse is down inside of the dropdown menu.
        if (this.isMouseDown) {
            return;
        }

        // HACK: do not blur if the new focused element is inside the dropdown.
        setTimeout(() => {
            if (!isNil(this.ref.current)) {
                if (!this.ref.current.contains(document.activeElement)) {
                    if (!isNil(onBlur)) {
                        onBlur(event, this.props);
                    }

                    if (selectOnBlur) {
                        this.makeSelectedItemActive(event);

                        if (closeOnBlur) {
                            this.close();
                        }
                    }

                    this.setState({ focus: false });
                    this.clearSearchQuery();
                }
            }
        }, 0);
    }

    // NOTE: doesn't work on FF because after tabbing out, document.activeElement is still the dropdown menu element instead of the body.
    // HACK: remove the prevent default on item enter keydown.
    selectItemOnEnter = event => {
        const { trigger } = this.props;

        if (event.keyCode === KEYS.enter) {
            focusTriggerOnClosing(trigger, this.ref);
        }
    }
}
