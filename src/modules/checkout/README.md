# Checkout Module

Owns the simulated checkout flow and checkout success screen.

Import from `@/modules/checkout` outside this module. Checkout currently uses
local cart/order state only; it does not submit to a backend and must not store
real payment details.
