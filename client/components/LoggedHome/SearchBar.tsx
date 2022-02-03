import {
  faBell,
  faChevronLeft,
  faChevronRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "urql";
import styles from "../../styles/components/DefaultDisplay.module.scss";
let typingTimer;

const Search = `
  mutation($query: String!){
    search(query: $query){
      bundles{
        id
        title
      }
      articles{
        id
        title
      }
      groups{
        id
        name
      }
      users{
        id
        username
      }
    }
  }
`;

function SearchBar() {
  const [notification, setNotification] = useState(0);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const [searchResult, sendSearch] = useMutation(Search);

  console.log(search);

  const searchBar = useRef(null);
  const node = useRef(null);

  const handleSearchBarChange = (e) => {
    setSearch(e.currentTarget.value);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(handleSearch, 1000);
  };

  const handleSearch = () => {
    sendSearch({ query: search }).then((res) => {
      console.log(res);
    });
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
    <>
      <section
        className={styles.wrapperSearch}
        style={searching ? { display: "flex" } : { display: "none" }}
      ></section>
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
            <div
              className={styles.searchResults}
              style={searching ? { display: "block" } : null}
            >
              {searchResult.data &&
              searchResult.data.search &&
              searchResult.data.search.bundles &&
              searchResult.data.search.bundles.length > 0 ? (
                <h5 className={styles.label}>Bundles</h5>
              ) : null}
              {searchResult.data &&
                searchResult.data.search &&
                searchResult.data.search.bundles.map((bundle) => {
                  return (
                    <>
                      <div
                        className={styles.searchResultContainer}
                        key={bundle.id}
                      >
                        <p className={styles.title}>{bundle.title}</p>
                      </div>
                    </>
                  );
                })}
              {searchResult.data &&
              searchResult.data.search &&
              searchResult.data.search.articles &&
              searchResult.data.search.articles.length > 0 ? (
                <h5 className={styles.label}>Articles</h5>
              ) : null}
              {searchResult.data &&
                searchResult.data.search &&
                searchResult.data.search.articles.map((article) => {
                  return (
                    <Link href={`/summaries/${article.id}`}>
                      <div
                        className={styles.searchResultContainer}
                        key={article.id}
                      >
                        <p className={styles.title}>{article.title}</p>
                      </div>
                    </Link>
                  );
                })}
              {searchResult.data &&
              searchResult.data.search &&
              searchResult.data.search.groups &&
              searchResult.data.search.groups.length > 0 ? (
                <h5 className={styles.label}>Groups</h5>
              ) : null}
              {searchResult.data &&
                searchResult.data.search &&
                searchResult.data.search.groups.map((group) => {
                  return (
                    <>
                      <div
                        className={styles.searchResultContainer}
                        key={group.id}
                      >
                        <p className={styles.title}>{group.name}</p>
                        <div className={styles.selectContainer}>
                          <p className={styles.select}>Select</p>
                        </div>
                      </div>
                    </>
                  );
                })}
              {searchResult.data &&
              searchResult.data.search &&
              searchResult.data.search.users &&
              searchResult.data.search.users.length > 0 ? (
                <h5 className={styles.label}>Users</h5>
              ) : null}
              {searchResult.data &&
                searchResult.data.search &&
                searchResult.data.search.users.map((users) => {
                  return (
                    <>
                      <div
                        className={styles.searchResultContainer}
                        key={users.id}
                      >
                        <p className={styles.title}>{users.username}</p>
                      </div>
                    </>
                  );
                })}
            </div>
            {!searchResult.fetching ? (
              <FontAwesomeIcon icon={faSearch} className={styles.icon} />
            ) : (
              <div
                className={styles.loader}
                style={{ borderColor: "#03dac6 transparent" }}
              ></div>
            )}
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
    </>
  );
}

export default SearchBar;
