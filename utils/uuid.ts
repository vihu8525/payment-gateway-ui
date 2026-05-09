export const generateTransactionId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // fallback (works everywhere)
  return "txn-" + Date.now() + "-" + Math.random().toString(16).slice(2);
};