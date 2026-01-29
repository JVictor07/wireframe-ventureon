
# Operation Detail — Sacado View

## Purpose (Product Intent)
Enable the Sacado to approve or reject an operation with confidence and clarity.

## Primary User
- Sacado

## Key Questions This Screen Must Answer
- What is this operation?
- Who is involved?
- What decision is expected from me?

## Layout & Components
- Header:
  - Operation ID
  - Status badge
- Section: Invoice Details
  - Supplier
  - Invoice number
  - Gross value
  - Due date
- Section: Financing Comparison (read-only)
  - Financier name
  - Rate (%)
  - Estimated net amount
  - Visual highlight of lowest rate
- Section: Operation History
  - Timeline with key events
- Actions:
  - Approve
  - Reject

## Visual Behavior
- Actions visible only for non-final states (visual only)
- Approve/Reject open confirmation modal
