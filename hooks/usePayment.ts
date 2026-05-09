import { usePaymentStore } from "@/store/paymentStore";
import { PaymentPayload, Transaction } from "@/types";
import { maskCardNumber } from "@/utils/cardUtils";
import { generateTransactionId } from "@/utils/uuid";
export const usePayment = () => {
  const {
    status,
    setStatus,
    addOrUpdateTransaction,
    currentTransactionId,
    setTransactionId,
  } = usePaymentStore();

  const pay = async (payload: Omit<PaymentPayload, "transactionId">) => {
    let transactionId = currentTransactionId;

    if (!transactionId) {
     transactionId = generateTransactionId();
      setTransactionId(transactionId);
    }

    setStatus("PROCESSING");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 6000);

    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          transactionId,
          ...payload,
        }),
      });

      clearTimeout(timeoutId);

      const data = await res.json();

      const oldTxn = usePaymentStore
        .getState()
        .transactions.find((t) => t.transactionId === transactionId);

      const attempts = oldTxn ? oldTxn.attempts + 1 : 1;

      const txn: Transaction = {
        transactionId,
        name: payload.name,
        maskedCardNumber: maskCardNumber(payload.cardNumber),
        expiry: payload.expiry,
        amount: payload.amount,
        currency: payload.currency,
        status: data.status === "success" ? "SUCCESS" : "FAILED",
        timestamp: new Date().toISOString(),
        attempts,
        failureReason: data.reason || "",
      };

      addOrUpdateTransaction(txn);

      if (data.status === "success") {
        setStatus("SUCCESS");
      } else {
        setStatus("FAILED");
      }
    } catch (error) {
      clearTimeout(timeoutId);

      const oldTxn = usePaymentStore
        .getState()
        .transactions.find((t) => t.transactionId === transactionId);

      const attempts = oldTxn ? oldTxn.attempts + 1 : 1;

      const txn: Transaction = {
        transactionId: transactionId!,
        name: payload.name,
        maskedCardNumber: maskCardNumber(payload.cardNumber),
        expiry: payload.expiry,
        amount: payload.amount,
        currency: payload.currency,
        status: "TIMEOUT",
        timestamp: new Date().toISOString(),
        attempts,
        failureReason: "Request timed out. Please try again.",
      };

      addOrUpdateTransaction(txn);

      setStatus("TIMEOUT");
    }
  };

  const resetPayment = () => {
    setStatus("IDLE");
    usePaymentStore.getState().setTransactionId("");
  };

  return { status, pay, resetPayment };
};