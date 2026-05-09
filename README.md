# Payment Gateway UI (Next.js + TypeScript)

A mock Payment Gateway UI built using **Next.js (App Router)** and **TypeScript** without using any third-party payment SDKs (Stripe, Razorpay, PayPal, etc.).  
This project simulates a real payment flow including validation, payment lifecycle handling, retry logic, and transaction history persistence.

---

##  Features

###  Payment Form
- Cardholder Name
- Card Number (auto formatted: `4242 4242 4242 4242`)
- Expiry Date validation (MM/YY format, past dates rejected)
- CVV validation (3 digits, 4 digits for Amex)
- Amount input
- Currency selector (INR / USD)
- Real-time field validation
- Submit button disabled until form is valid

###  Card Handling
- Detect card type (Visa / Mastercard / Amex)
- Card preview updates live while typing
- Card flip animation when entering CVV (shows back side)

###  Payment Lifecycle States
- Idle
- Processing
- Success
- Failed
- Timeout

###  Gateway Simulation (API Route)
- `POST /api/pay`
- Random outcomes:
  - Success ~60%
  - Failed ~25% with reason message
  - Timeout simulation ~15% (delayed response)

###  Timeout Handling
- Frontend cancels request after 6 seconds using `AbortController`

###  Retry Logic
- Retry available for Failed or Timeout payments
- Maximum 3 attempts per transaction
- Attempt count shown to user
- Same transaction ID reused for retries (idempotency)

###  Transaction History
- Stores transactions with:
  - Transaction ID
  - Amount + Currency
  - Status
  - Timestamp
  - Attempts
- History persists using `localStorage`
- Clicking a transaction shows details in a modal

###  Responsive UI
- Works on mobile (375px) and desktop (1280px)

---

##  Tech Stack

- Next.js (App Router)
- TypeScript
- Zustand (state management)
- CSS Modules

---

## Folder Structure
app/
api/pay/route.ts
page.tsx
layout.tsx
globals.css

components/
PaymentForm/
CardPreview/
StatusScreen/
TransactionHistory/
TransactionModal/

hooks/
usePayment.ts

store/
paymentStore.ts

utils/
cardUtils.ts
validation.ts
uuid.ts

types/
index.ts
