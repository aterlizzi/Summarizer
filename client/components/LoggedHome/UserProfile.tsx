import React, { useState } from "react";
import { useMutation, useQuery } from "urql";
import styles from "../../styles/components/UserProfile.module.scss";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";

const Me = `
    query{
        me{
            bundles{
                title
            }
            settings{
              extensionSettings{
                lastBundleSortType
              }
            }
        }
    }
`;

const ReturnBundles = `
    query($sort: String){
      returnBundles(sort: $sort){
        title
        id
      }
    }
`;

const SendFriendRequest = `
    mutation($friendId: Float!){
        sendFriendRequest(friendId: $friendId)
    }
`;

function UserProfile({
  setSection,
  section,
  popupSection,
  setPopupSection,
  userProfileId,
  setUserProfileId,
  history,
  setHistory,
}) {
  const [sort, setSort] = useState("");
  const [execute, setExecute] = useState(false);
  const [result, rexecuteMe] = useQuery({ query: Me });
  const [friendRequestResult, sendFriendRequest] =
    useMutation(SendFriendRequest);
  const [bundleResult, reexecuteBundle] = useQuery({
    query: ReturnBundles,
    variables: { sort },
    pause: !execute,
  });

  const handleFriendRequest = () => {
    sendFriendRequest({ friendId: parseInt(userProfileId) }).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <SideBar
        setPopupSection={setPopupSection}
        popupSection={popupSection}
        setSection={setSection}
        section={section}
        bundleResult={bundleResult}
        reexecuteBundle={reexecuteBundle}
        meResult={result}
        setSort={setSort}
        sort={sort}
        setExecute={setExecute}
      />
      <section className={styles.home}>
        <SearchBar
          setUserProfileId={setUserProfileId}
          setSection={setSection}
          history={history}
          setHistory={setHistory}
        />
        <button onClick={handleFriendRequest}>Send Friend Request</button>
      </section>
    </>
  );
}

export default UserProfile;
