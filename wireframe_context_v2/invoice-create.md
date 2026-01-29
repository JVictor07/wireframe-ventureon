
# Invoice Creation (Pre-Operation)

## Purpose (Product Intent)
Register invoices that may later become risk sacado operations.

## IMPORTANT UI CONSTRAINT
- This screen does NOT create operations
- This screen does NOT trigger anticipation
- Data is purely mock

## Primary User
- Admin

## Layout & Components
- Form:
  - Select: Sacado
  - Select: Supplier
  - Input: Invoice number
  - Input: Invoice value
  - Input: Due date
- Action:
  - Save invoice (visual only)

## Visual Behavior
- Saving shows static confirmation
- No navigation side effects required
