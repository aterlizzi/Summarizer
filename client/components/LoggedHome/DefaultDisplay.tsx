import React from "react";
import SideBar from "./SideBar";
import styles from "../../styles/components/DefaultDisplay.module.scss";
import CreateBundle from "./CreateBundle";
import SearchBar from "./SearchBar";
import Slider from "./Slider";

function DefaultDisplay({
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
          setSection={setSection}
          setUserProfileId={setUserProfileId}
          history={history}
          setHistory={setHistory}
        />
        <Slider
          type={"recentReads"}
          title={"Recently Read"}
          data={result}
          bundleResult={bundleResult}
          reexecuteBundle={reexecuteBundle}
        />
        <Slider
          type={"friendsReads"}
          title={"Friends Feed"}
          bundleResult={bundleResult}
          reexecuteBundle={reexecuteBundle}
        />
        <Slider
          type={"groupsReads"}
          title={"Groups Feed"}
          reexecuteBundle={reexecuteBundle}
        />
      </section>
      {popupSection === "Create_Bundle" ? (
        <CreateBundle
          setPopupSection={setPopupSection}
          reexecuteBundle={reexecuteBundle}
        />
      ) : null}
    </>
  );
}

export default DefaultDisplay;
