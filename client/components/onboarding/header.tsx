import React from "react";
import styles from "../../styles/Onboarding.module.scss";

function Header() {
  return (
    <section className={styles.lpHeader}>
      <div className={styles.introContainer}>
        <p className={styles.tagLine}>Onboarding</p>
        <h1 className={styles.title}>
          Set yourself up
          <br />
          for success,
          <br />
          get rewarded
        </h1>
        <div className={styles.divider}></div>
        <p className={styles.desc}>
          Untanglify has a lot to offer, we&apos;d like to help you get situated
          by offering a walkthrough with rewards for completing it!
        </p>
        <p className={styles.tagLine}>Go to tutorial</p>
      </div>
      <div className={styles.bgCircle}></div>
    </section>
  );
}

export default Header;
