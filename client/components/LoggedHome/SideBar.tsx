import {
  faChevronDown,
  faChevronUp,
  faHistory,
  faHome,
  faLayerGroup,
  faMap,
  faNewspaper,
  faPlus,
  faUser,
  faUserFriends,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "urql";
import styles from "../../styles/components/DefaultDisplay.module.scss";

const Logout = `
    mutation{
        logout
    }
`;

let isAbbreviate;

function SideBar({
  setSection,
  section,
  popupSection,
  setPopupSection,
  bundleResult,
  reexecuteBundle,
  meResult,
  setSort,
  sort,
  setExecute,
}) {
  const [logoutResult, logout] = useMutation(Logout);

  const [showAside, setShowAside] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);

  const node = useRef(null);
  const sortNode = useRef(null);
  const sidebar = useRef(null);

  const router = useRouter();

  useEffect(() => {
    if (
      meResult.data &&
      meResult.data.me &&
      meResult.data.me.settings &&
      meResult.data.me.settings.extensionSettings &&
      (meResult.data.me.settings.extensionSettings.lastBundleSortType ||
        meResult.data.me.settings.extensionSettings.lastBundleSortType === "")
    ) {
      setSort(meResult.data.me.settings.extensionSettings.lastBundleSortType);
      setExecute(true);
    }
  }, [meResult, setSort, setExecute]);

  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  function handleResize() {
    // Set window width/height to state
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleCreatedAt = () => {
    if (sort === "createdAt_desc") {
      setSort("createdAt_asc");
    } else if (sort === "createdAt_asc") {
      setSort("createdAt_desc");
    } else {
      setSort("createdAt_desc");
    }
  };
  const handleUpdatedAt = () => {
    if (sort === "updatedAt_desc") {
      setSort("updatedAt_asc");
    } else if (sort === "updatedAt_asc") {
      setSort("updatedAt_desc");
    } else {
      setSort("updatedAt_desc");
    }
  };
  const handleAlphabetical = () => {
    if (sort === "alphabetical_desc") {
      setSort("alphabetical_asc");
    } else if (sort === "alphabetical_asc") {
      setSort("alphabetical_desc");
    } else {
      setSort("alphabetical_desc");
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showAside && node.current && !node.current.contains(e.target)) {
        setShowAside(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [showAside]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        showSort &&
        sortNode.current &&
        !sortNode.current.contains(e.target)
      ) {
        setShowSort(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [showSort]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        sidebarActive &&
        sidebar.current &&
        !sidebar.current.contains(e.target)
      ) {
        setSidebarActive(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [sidebarActive]);

  return (
    <div
      className={
        sidebarActive
          ? `${styles.sidebarWrapper} ${styles.sidebarWrapperActive}`
          : styles.sidebarWrapper
      }
      ref={sidebar}
      onClick={() => setSidebarActive(true)}
    >
      <nav className={styles.sidebar}>
        <aside
          className={styles.popout}
          ref={node}
          style={showAside ? { display: "flex" } : null}
        >
          <div
            className={styles.utilContainer}
            onClick={() => router.push("/begin")}
          >
            <p className={styles.util}>Upgrade</p>
          </div>
          <div
            className={styles.utilContainer}
            onClick={() => router.push("/referral")}
          >
            <p className={styles.util}>Refer a Friend</p>
          </div>
          <div
            className={styles.utilContainer}
            onClick={() => router.push("/contact")}
          >
            <p className={styles.util}>Contact</p>
          </div>
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
        <aside
          className={styles.sorting}
          style={showSort ? { display: "flex" } : null}
          ref={sortNode}
        >
          <h5 className={styles.sortby}>Sort by</h5>
          <div
            className={styles.utilContainer}
            style={
              sort === "createdAt_desc" || sort === "createdAt_asc"
                ? { background: "rgba(255, 255, 255, 0.08)" }
                : null
            }
            onClick={handleCreatedAt}
          >
            <p className={styles.util}>Created Date</p>
            {sort === "createdAt_asc" ? (
              <FontAwesomeIcon icon={faChevronUp} className={styles.icon} />
            ) : sort === "createdAt_desc" ? (
              <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
            ) : null}
          </div>
          <div
            className={styles.utilContainer}
            style={
              sort === "updatedAt_desc" || sort === "updatedAt_asc"
                ? { background: "rgba(255, 255, 255, 0.08)" }
                : null
            }
            onClick={handleUpdatedAt}
          >
            <p className={styles.util}>Updated Date</p>
            {sort === "updatedAt_asc" ? (
              <FontAwesomeIcon icon={faChevronUp} className={styles.icon} />
            ) : sort === "updatedAt_desc" ? (
              <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
            ) : null}
          </div>
          <div
            className={styles.utilContainer}
            style={
              sort === "alphabetical_desc" || sort === "alphabetical_asc"
                ? { background: "rgba(255, 255, 255, 0.08)" }
                : null
            }
            onClick={handleAlphabetical}
          >
            <p className={styles.util}>Alphabetical</p>
            {sort === "alphabetical_asc" ? (
              <FontAwesomeIcon icon={faChevronUp} className={styles.icon} />
            ) : sort === "alphabetical_desc" ? (
              <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
            ) : null}
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
                {windowSize.width < 950 && !sidebarActive ? (
                  <FontAwesomeIcon icon={faHome} className={styles.icon} />
                ) : (
                  "Home"
                )}
              </p>
            </div>
            <div
              className={styles.navContainer}
              onClick={() => setSection("Explore")}
            >
              <p className={styles.nav}>
                {windowSize.width < 950 && !sidebarActive ? (
                  <FontAwesomeIcon icon={faMap} />
                ) : (
                  "Explore"
                )}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.mainUtilContainer}>
          <header className={styles.utilHeader}>
            <h4 className={styles.title}>
              {windowSize.width < 950 && !sidebarActive
                ? "My..."
                : "My Utilities"}
            </h4>
          </header>
          <div className={styles.utilContainer}>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faHistory} className={styles.icon} />
            </div>
            <p className={styles.label}>History</p>
          </div>
          <div
            className={styles.utilContainer}
            onClick={() => setSection("Friends")}
          >
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faUserFriends} className={styles.icon} />
            </div>
            <p
              className={styles.label}
              style={section === "Friends" ? { color: "#bb86fc" } : null}
            >
              Friends
            </p>
          </div>
          <div
            className={styles.utilContainer}
            onClick={() => setSection("Groups")}
          >
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faUsers} className={styles.icon} />
            </div>
            <p
              className={styles.label}
              style={section === "Groups" ? { color: "#bb86fc" } : null}
            >
              Groups
            </p>
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
          <header
            className={styles.bundleHead}
            onClick={() => setShowSort(!showSort)}
          >
            <h4 className={styles.title}>
              {" "}
              {windowSize.width < 950 && !sidebarActive
                ? "My..."
                : "My Bundles"}
            </h4>
            <div className={styles.linksContainer}>
              <div className={styles.circle}></div>
              <div className={styles.circle}></div>
              <div className={styles.circle}></div>
            </div>
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
          {bundleResult.data && bundleResult.data.returnBundles ? (
            bundleResult.data.returnBundles.map((bundle) => {
              return (
                <div className={styles.bundle} key={bundle.id}>
                  <p className={styles.bundleName}>
                    {windowSize.width < 950 && !sidebarActive
                      ? bundle.title
                          .split("")
                          .filter((_, idx) => {
                            if (idx < 3) return true;
                            return false;
                          })
                          .join("") + "..."
                      : bundle.title}
                  </p>
                </div>
              );
            })
          ) : bundleResult.fetching ? (
            <div className={styles.loader}></div>
          ) : null}
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
