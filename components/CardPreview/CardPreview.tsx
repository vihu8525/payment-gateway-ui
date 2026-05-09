import styles from "./CardPreview.module.css";
import { CardType } from "@/types";

interface Props {
  name: string;
  cardNumber: string;
  expiry: string;
  cardType: CardType;
  cvv: string;
  isFlipped: boolean;
}

export default function CardPreview({
  name,
  cardNumber,
  expiry,
  cardType,
  cvv,
  isFlipped,
}: Props) {
  return (
    <div className={styles.cardContainer}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}>
        {/* FRONT SIDE */}
        <div className={styles.front}>
          <div className={styles.top}>
            <span className={styles.brand}>
              {cardType === "UNKNOWN" ? "CARD" : cardType}
            </span>
          </div>

          <div className={styles.number}>
            {cardNumber || "#### #### #### ####"}
          </div>

          <div className={styles.bottom}>
            <div>
              <p className={styles.label}>Card Holder</p>
              <p className={styles.value}>{name || "FULL NAME"}</p>
            </div>

            <div>
              <p className={styles.label}>Expiry</p>
              <p className={styles.value}>{expiry || "MM/YY"}</p>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className={styles.back}>
          <div className={styles.blackStrip}></div>

          <div className={styles.cvvBox}>
            <p className={styles.cvvLabel}>CVV</p>
            <p className={styles.cvvValue}>{cvv || "***"}</p>
          </div>

          <p className={styles.secureText}>Secure Payment</p>
        </div>
      </div>
    </div>
  );
}