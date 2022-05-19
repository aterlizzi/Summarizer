import React from "react";
import styles from "../../styles/Onboarding.module.scss";
import Step from "./step";

function Tier({ reversed, title, data, para, steps, prem }) {
  return (
    <section
      className={styles.tier}
      style={
        reversed ? { flexDirection: "row-reverse" } : { flexDirection: "row" }
      }
    >
      <div
        className={styles.left}
        style={
          reversed
            ? { textAlign: "right", marginLeft: "5em" }
            : { marginRight: "5em" }
        }
      >
        <div
          className={styles.statusContainer}
          style={!reversed ? { flexDirection: "row-reverse" } : null}
        >
          {prem ? (
            <p
              className={styles.prem}
              style={
                !reversed
                  ? { margin: "0em 0em 0em 1em" }
                  : { margin: "0em 1em 0em 0em" }
              }
            >
              Premium only
            </p>
          ) : null}
          <div
            className={styles.statusBanner}
            style={data ? { background: "#03DAC6" } : { background: "#4740D1" }}
          >
            <p
              className={styles.status}
              style={data ? { color: "black" } : { color: "white" }}
            >
              {data ? "Complete" : "In Progress"}
            </p>
          </div>
        </div>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <p className={styles.sectionDesc}>{para}</p>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.right}>
        <Step
          info={steps[0]}
          reversed={false}
          num={1}
          color={data ? "green" : "blue"}
        />
        <div className={styles.divider}></div>
        <Step
          info={steps[1]}
          reversed={true}
          num={2}
          color={data ? "green" : "blue"}
        />
        <div className={styles.divider}></div>
        <Step
          info={steps[2]}
          reversed={false}
          num={3}
          color={data ? "green" : "blue"}
        />
        <div className={styles.divider}></div>
      </div>
    </section>
  );
}

export default Tier;
