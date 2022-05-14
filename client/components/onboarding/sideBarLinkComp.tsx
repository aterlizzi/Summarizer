import React from "react";
import styles from "../../styles/Onboarding.module.scss";
import { useRouter } from "next/router";
import { useMutation } from "urql";
import { setAccessToken } from "../../accesstoken";

const Logout = `
  mutation{
    logout
  }
`;

function SidebarLink({ section, setSection, text }) {
  const router = useRouter();

  const [result, logout] = useMutation(Logout);

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
      case "Logout":
        handleLogout();
        break;
      case "Extension Settings":
        setSection(7);
        break;
      case "Contact":
        router.push("/contact");
        break;
      case "Refer a Friend":
        router.push("/referral");
        break;
      case "Settings":
        router.push("/users/settings");
        break;
      case "Pricing":
        router.push("/begin");
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    logout().then((res) => {
      if (res.data && res.data.logout) {
        setAccessToken("");
        router.push("/");
      }
    });
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
        (text === "Status" && section === 6) ||
        (text === "Extension Settings" && section === 7)
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
          (text === "Status" && section === 6) ||
          (text === "Extension Settings" && section === 7)
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
