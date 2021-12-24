import React, { useState } from "react";
import styles from "../../styles/Settings.module.scss";
import { useRouter } from "next/router";

function SidebarLink({ section, setSection, text }) {
  const router = useRouter();
  const handleClick = () => {
    switch (text) {
      case "Upgrade":
        router.push("/begin");
        break;
      case "Account Summary":
        setSection(0);
        break;
      case "Personal Settings":
        setSection(1);
        break;
      case "Profile":
        setSection(2);
        break;
      case "Reminders":
        setSection(3);
        break;
      case "Authorizations":
        setSection(5);
        break;
      case "Status":
        setSection(6);
        break;
      default:
        break;
    }
  };
  return (
    <div
      className={styles.linkBox}
      onClick={handleClick}
      style={
        (text === "Account Summary" && section === 0) ||
        (text === "Personal Settings" && section === 1) ||
        (text === "Profile" && section === 2) ||
        (text === "Reminders" && section === 3) ||
        (text === "Upgrade" && section === 4) ||
        (text === "Authorizations" && section === 5) ||
        (text === "Status" && section === 6)
          ? { background: "#1f1f1f" }
          : null
      }
    >
      <div
        className={styles.sideDeco}
        style={
          (text === "Account Summary" && section === 0) ||
          (text === "Personal Settings" && section === 1) ||
          (text === "Profile" && section === 2) ||
          (text === "Reminders" && section === 3) ||
          (text === "Upgrade" && section === 4) ||
          (text === "Authorizations" && section === 5) ||
          (text === "Status" && section === 6)
            ? { background: "#bb86fc" }
            : { background: "transparent" }
        }
      ></div>
      <div className={styles.textContainer}>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
}

export default SidebarLink;
