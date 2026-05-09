export type Currency = "INR" | "USD";

export type PaymentStatus =
  | "IDLE"
  | "PROCESSING"
  | "SUCCESS"
  | "FAILED"
  | "TIMEOUT";

export type CardType = "VISA" | "MASTERCARD" | "AMEX" | "UNKNOWN";

export interface PaymentPayload {
  transactionId: string;
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  amount: number;
  currency: Currency;
}

export interface PaymentResponse {
  status: "success" | "failed";
  reason?: string;
}

export interface Transaction {
  transactionId: string;
  name: string;
  maskedCardNumber: string;
  expiry: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  timestamp: string;
  attempts: number;
  failureReason?: string;
}