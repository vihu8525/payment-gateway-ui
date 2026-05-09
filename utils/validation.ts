import { CardType } from "@/types";

export const validateName = (name: string) => {
  if (!name.trim()) return "Cardholder name is required";
  if (name.trim().length < 3) return "Name must be at least 3 characters";
  return "";
};

export const validateCardNumber = (cardNumber: string, cardType: CardType) => {
  const digits = cardNumber.replace(/\s/g, "");

  if (!digits) return "Card number is required";

  if (cardType === "AMEX") {
    if (digits.length !== 15) return "Amex card must be 15 digits";
  } else {
    if (digits.length !== 16) return "Card must be 16 digits";
  }

  return "";
};

export const validateExpiry = (expiry: string) => {
  if (!expiry.trim()) return "Expiry date is required";

  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return "Expiry must be in MM/YY format";

  const month = Number(match[1]);
  const year = Number("20" + match[2]);

  if (month < 1 || month > 12) return "Invalid month";

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (year < currentYear) return "Card is expired";
  if (year === currentYear && month < currentMonth) return "Card is expired";

  return "";
};

export const validateCVV = (cvv: string, cardType: CardType) => {
  const digits = cvv.replace(/\D/g, "");

  if (!digits) return "CVV is required";

  if (cardType === "AMEX") {
    if (digits.length !== 4) return "Amex CVV must be 4 digits";
  } else {
    if (digits.length !== 3) return "CVV must be 3 digits";
  }

  return "";
};

export const validateAmount = (amount: string) => {
  if (!amount.trim()) return "Amount is required";

  const num = Number(amount);
  if (isNaN(num)) return "Amount must be a number";
  if (num <= 0) return "Amount must be greater than 0";

  return "";
};