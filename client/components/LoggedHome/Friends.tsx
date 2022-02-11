import React from "react";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import styles from "../../styles/components/Friends.module.scss";

function Friends({
  setSection,
  section,
  popupSection,
  setPopupSection,
  setUserProfileId,
  history,
  setHistory,
  bundleResult,
  result,
  reexecuteBundle,
  setSort,
  sort,
  setExecute,
}) {
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
      </section>
    </>
  );
}

export default Friends;
