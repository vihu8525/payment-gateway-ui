import { create } from "zustand";
import { PaymentStatus, Transaction } from "@/types";

interface PaymentStore {
  status: PaymentStatus;
  currentTransactionId: string | null;
  transactions: Transaction[];
  selectedTransaction: Transaction | null;

  setStatus: (status: PaymentStatus) => void;
  setTransactionId: (id: string) => void;

  addOrUpdateTransaction: (txn: Transaction) => void;
  setSelectedTransaction: (txn: Transaction | null) => void;

  loadTransactions: () => void;
  clearSelected: () => void;
}

export const usePaymentStore = create<PaymentStore>((set, get) => ({
  status: "IDLE",
  currentTransactionId: null,
  transactions: [],
  selectedTransaction: null,

  setStatus: (status) => set({ status }),

  setTransactionId: (id) => set({ currentTransactionId: id }),

  addOrUpdateTransaction: (txn) => {
    const existing = get().transactions.find(
      (t) => t.transactionId === txn.transactionId
    );

    let updated: Transaction[];

    if (existing) {
      updated = get().transactions.map((t) =>
        t.transactionId === txn.transactionId ? txn : t
      );
    } else {
      updated = [txn, ...get().transactions];
    }

    localStorage.setItem("transactions", JSON.stringify(updated));

    set({ transactions: updated });
  },

  setSelectedTransaction: (txn) => set({ selectedTransaction: txn }),

  loadTransactions: () => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      set({ transactions: JSON.parse(saved) });
    }
  },

  clearSelected: () => set({ selectedTransaction: null }),
}));