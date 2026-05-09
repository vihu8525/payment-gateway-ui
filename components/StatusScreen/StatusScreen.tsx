"use client";

import styles from "./StatusScreen.module.css";
import { usePaymentStore } from "@/store/paymentStore";
import { usePayment } from "@/hooks/usePayment";

export default function StatusScreen() {
  const { status, currentTransactionId, transactions, setStatus } =
    usePaymentStore();

  const { resetPayment } = usePayment();

  const currentTxn = transactions.find(
    (t) => t.transactionId === currentTransactionId
  );

  if (status === "IDLE") return null;

  const attempts = currentTxn?.attempts || 1;
  const maxAttempts = 3;

  const canRetry =
    (status === "FAILED" || status === "TIMEOUT") && attempts < maxAttempts;

  const handleRetry = () => {
    setStatus("IDLE");
  };

  return (
    <div className={styles.screen}>
      {status === "PROCESSING" && (
        <div className={styles.box}>
          <h2>Processing Payment...</h2>
          <p>Please wait, do not refresh.</p>
        </div>
      )}

      {status === "SUCCESS" && (
        <div className={styles.boxSuccess}>
          <h2>Payment Successful </h2>
          <p>Transaction ID: {currentTransactionId}</p>
          <button className={styles.actionBtn} onClick={resetPayment}>
  Make Another Payment
</button>
        </div>
      )}

      {status === "FAILED" && (
        <div className={styles.boxFail}>
          <h2>Payment Failed </h2>
          <p>{currentTxn?.failureReason || "Payment failed"}</p>
          <p>
            Attempt {attempts} of {maxAttempts}
          </p>

          {canRetry ? (
           <button className={styles.actionBtn} onClick={handleRetry}>
  Retry Payment
</button>
          ) : (
            <p className={styles.finalFail}>
              Maximum retry attempts reached.
            </p>
          )}
        </div>
      )}

      {status === "TIMEOUT" && (
        <div className={styles.boxFail}>
          <h2>Payment Timeout </h2>
          <p>Request took too long and was cancelled.</p>
          <p>
            Attempt {attempts} of {maxAttempts}
          </p>

          {canRetry ? (
            <button onClick={handleRetry}>Retry Payment</button>
          ) : (
            <p className={styles.finalFail}>
              Maximum retry attempts reached.
            </p>
          )}
        </div>
      )}
    </div>
  );
}