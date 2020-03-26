import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { createDropdownItem } from "./item";
import { isFunction } from "lodash";

function createItem({ factory, ...rest }) {
    const itemFactory = isFunction(factory) ? factory : createDropdownItem;

    return itemFactory(rest);
}

SemanticDropdown.Item.create = createItem;
