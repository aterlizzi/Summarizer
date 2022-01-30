import React from "react";
import styles from "../../styles/Settings.module.scss";
import Link from "next/link";

function AccountInfo({ title, text }) {
  return (
    <div className={styles.accountInfoContainer}>
      <h5 className={styles.title}>{title}</h5>
      <div className={styles.textContainer}>
        <p className={styles.info}>{text}</p>
        {title === "Payment Tier" && text !== "Untanglify Researcher" ? (
          <Link href="/begin" passHref>
            <span className={styles.special}>Upgrade</span>
          </Link>
        ) : title === "Email" ? (
          <Link href="/users/settings?personal=true" passHref>
            <span className={styles.special}>Change</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default AccountInfo;
