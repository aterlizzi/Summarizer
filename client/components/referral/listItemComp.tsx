import React from "react";
import styles from "../../styles/Referral.module.scss";

function ListItem({ purpleText, text }) {
  return (
    <div className={styles.item}>
      <p className={styles.itemText}>
        <span className={styles.purple}>{purpleText} </span>
        {text}
      </p>
    </div>
  );
}

export default ListItem;
