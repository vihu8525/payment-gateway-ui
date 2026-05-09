"use client";

import { useEffect } from "react";
import styles from "./TransactionHistory.module.css";
import { usePaymentStore } from "@/store/paymentStore";
import TransactionModal from "../TransactionModal/TransactionModal";

export default function TransactionHistory() {
  const {
    transactions,
    loadTransactions,
    setSelectedTransaction,
    selectedTransaction,
    clearSelected,
  } = usePaymentStore();

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <div className={styles.history}>
      <h2>Transaction History</h2>

      {transactions.length === 0 ? (
        <p className={styles.empty}>No transactions yet.</p>
      ) : (
        <ul className={styles.list}>
          {transactions.map((txn) => (
            <li
              key={txn.transactionId}
              className={styles.item}
              onClick={() => setSelectedTransaction(txn)}
            >
              <div>
                <p className={styles.id}>ID: {txn.transactionId}</p>
                <p className={styles.amount}>
                  {txn.currency} {txn.amount}
                </p>
              </div>

              <div>
                <p className={styles.status}>{txn.status}</p>
                <p className={styles.time}>
                  {new Date(txn.timestamp).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {selectedTransaction && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={clearSelected}
        />
      )}
    </div>
  );
}