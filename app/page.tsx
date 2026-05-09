"use client";

import PaymentForm from "@/components/PaymentForm/PaymentForm";
import StatusScreen from "@/components/StatusScreen/StatusScreen";
import TransactionHistory from "@/components/TransactionHistory/TransactionHistory";

export default function Home() {
  return (
    <main>
      <PaymentForm />
      <StatusScreen />
      <TransactionHistory />
    </main>
  );
}