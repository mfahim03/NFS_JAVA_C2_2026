# Exercise 04: Test Hardening Notes

The initial test draft covered blank text fields, payload trimming, and label formatting. The final tests were hardened by adding realistic invalid priority and status values that cannot enter the normal form through its select controls but could still reach the utility from restored or external data.

The assertions use complete input objects and verify returned validation messages or normalized payloads. They test the utility's public behaviour rather than its internal constants, branching, or implementation structure. Test names state the user-visible rule being protected, and each invalid-enum test checks only the relevant error so failures remain specific.
