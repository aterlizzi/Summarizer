import React from "react";
import styles from "../../styles/Home.module.scss";

function UnderConstruction() {
  return (
    <div className={styles.constructionCard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Invite only!</h1>
        <p className={styles.desc}>
          We love the passion, but we are in closed beta right now. If you'd
          like an invite, submit your email below and we'll email you with next
          steps.
        </p>
      </header>
      <div className={styles.emailSubmit}>
        <input type="text" className={styles.input} placeholder="Your email" />
        <button className={styles.btn}>Join</button>
      </div>
    </div>
  );
}

export default UnderConstruction;
