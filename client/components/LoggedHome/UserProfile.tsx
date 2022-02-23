import React, { useState } from "react";
import { useMutation, useQuery } from "urql";
import styles from "../../styles/components/UserProfile.module.scss";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";

function UserProfile({
  setSection,
  section,
  popupSection,
  setPopupSection,
  userProfileId,
  setUserProfileId,
  history,
  setHistory,
  sendFriendRequest,
  bundleResult,
  result,
  reexecuteBundle,
  setSort,
  sort,
  setExecute,
}) {
  const handleFriendRequest = () => {
    sendFriendRequest({ friendId: parseInt(userProfileId) }).then((res) => {});
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
