import { CardType } from "@/types";

export const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits.match(/.{1,4}/g)?.join(" ") || "";
};

export const detectCardType = (cardNumber: string): CardType => {
  const digits = cardNumber.replace(/\s/g, "");

  if (/^4/.test(digits)) return "VISA";
  if (/^5[1-5]/.test(digits)) return "MASTERCARD";
  if (/^3[47]/.test(digits)) return "AMEX";

  return "UNKNOWN";
};

export const maskCardNumber = (cardNumber: string) => {
  const digits = cardNumber.replace(/\s/g, "");
  if (digits.length < 4) return "****";

  const last4 = digits.slice(-4);
  return `**** **** **** ${last4}`;
};