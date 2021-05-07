/*
Behaviors:
    - can only type numbers

    - when the input has no value and an incomplete date is typed, reset to an empty value on blur
    - when the input has no value and an invalid date is typed, reset to today's date - IS IT REALLY WHAT WE WANT? MAYBE EMPTY THE INPUT?

    - when the typed date is lower than the min date, reset the date to the min date value
    - when the typed date is greater than the max date, reset the date to the max date value

    - when a complete date is typed, convert the date to a read format on blur

    - when the input value has a valid date and receive focus, convert the date to an editable format

    - when the input value has a valid date and an incomplete date is typed, reset to the last valid date on blur
    - when the input value has a valid date and an invalid is typed, reset to the last valid date - TO IMPLEMENT, IT CURRENTLY RESET TO TODAY'S DATE

Api:
    - when the input value has a valid date and a new valid date is typed, call onDateChange with the new date
    - when the input value has a valid date and the date is cleared, call onDateChange with null
    - when the input value has a valid date and an incomplete date is typed, do not call onDateChange on date reset
    - when the input value has a valid date and an invalid date is typed, call onDateChange with the fallback date - MIGHT CHANGE IF WE FALLBACK TO AN EMPTY VALUE
    - when the input value has a valid date is focused then blured with the same date, do not call onDateChange

    - when the input has no value and a complete date is typed, call onDateChange with the new date
    - when the input has no value and an incomplete date is cleared, do not call onDateChange - NOT WORKING RIGHT NOW
    - when the input has no value and an invalid date is typed, call onDateChange with the fallback date - MIGHT CHANGE IF WE FALLBACK TO AN EMPTY VALUE

Refs:
    - Classic refs

*/

// ***** Behaviors *****



// ***** Api *****

// ***** Refs *****
