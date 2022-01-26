import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../../styles/components/DefaultDisplay.module.scss";

function CreateBundle({ setPopupSection }) {
  return (
    <div className={styles.wrapper}>
      <section className={styles.createBundleCard}>
        <header className={styles.header}>
          <h3 className={styles.title}>Create a new Bundle</h3>
          <div className={styles.exit} onClick={() => setPopupSection("")}>
            <div className={styles.exit1}></div>
            <div className={styles.exit2}></div>
          </div>
        </header>
        <form action="" className={styles.basicSettings}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Provide your bundle with a title"
          />
          <label htmlFor="desc" className={styles.label}>
            Write a description
          </label>
          <textarea name="desc" id="desc" className={styles.input}></textarea>
          <button className={styles.btn}>Create Bundle</button>
        </form>
      </section>
    </div>
  );
}

export default CreateBundle;
