import {
  faHistory,
  faLayerGroup,
  faNewspaper,
  faPlus,
  faUser,
  faUserFriends,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "urql";
import styles from "../../styles/components/DefaultDisplay.module.scss";

const Logout = `
    mutation{
        logout
    }
`;

function SideBar({ setSection, section, popupSection, setPopupSection }) {
  const [logoutResult, logout] = useMutation(Logout);
  const [showAside, setShowAside] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className={styles.sidebar}>
      <aside
        className={styles.popout}
        style={showAside ? { display: "flex" } : null}
      >
        <div
          className={styles.utilContainer}
          onClick={() => router.push("/users/settings")}
        >
          <p className={styles.util}>Settings</p>
        </div>
        <div className={styles.utilContainer} onClick={handleLogout}>
          <p className={styles.util}>Log out</p>
        </div>
      </aside>
      <div className={styles.navigation}>
        <div
          className={styles.userLinks}
          onClick={() => setShowAside(!showAside)}
        >
          <div className={styles.userCircle}>
            <FontAwesomeIcon className={styles.icon} icon={faUser} />
          </div>
          <div className={styles.linksContainer}>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
          </div>
        </div>
        <div className={styles.broadTopics}>
          <div
            className={styles.navContainer}
            onClick={() => setSection("Home")}
          >
            <p
              className={styles.nav}
              style={section === "Home" ? { color: "#bb86fc" } : null}
            >
              Home
            </p>
          </div>
          <div
            className={styles.navContainer}
            onClick={() => setSection("Explore")}
          >
            <p className={styles.nav}>Explore</p>
          </div>
        </div>
      </div>
      <div className={styles.mainUtilContainer}>
        <header className={styles.utilHeader}>
          <h4 className={styles.title}>My Utilities</h4>
        </header>
        <div className={styles.utilContainer}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faHistory} className={styles.icon} />
          </div>
          <p className={styles.label}>History</p>
        </div>
        <div className={styles.utilContainer}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faUserFriends} className={styles.icon} />
          </div>
          <p className={styles.label}>Friends</p>
        </div>
        <div className={styles.utilContainer}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faUsers} className={styles.icon} />
          </div>
          <p className={styles.label}>Groups</p>
        </div>
        <div className={styles.utilContainer}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faNewspaper} className={styles.icon} />
          </div>
          <p className={styles.label}>Posts</p>
        </div>
        <div className={styles.utilContainer}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faLayerGroup} className={styles.icon} />
          </div>
          <p className={styles.label}>Bundles</p>
        </div>
      </div>
      <div className={styles.bundlesContainer}>
        <header className={styles.bundleHead}>
          <h4 className={styles.title}>My Bundles</h4>
        </header>
        <section
          className={styles.createContainer}
          onClick={() => setPopupSection("Create_Bundle")}
        >
          <div className={styles.circleContainer}>
            <div className={styles.circle}>
              <FontAwesomeIcon icon={faPlus} className={styles.icon} />
            </div>
          </div>
          <p className={styles.create}>Create...</p>
        </section>
      </div>
    </nav>
  );
}

export default SideBar;
