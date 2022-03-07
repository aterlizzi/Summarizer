import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "urql";
import styles from "../../../styles/components/Groups.module.scss";

const ReturnFriendships = `
    query{
        returnFriendships{
            username
            id
        }
    }
`;
const Search = `
    mutation($username: String!){
        searchUsers(username: $username){
            id
            username
        }
    }
`;

const AddToGroup = `
    mutation($usernames: [String!], $groupId: Float!){
        addToGroup(usernames: $usernames, groupId: $groupId)
    }
`;

let typingTimer;

function InviteUsers({ setPopupSection, groupName, groupId }) {
  const node = useRef(null);

  const [numOfUsers, setNumOfUsers] = useState(0);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [added, setAdded] = useState([]);

  const [friendshipsResult, reexecuteFriendships] = useQuery({
    query: ReturnFriendships,
  });
  const [searchResult, search] = useMutation(Search);
  const [groupResult, addToGroup] = useMutation(AddToGroup);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (node.current && !node.current.contains(e.target)) {
        setPopupSection("");
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [setPopupSection]);

  const handleSearchBarChange = (e) => {
    setUser(e.currentTarget.value);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(handleSearch, 1000);
  };

  const handleSearch = () => {
    search({ username: user }).then((res) => {
      console.log(res);
    });
  };

  const handleStateChange = (name: string) => {
    if (added.indexOf(name) !== -1) {
      // copy arr using slice to force re-render
      const arr = added.slice();

      // find index of existing name
      const index = added.indexOf(name);

      // remove it.
      arr.splice(index, 1);
      setAdded(arr);
      setNumOfUsers(numOfUsers - 1);
    } else {
      const arr = added.slice();
      arr.push(name);
      setAdded(arr);
      setNumOfUsers(numOfUsers + 1);
    }
  };

  return (
    <div className={styles.inviteUsersWrapper}>
      <section className={styles.inviteUsersCard} ref={node}>
        <header className={styles.header}>
          <h3 className={styles.title}>
            Invite People to <span className={styles.special}>{groupName}</span>
          </h3>
          <div className={styles.exit} onClick={() => setPopupSection("")}>
            <div className={styles.exit1}></div>
            <div className={styles.exit2}></div>
          </div>
        </header>
        <div className={styles.content}>
          <div className={styles.search}>
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
              className={styles.input}
              placeholder="Search for users..."
              onChange={(e) => handleSearchBarChange(e)}
            />
          </div>
          <div className={styles.users}>
            {searchResult.data &&
            searchResult.data.searchUsers &&
            searchResult.data.searchUsers.length > 0
              ? searchResult.data.searchUsers.map((friend) => {
                  return (
                    <div className={styles.userContainer} key={friend.id}>
                      <div className={styles.left}>
                        <div className={styles.circle}>
                          <FontAwesomeIcon
                            icon={faUser}
                            className={styles.icon}
                          />
                        </div>
                        <p className={styles.username}>{friend.username}</p>
                      </div>
                      <div className={styles.right}>
                        {added.indexOf(friend.username) !== -1 ? (
                          <button
                            className={styles.removeBtn}
                            onClick={() => handleStateChange(friend.username)}
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            className={styles.inviteBtn}
                            onClick={() => handleStateChange(friend.username)}
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              : null}
            {friendshipsResult.fetching ? (
              <div className={styles.loader}></div>
            ) : (
              friendshipsResult.data &&
              friendshipsResult.data.returnFriendships.map((friend) => {
                return (
                  <div className={styles.userContainer} key={friend.id}>
                    <div className={styles.left}>
                      <div className={styles.circle}>
                        <FontAwesomeIcon
                          icon={faUser}
                          className={styles.icon}
                        />
                      </div>
                      <p className={styles.username}>{friend.username}</p>
                    </div>
                    <div className={styles.right}>
                      {added.indexOf(friend.username) !== -1 ? (
                        <button
                          className={styles.removeBtn}
                          onClick={() => handleStateChange(friend.username)}
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          className={styles.inviteBtn}
                          onClick={() => handleStateChange(friend.username)}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.label}>
            Don't see your friend? Type their email below:
          </p>
          <input
            type="email"
            className={styles.input}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="jane.doe@example.com"
          />
        </div>
        <div className={styles.btnContainer}>
          <button className={`${styles.btnCancel} ${styles.btn}`}>
            Cancel
          </button>
          <button className={`${styles.btnInvite} ${styles.btn}`}>
            Invite {numOfUsers} Users
          </button>
        </div>
      </section>
    </div>
  );
}

export default InviteUsers;
