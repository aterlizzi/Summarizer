import {
  faBell,
  faChevronLeft,
  faChevronRight,
  faSearch,
  faStar,
  faTimes,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "urql";
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
        rating
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

const ReturnNotifications = `
  query{
    returnNotifications{
      friendRequests
    }
  }
`;

const AcceptFriendRequest = `
  mutation($username: String!){
    acceptFriendRequest(username: $username)
  }
`;

const DeclineFriendRequest = `
  mutation($username: String!){
    declineFriendRequest(username: $username)
  }
`;

function SearchBar({ setSection, setUserProfileId, history, setHistory }) {
  const [notification, setNotification] = useState(0);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [displayNotif, setDisplayNotif] = useState(false);

  const [searchResult, sendSearch] = useMutation(Search);
  const [acceptFriendResult, acceptFriend] = useMutation(AcceptFriendRequest);
  const [declineFriendResult, declineFriend] =
    useMutation(DeclineFriendRequest);
  const [notificationsResult, reexecuteNotifications] = useQuery({
    query: ReturnNotifications,
  });

  useEffect(() => {
    if (
      notificationsResult.data &&
      notificationsResult.data.returnNotifications
    ) {
      setNotification(
        notificationsResult.data.returnNotifications.friendRequests.length
      );
    }
  }, [notification, setNotification, notificationsResult]);

  const searchBar = useRef(null);
  const node = useRef(null);

  const handleSearchBarChange = (e) => {
    setSearch(e.currentTarget.value);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(handleSearch, 1000);
  };

  const handleSearch = () => {
    sendSearch({ query: search }).then((res) => {});
  };

  const handleAcceptFriend = (username: string) => {
    acceptFriend({ username }).then((res) => {
      if (res && res.data && res.data.acceptFriendRequest) {
        setNotification(notification - 1);
        reexecuteNotifications();
      }
    });
  };

  const handleDeclineFriend = (username: string) => {
    declineFriend({ username }).then((res) => {
      if (res && res.data && res.data.declineFriendRequest) {
        setNotification(notification - 1);
        reexecuteNotifications();
      }
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

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (displayNotif && node.current && !node.current.contains(e.target)) {
        setDisplayNotif(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [displayNotif]);

  return (
    <>
      <section
        className={styles.wrapperSearch}
        style={
          searching || displayNotif ? { display: "flex" } : { display: "none" }
        }
      ></section>
      <section className={styles.barContainer}>
        <div className={styles.returnContainer}>
          <div
            className={styles.circle}
            onClick={() => {
              if (history.section === "UserProfile") {
                setUserProfileId(history.params);
              }
              setSection(history.section);
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} className={styles.icon} />
          </div>
          <div className={styles.circle}>
            <FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
          </div>
        </div>
        <div className={styles.searchbarContainer}>
          <div
            className={
              !searching ? `${styles.bar}` : `${styles.bar} ${styles.active}`
            }
            ref={node}
            onClick={() => {
              searchBar.current.focus();
              setSearching(true);
            }}
          >
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
                    <Link
                      passHref
                      key={article.id}
                      href={`/summaries/${article.id}`}
                    >
                      <div className={styles.searchResultContainer}>
                        <p className={styles.title}>{article.title}</p>
                        {article.rating ? (
                          <div className={styles.ratingContainer}>
                            <p className={styles.ratingText}>Rating:</p>
                            <div className={styles.valueContainer}>
                              <p className={styles.rating}>
                                {Math.round(article.rating * 100) / 100}
                              </p>
                              <FontAwesomeIcon
                                icon={faEmptyStar}
                                className={styles.ratingIcon}
                              />
                            </div>
                          </div>
                        ) : null}
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
                        onClick={() => {
                          setHistory({
                            section: "UserProfile",
                            params: users.id.toString(),
                          });
                          setSection("UserProfile");
                          setUserProfileId(users.id.toString());
                        }}
                      >
                        <p className={styles.title}>{users.username}</p>
                      </div>
                    </>
                  );
                })}
            </div>
            <div
              className={styles.notificationContainer}
              style={displayNotif ? { display: "block" } : null}
            >
              <h5 className={styles.title}>Notifications</h5>
              {notification === 0 ? (
                <p className={styles.error}>
                  You have no notifications at this time.
                </p>
              ) : notificationsResult.data &&
                notificationsResult.data.returnNotifications &&
                notificationsResult.data.returnNotifications.friendRequests
                  .length > 0 ? (
                notificationsResult.data.returnNotifications.friendRequests.map(
                  (request, idx) => {
                    return (
                      <div
                        className={styles.notificationResultContainer}
                        key={idx}
                      >
                        <div className={styles.left}>
                          <div className={styles.userCircle}>
                            <FontAwesomeIcon
                              icon={faUserCheck}
                              className={styles.icon}
                            />
                          </div>
                          <p className={styles.username}>{request}</p>
                        </div>
                        <div className={styles.right}>
                          <button
                            className={styles.btn}
                            onClick={() => {
                              handleAcceptFriend(request);
                            }}
                          >
                            Confirm
                          </button>
                          <FontAwesomeIcon
                            icon={faTimes}
                            className={styles.icon}
                            onClick={() => handleDeclineFriend(request)}
                          />
                        </div>
                      </div>
                    );
                  }
                )
              ) : null}
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
              className={searching ? `${styles.search}` : `${styles.search}`}
              onChange={handleSearchBarChange}
              placeholder="Search"
              ref={searchBar}
            />
          </div>
          <div
            className={styles.circle}
            onClick={() => setDisplayNotif(!displayNotif)}
          >
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
