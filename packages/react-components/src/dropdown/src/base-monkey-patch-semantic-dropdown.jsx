import { KEYS } from "../../shared";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { isFunction, isNil } from "lodash";

export function focusTriggerOnClosing(trigger, ref) {
    if (!isNil(trigger)) {
        // HACK: when closing the dropdown menu, make sure the focus is on the trigger.
        setTimeout(() => {
            if (!isNil(ref.current)) {
                const firstChild = ref.current.firstChild;

                if (!isNil(firstChild) && isFunction(firstChild.focus)) {
                    firstChild.focus();
                }
            }
        }, 0);
    } else {
        // HACK: if there is not trigger, focus the dropdown menu itself.
        setTimeout(() => {
            if (!isNil(ref.current)) {
                ref.current.focus();
            }
        }, 0);
    }
}

export class BaseMonkeyPatchSemanticDropdown extends SemanticDropdown {
    closeOnEscape = event => {
        const { trigger, closeOnEscape } = this.props;

        if (closeOnEscape) {
            if (event.keyCode === KEYS.esc) {
                event.preventDefault();

                this.close(event);

                setTimeout(() => {
                    focusTriggerOnClosing(trigger, this.ref);
                }, 0);
            }
        }
    }
}
