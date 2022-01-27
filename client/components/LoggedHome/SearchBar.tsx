import {
  faBell,
  faChevronLeft,
  faChevronRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/components/DefaultDisplay.module.scss";
let typingTimer;

function SearchBar() {
  const [notification, setNotification] = useState(0);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const searchBar = useRef(null);
  const node = useRef(null);

  const handleSearchBarChange = (e) => {
    setSearch(e.currentTarget.value);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(handleSearch, 1000);
  };

  const handleSearch = () => {
    console.log(search);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (searching && node.current && !node.current.contains(e.target)) {
        setSearching(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [searching]);

  return (
    <section className={styles.barContainer}>
      <div className={styles.returnContainer}>
        <div className={styles.circle}>
          <FontAwesomeIcon icon={faChevronLeft} className={styles.icon} />
        </div>
        <div className={styles.circle}>
          <FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
        </div>
      </div>
      <div
        className={styles.searchbarContainer}
        ref={node}
        onClick={() => {
          searchBar.current.focus();
          setSearching(true);
        }}
      >
        <div className={styles.bar}>
          <FontAwesomeIcon icon={faSearch} className={styles.icon} />
          <input
            type="text"
            className={
              searching
                ? `${styles.search} ${styles.active}`
                : `${styles.search}`
            }
            onChange={handleSearchBarChange}
            placeholder="Search"
            ref={searchBar}
          />
        </div>
        <div className={styles.circle}>
          <FontAwesomeIcon icon={faBell} className={styles.icon} />
          {notification !== 0 ? (
            <div className={styles.notification}>
              <p className={styles.notifNum}>{notification}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default SearchBar;
