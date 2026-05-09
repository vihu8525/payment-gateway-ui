import { NextResponse } from "next/server";

export async function POST() {
  const random = Math.random();

  // 60% success
  if (random < 0.6) {
    return NextResponse.json({
      status: "success",
    });
  }

  // 25% failed
  if (random < 0.85) {
    const reasons = [
      "Insufficient funds",
      "Card declined",
      "Bank server error",
      "Invalid card details",
    ];

    return NextResponse.json({
      status: "failed",
      reason: reasons[Math.floor(Math.random() * reasons.length)],
    });
  }

  // 15% timeout simulation (8 seconds delay)
  await new Promise((resolve) => setTimeout(resolve, 8000));

  return NextResponse.json({
    status: "failed",
    reason: "Gateway timeout",
  });
}