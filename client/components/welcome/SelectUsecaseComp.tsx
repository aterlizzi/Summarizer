import React from "react";
import styles from "../../styles/Welcome.module.scss";
import Svg1 from "./svg1";
import Svg2 from "./svg2";
import Svg3 from "./svg3";

function SelectUsecaseComp({ setUseCase, setSection, section }) {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headline}>
          Welcome to the team, let&apos;s begin.
        </h1>
        <h5 className={styles.subtitle}>
          Will you please choose the category that best suits you?
        </h5>
      </header>
      <section className={styles.options}>
        <div
          className={styles.card}
          onClick={() => {
            setUseCase("Business");
            setSection(section + 1);
          }}
        >
          <Svg1 />
          <p className={styles.label}>Business</p>
        </div>
        <div
          className={styles.card}
          onClick={() => {
            setUseCase("Student");
            setSection(section + 1);
          }}
        >
          <Svg2 />
          <p className={styles.label}>School</p>
        </div>
        <div
          className={styles.card}
          onClick={() => {
            setUseCase("Personal");
            setSection(section + 1);
          }}
        >
          <Svg3 />
          <p className={styles.label}>Personal</p>
        </div>
      </section>
    </section>
  );
}

export default SelectUsecaseComp;
