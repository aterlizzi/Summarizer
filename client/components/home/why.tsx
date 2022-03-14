import { faBook, faMicrochip, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../../styles/Home.module.scss";

function Why() {
  return (
    <div className={styles.whyContainer}>
      <h3 className={styles.whyTitle}>Why Untanglify?</h3>
      <div className={styles.whyGrid}>
        <div className={styles.reasonContainer}>
          <div className={styles.top}>
            <div className={styles.whyCircle}>
              <FontAwesomeIcon icon={faMicrochip} className={styles.icon} />
            </div>
            <h4 className={styles.title}>We do it better</h4>
          </div>
          <div className={styles.bottom}>
            <p className={styles.reasonText}>
              Untanglify is built on a language model trained on 175 billion
              parameters. It&apos;s not perfect, but it&apos;s the best there
              is.
            </p>
          </div>
        </div>
        <div className={styles.reasonContainer}>
          <div className={styles.top}>
            <div className={styles.whyCircle}>
              <FontAwesomeIcon icon={faBook} className={styles.icon} />
            </div>
            <h4 className={styles.title}>
              Trusted by those with skin in the game
            </h4>
          </div>
          <div className={styles.bottom}>
            <p className={styles.reasonText}>
              Some of our top users rely on us to deliver them summaries for
              their work. We handle text from classified government documents to
              your average blog.
            </p>
          </div>
        </div>
        <div className={styles.reasonContainer}>
          <div className={styles.top}>
            <div className={styles.whyCircle}>
              <FontAwesomeIcon icon={faUser} className={styles.icon} />
            </div>
            <h4 className={styles.title}>We&apos;re small</h4>
          </div>
          <div className={styles.bottom}>
            <p className={styles.reasonText}>
              This means a higher level of care, passion, adaptibility, and a
              more custom approach to business. You mean a whole lot to us and
              we do our best to reflect that.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
}

export default Why;
