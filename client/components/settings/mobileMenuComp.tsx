import {
  faLightbulb,
  faLink,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../../styles/Settings.module.scss";
import SidebarLink from "./sidebarLinkComp";

function MobileMenu({ isOpen, section, setSection }) {
  return (
    <div className={styles.mobileWrapper}>
      <section
        className={
          isOpen
            ? `${styles.mobileSidebar} ${styles.active}`
            : `${styles.mobileSidebar}`
        }
      >
        <section className={`${styles.accountSection} ${styles.subSections}`}>
          <header className={styles.sectionHeader}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            <h3 className={styles.sectionTitle}>Account</h3>
          </header>
          <SidebarLink
            text={"Account Summary"}
            section={section}
            setSection={setSection}
          />
          <SidebarLink
            text={"Personal Settings"}
            section={section}
            setSection={setSection}
          />
          <SidebarLink
            text={"Extension Settings"}
            section={section}
            setSection={setSection}
          />
          <SidebarLink
            text={"Reminders"}
            section={section}
            setSection={setSection}
          />
        </section>
        <section className={`${styles.premiumSection} ${styles.subSections}`}>
          <header className={styles.sectionHeader}>
            <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
            <h3 className={styles.sectionTitle}>Premiums</h3>
          </header>
          <SidebarLink
            text={"Upgrade"}
            section={section}
            setSection={setSection}
          />
        </section>
        <section className={`${styles.securitySection} ${styles.subSections}`}>
          <header className={styles.sectionHeader}>
            <FontAwesomeIcon icon={faLock} className={styles.icon} />
            <h3 className={styles.sectionTitle}>Security</h3>
          </header>
          <SidebarLink
            text={"Authorizations"}
            section={section}
            setSection={setSection}
          />
          <SidebarLink
            text={"Status"}
            section={section}
            setSection={setSection}
          />
          <SidebarLink
            text={"Logout"}
            section={section}
            setSection={setSection}
          />
        </section>
        <section className={`${styles.securitySection} ${styles.subSections}`}>
          <header className={styles.sectionHeader}>
            <FontAwesomeIcon icon={faLink} className={styles.icon} />
            <h3 className={styles.sectionTitle}>Links</h3>
          </header>
          <SidebarLink
            text={"Contact"}
            section={section}
            setSection={setSection}
          />
          <SidebarLink
            text={"Refer a Friend"}
            section={section}
            setSection={setSection}
          />
        </section>
      </section>
    </div>
  );
}

export default MobileMenu;
