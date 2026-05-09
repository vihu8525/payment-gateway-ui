"use client";

import styles from "./TransactionModal.module.css";
import { Transaction } from "@/types";

interface Props {
  transaction: Transaction;
  onClose: () => void;
}

export default function TransactionModal({ transaction, onClose }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Transaction Details</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✖
          </button>
        </div>

        <div className={styles.body}>
          <p>
            <strong>Transaction ID:</strong> {transaction.transactionId}
          </p>
          <p>
            <strong>Name:</strong> {transaction.name}
          </p>
          <p>
            <strong>Card:</strong> {transaction.maskedCardNumber}
          </p>
          <p>
            <strong>Expiry:</strong> {transaction.expiry}
          </p>
          <p>
            <strong>Amount:</strong> {transaction.currency} {transaction.amount}
          </p>
          <p>
            <strong>Status:</strong> {transaction.status}
          </p>
          <p>
            <strong>Attempts:</strong> {transaction.attempts}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(transaction.timestamp).toLocaleString()}
          </p>

          {transaction.failureReason && (
            <p className={styles.reason}>
              <strong>Failure Reason:</strong> {transaction.failureReason}
            </p>
          )}
        </div>

        <button className={styles.okBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}