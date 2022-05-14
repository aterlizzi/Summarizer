import React from "react";
import styles from "../../styles/Onboarding.module.scss";

function Options({ setDisplayExtension, displayExtension }) {
  return (
    <section className={styles.options}>
      <div
        className={styles.container}
        onClick={() => setDisplayExtension(true)}
        style={
          displayExtension
            ? { background: "#4740d1" }
            : { background: "transparent" }
        }
      >
        <p className={styles.text}>Extension</p>
      </div>
      <div
        className={styles.container}
        onClick={() => setDisplayExtension(false)}
        style={
          !displayExtension
            ? {
                background: "#4740d1",
              }
            : { background: "transparent" }
        }
      >
        <p className={styles.text}>Website</p>
      </div>
    </section>
  );
}

export default Options;
