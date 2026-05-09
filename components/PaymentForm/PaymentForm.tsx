"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./PaymentForm.module.css";
import CardPreview from "../CardPreview/CardPreview";
import { detectCardType, formatCardNumber } from "@/utils/cardUtils";
import {
  validateAmount,
  validateCardNumber,
  validateCVV,
  validateExpiry,
  validateName,
} from "@/utils/validation";
import { Currency } from "@/types";
import { usePaymentStore } from "@/store/paymentStore";
import { usePayment } from "@/hooks/usePayment";
interface Props {
  name: string;
  setName: (val: string) => void;
  cardNumber: string;
  setCardNumber: (val: string) => void;
  expiry: string;
  setExpiry: (val: string) => void;
  cvv: string;
  setCvv: (val: string) => void;
  isFlipped: boolean;
  setIsFlipped: (val: boolean) => void;
}
export default function PaymentForm() {
  const { status } = usePaymentStore();
  const { pay } = usePayment();

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("INR");
const [isFlipped, setIsFlipped] = useState(false);
  const cardType = useMemo(() => detectCardType(cardNumber), [cardNumber]);

  const errors = useMemo(() => {
    return {
      name: validateName(name),
      cardNumber: validateCardNumber(cardNumber, cardType),
      expiry: validateExpiry(expiry),
      cvv: validateCVV(cvv, cardType),
      amount: validateAmount(amount),
    };
  }, [name, cardNumber, expiry, cvv, amount, cardType]);

  const isFormValid = useMemo(() => {
    return (
      !errors.name &&
      !errors.cardNumber &&
      !errors.expiry &&
      !errors.cvv &&
      !errors.amount
    );
  }, [errors]);

  const handleExpiryChange = (val: string) => {
    let digits = val.replace(/\D/g, "");

    if (digits.length > 4) digits = digits.slice(0, 4);

    if (digits.length >= 3) {
      digits = digits.slice(0, 2) + "/" + digits.slice(2);
    }

    setExpiry(digits);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    await pay({
      name,
      cardNumber,
      expiry,
      cvv,
      amount: Number(amount),
      currency,
    });
  };

  return (
    <div className={styles.wrapper}>
      

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Payment Gateway</h2>

        <div className={styles.field}>
          <label>Cardholder Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            aria-describedby="name-error"
          />
          {errors.name && (
            <p id="name-error" className={styles.error}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label>Card Number</label>
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="4242 4242 4242 4242"
            aria-describedby="card-error"
          />
          {errors.cardNumber && (
            <p id="card-error" className={styles.error}>
              {errors.cardNumber}
            </p>
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Expiry (MM/YY)</label>
            <input
              value={expiry}
              onChange={(e) => handleExpiryChange(e.target.value)}
              placeholder="MM/YY"
              aria-describedby="expiry-error"
            />
            {errors.expiry && (
              <p id="expiry-error" className={styles.error}>
                {errors.expiry}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label>CVV</label>
            <input
  value={cvv}
  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
  placeholder={cardType === "AMEX" ? "1234" : "123"}
  maxLength={cardType === "AMEX" ? 4 : 3}
  aria-describedby="cvv-error"
  onFocus={() => setIsFlipped(true)}
  onBlur={() => setIsFlipped(false)}
/>
            {errors.cvv && (
              <p id="cvv-error" className={styles.error}>
                {errors.cvv}
              </p>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Amount</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              aria-describedby="amount-error"
            />
            {errors.amount && (
              <p id="amount-error" className={styles.error}>
                {errors.amount}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || status === "PROCESSING"}
          className={styles.button}
        >
          {status === "PROCESSING" ? "Processing..." : "Pay Now"}
        </button>
      </form>
      <div className={styles.preview}>
        <CardPreview
  name={name}
  cardNumber={cardNumber}
  expiry={expiry}
  cardType={cardType}
  cvv={cvv}
  isFlipped={isFlipped}
/>
      </div>
    </div>
  );
}