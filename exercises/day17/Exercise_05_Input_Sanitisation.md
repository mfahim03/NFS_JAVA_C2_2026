# D17 Exercise 05 — Input Sanitisation

## Goal

Explain and apply simple input sanitisation.

## Tasks

Create a small utility or helper method that can:

1. Trim leading/trailing spaces.
2. Convert empty strings to null where appropriate.
3. Remove control characters from simple text.
4. Normalise code-like fields if needed.

## Important

Do not use sanitisation to hide invalid input. Some input should still be rejected.

## Reflection

1. **Validation** checks whether a value satisfies the API's rules before it is accepted, such as a required asset tag or an allowed status.
2. **Sanitisation** makes harmless, predictable formatting changes to otherwise acceptable input, such as trimming surrounding whitespace.
3. An asset tag such as `  lap-2026-001  ` can be trimmed and normalised to `LAP-2026-001` before the duplicate check.
4. A blank asset tag or a name containing markup must be rejected by validation; sanitisation must not turn invalid data into apparently valid data.

`InputSanitizer` now trims text, converts blank input to `null`, removes control characters, collapses internal whitespace, and uses locale-independent uppercasing for code-like fields.
