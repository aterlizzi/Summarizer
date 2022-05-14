import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import SidebarLink from "./sideBarLinkComp";
import styles from "../../styles/Onboarding.module.scss";

function MobileMenu({ isOpen }) {
  const [section, setSection] = useState(0);

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
            <FontAwesomeIcon icon={faLink} className={styles.icon} />
            <h3 className={styles.sectionTitle}>Links</h3>
          </header>
          <SidebarLink
            text={"Refer a Friend"}
            section={section}
            setSection={setSection}
          />
          <SidebarLink
            text={"Settings"}
            section={section}
            setSection={setSection}
          />
          <SidebarLink
            text={"Pricing"}
            section={section}
            setSection={setSection}
          />
          <SidebarLink
            text={"Contact"}
            section={section}
            setSection={setSection}
          />
        </section>
      </section>
    </div>
  );
}

export default MobileMenu;
