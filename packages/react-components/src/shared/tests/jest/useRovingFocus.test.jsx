/*
when not using a key
    - set 0 to first focusable element and -1 to all the others
    - do not set 0 to a disable element (try with first one being disabled)
    - can add a new element and will have -1
    - can remove an element
    - update tabIndex when focused element change

when not using a key
    - when key is null, set 0 to first focusable element and -1 to all the others
    - when key is not null, set 0 to element matching key and -1 to all the others
    - when key doesn't match any elementys, all elements have -1
    - can add a new element and will have -1
    - can remove an element
    - when key is updated, set 0 to new matching elements and -1 to all the others
    - do not update tabIndex when focused element change
*/
