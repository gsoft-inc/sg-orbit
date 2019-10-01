import { CLEAR_BUTTON_ID, RESULT_ID, TEXTBOX_ID } from "./shared";
import { SearchInput, searchInputResult } from "@orbit-ui/react-search-input/src";
import { fireEvent, render, wait, waitForElement } from "@testing-library/react";
import { noop } from "lodash";
import userEvent from "@testing-library/user-event";
