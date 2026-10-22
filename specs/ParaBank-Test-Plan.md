# ParaBank Application Test Plan

## 1. Purpose

Define functional and regression coverage for the ParaBank online-banking application used by this Playwright project.

- **Application:** [ParaBank demo](https://parabank.parasoft.com/parabank)
- **Primary browser entry point:** `https://parabank.parasoft.com/parabank/index.htm`
- **Automation framework:** Playwright Test with page objects and fixtures
- **Seed file:** `tests/seed.spec.ts`

This plan was based on exploration of the public home/login screen and authenticated account overview, open-account, transfer, bill-pay, transaction-search, profile-update, loan-request, registration, and customer-lookup pages.

## 2. Scope

### In scope

- Customer login, logout, registration, and login recovery
- Account overview, new-account creation, and account-opening validation
- Funds transfer and bill payment, including balance and transaction verification
- Transaction search by supported criteria
- Customer contact-profile updates
- Loan request submission and validation
- Navigation, session state, and access to authenticated pages

### Out of scope

- Parasoft marketing pages and external Products/Locations links
- Backend/API behavior not observable through the browser
- Load, penetration, and other non-functional testing

## 3. Test environment and data

- Run against the ParaBank demo environment; its data may be shared, reset, or changed independently of this project.
- Keep credentials and customer data in test configuration/fixtures rather than hardcoding them in test cases.
- Use a unique username for registration and isolated accounts for any test that creates an account, transfers funds, pays a bill, or updates a profile.
- Do not run tests that mutate the same shared account concurrently. Verify balances and transaction history before and after each financial operation.
- Prefer a controlled test customer for repeatable regression runs. Treat demo-account credentials and balances as environment-dependent.
- The current Playwright configuration defines Chromium, Firefox, and WebKit projects. Prioritize Chromium smoke coverage, then run stable functional coverage across the configured browsers.

## 4. Test cases

Priority: **P0** = critical path, **P1** = important functional coverage, **P2** = useful validation/edge coverage.

### A. Customer access and registration

| ID | Priority | Test | Steps and expected results |
|---|---|---|---|
| ACC-01 | P0 | Valid login and logout | Submit valid customer credentials. Verify redirect to Accounts Overview, customer welcome message, and account services. Log out and verify return to the public login page. |
| ACC-02 | P1 | Invalid login | Try an unknown username and an incorrect password. Verify access is denied, an error is displayed, and account overview remains inaccessible. |
| ACC-03 | P1 | Registration required fields | Submit registration with required fields missing. Verify registration is blocked and relevant validation feedback is displayed. |
| ACC-04 | P1 | Registration password confirmation | Complete registration details with mismatched Password and Confirm values. Verify registration is blocked and the mismatch is reported. |
| ACC-05 | P1 | Successful registration | Register with complete customer data and a unique username. Verify a success/welcome state and that the new credentials can log in. |
| ACC-06 | P2 | Customer login recovery | Submit matching customer details on Customer Lookup, then try non-matching details. Verify appropriate feedback without exposing credentials for an invalid lookup. |

### B. Accounts

| ID | Priority | Test | Steps and expected results |
|---|---|---|---|
| ACCNT-01 | P0 | Accounts overview | Log in and open Accounts Overview. Verify each account's balance and available amount, the total, and navigation from an account to its transaction details. |
| ACCNT-02 | P1 | Open a new account | Select an account type and eligible funding account, then submit. Verify a success confirmation/account number, and verify the new account and funding effect in Accounts Overview. |
| ACCNT-03 | P1 | New-account validation | Inspect the available account types and funding accounts; submit invalid or missing required selections where possible. Verify no account is created and any opening-deposit requirement is enforced with clear feedback. |

### C. Payments and transfers

| ID | Priority | Test | Steps and expected results |
|---|---|---|---|
| PAY-01 | P0 | Transfer between accounts | Enter a valid amount and distinct source/destination accounts. Verify confirmation, equal and opposite balance changes, and corresponding transaction history. |
| PAY-02 | P1 | Transfer validation | Try blank, zero, negative, non-numeric, and over-available-balance amounts; try the same account as source and destination if selectable. Verify invalid transfers do not change balances and actionable feedback is shown. |
| PAY-03 | P0 | Successful bill payment | Enter complete payee details, matching account numbers, a valid amount, and a funding account. Verify confirmation, appropriate balance change, and a payment transaction. |
| PAY-04 | P1 | Bill-payment validation | Try incomplete payee details, mismatched account numbers, invalid amounts, and an amount above the available balance. Verify the payment is rejected, errors are visible, and no balance or transaction changes occur. |

### D. Transactions, profile, and loans

| ID | Priority | Test | Steps and expected results |
|---|---|---|---|
| FUNC-01 | P1 | Find transactions | Search by transaction ID, date, date range, and amount using known transaction data. Verify matching transaction details and a clear empty state when no transactions match. |
| FUNC-02 | P2 | Transaction search validation | Search with malformed dates, an inverted date range, a non-numeric amount, and an unknown ID. Verify safe validation/no-results behavior and no unrelated account data. |
| FUNC-03 | P1 | Update contact information | Change permitted contact fields and submit. Verify success feedback and persistence after navigating away and returning; unchanged values remain intact. |
| FUNC-04 | P1 | Submit loan request | Submit a valid loan amount, down payment, and funding account. Verify an approval/denial result and that the displayed request details are correct. |
| FUNC-05 | P1 | Loan request validation | Try blank, non-numeric, zero, negative, and down-payment-greater-than-loan values. Verify invalid requests are not submitted and no unintended account balance change occurs. |

### E. Navigation and session

| ID | Priority | Test | Steps and expected results |
|---|---|---|---|
| NAV-01 | P1 | Account-services navigation | From an authenticated page, open each Account Services destination. Verify the corresponding page heading and required form/table load. |
| NAV-02 | P1 | Protected-page session behavior | Log out, then navigate directly to an authenticated account page. Verify unauthenticated users cannot access customer account data. |

## 5. Suggested execution order

1. **Smoke (P0):** ACC-01, ACCNT-01, PAY-01, PAY-03.
2. **Sanity (P1):** Registration and recovery, account opening, validation cases, transaction search, profile update, loan request, navigation, and session protection.
3. **Cross-browser regression:** Run stable non-mutating cases in Chromium, Firefox, and WebKit. Run state-changing cases serially with isolated test data.

## 6. Current project coverage observations

- Existing tests include basic login and registration scenarios.
- `tests/tcopenaccount.spec.js` and `tests/tcoverview.spec.js` are placeholders rather than functional assertions.
- The plan adds coverage for the observed banking workflows and negative validation paths not represented in the current test suite.
