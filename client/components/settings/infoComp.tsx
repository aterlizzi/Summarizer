import React from "react";
import styles from "../../styles/Settings.module.scss";
import Account from "./accountComp";
import AuthorizeApps from "./authAppsComp";
import Personal from "./personalComp";
import Reminders from "./reminderComp";
import Status from "./statusComp";

function Info({ section }) {
  return (
    <section className={styles.infoContainer}>
      <header className={styles.header}>
        <h2 className={styles.infoName}>
          {section === 0
            ? "Account Summary"
            : section === 1
            ? "Personal Settings"
            : section === 3
            ? "Reminders"
            : section === 5
            ? "Connect Your Favorite Apps"
            : section === 6
            ? "Account Status"
            : null}
        </h2>
      </header>
      <section className={styles.infoMain}>
        {section === 0 ? (
          <Account />
        ) : section === 1 ? (
          <Personal />
        ) : section === 3 ? (
          <Reminders />
        ) : section === 5 ? (
          <AuthorizeApps />
        ) : section === 6 ? (
          <Status />
        ) : null}
      </section>
    </section>
  );
}

export default Info;
