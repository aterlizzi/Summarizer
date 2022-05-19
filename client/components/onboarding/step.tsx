import React from "react";
import styles from "../../styles/Onboarding.module.scss";

function Step({ info, reversed, num, color }) {
  return (
    <div
      className={styles.step}
      style={
        reversed
          ? { flexDirection: "row-reverse", paddingLeft: "2em" }
          : { flexDirection: "row", paddingRight: "2em" }
      }
    >
      <div
        className={styles.stepCircle}
        style={
          !reversed
            ? color === "green"
              ? { marginRight: "1em", border: "3px solid #03DAC6" }
              : { marginRight: "1em", border: "3px solid #4740D1" }
            : color === "green"
            ? { border: "3px solid #03DAC6" }
            : { border: "3px solid #4740D1" }
        }
      >
        <p className={styles.num}>{num}</p>
      </div>
      <p
        className={styles.stepInfo}
        style={reversed ? { marginRight: "1em", textAlign: "right" } : null}
      >
        {info}
      </p>
    </div>
  );
}

export default Step;
