import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import styles from "../../styles/components/Groups.module.scss";
import CreateBundle from "./CreateBundle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import CreateGroup from "./Groups/CreateGroup";

function Groups({
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
        <section className={styles.groups}>
          <header className={styles.header}>
            <div className={styles.left}>
              <h1 className={styles.title}>Groups:</h1>
              <p className={styles.groupNumber}>0</p>
            </div>
            <div className={styles.right}>
              <div className={styles.options}>
                <FontAwesomeIcon icon={faEllipsisH} className={styles.icon} />
              </div>
              <button
                className={styles.newGroup}
                onClick={() => setPopupSection("New_Group")}
              >
                + Add New Group
              </button>
            </div>
          </header>
          <section className={styles.grid}>{}</section>
        </section>
      </section>
      {popupSection === "Create_Bundle" ? (
        <CreateBundle
          setPopupSection={setPopupSection}
          reexecuteBundle={reexecuteBundle}
        />
      ) : popupSection === "New_Group" ? (
        <CreateGroup setPopupSection={setPopupSection} />
      ) : null}
    </>
  );
}

export default Groups;
