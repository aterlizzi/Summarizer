import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../../styles/Welcome.module.scss";

function ReturnButtonComp({ setSection, section }) {
  return (
    <div className={styles.reverse} onClick={() => setSection(section - 1)}>
      <div className={styles.bar}></div>
      <FontAwesomeIcon icon={faChevronLeft} className={styles.icon} />
      <p className={styles.return}>Return</p>
    </div>
  );
}

export default ReturnButtonComp;
