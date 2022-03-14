import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import styles from "../../styles/components/Groups.module.scss";
import CreateBundle from "./CreateBundle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faUser } from "@fortawesome/free-solid-svg-icons";
import CreateGroup from "./Groups/CreateGroup";
import { useQuery } from "urql";
import InviteUsers from "./Groups/InviteUsers";

const testArr = [0, 1, 2, 3, 4];

const ReturnGroups = `
  query{
    returnUserGroups{
      name
      id
      description
      allowMemberToInvite
      users{
        id
      }
      admins{
        id
      }
    }
  }
`;

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
  const [groupsResult, reexecuteGroups] = useQuery({ query: ReturnGroups });
  const [revealAside, setRevealAside] = useState({});
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState(0);

  const node = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        Object.keys(revealAside).length !== 0 &&
        node.current &&
        !node.current.contains(e.target)
      ) {
        setRevealAside({});
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [revealAside]);

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
              <p className={styles.groupNumber}>
                {groupsResult.data && groupsResult.data.returnUserGroups
                  ? groupsResult.data.returnUserGroups.length
                  : 0}
              </p>
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
          {groupsResult.fetching ? (
            <div className={styles.loader}></div>
          ) : (
            <section className={styles.grid}>
              {groupsResult.data &&
              groupsResult.data.returnUserGroups &&
              groupsResult.data.returnUserGroups.length > 0
                ? groupsResult.data.returnUserGroups.map((group) => {
                    return (
                      <div className={styles.card} key={group.id}>
                        <div className={styles.top}>
                          <header className={styles.cardHead}>
                            <h3 className={styles.groupName}>{group.name}</h3>
                            {/* Check if one of the admin ids match the user id */}
                            {group.admins.filter(
                              (admin) => admin.id === result.data.me.id
                            ).length > 0 ? (
                              <div
                                className={styles.status}
                                style={{ border: "1px solid #cf6679" }}
                              >
                                <p
                                  className={styles.statusType}
                                  style={{ color: "#cf6679" }}
                                >
                                  Admin
                                </p>
                              </div>
                            ) : (
                              <div
                                className={styles.status}
                                style={{ border: "1px solid #03dac6" }}
                              >
                                <p
                                  className={styles.statusType}
                                  style={{ color: "#03dac6" }}
                                >
                                  Member
                                </p>
                              </div>
                            )}
                          </header>
                          <section className={styles.content}>
                            <p className={styles.desc}>
                              {group.description.length > 100
                                ? group.description
                                    .split("")
                                    .filter((_, idx) => idx < 100)
                                    .join("") + "..."
                                : group.description}
                            </p>
                          </section>
                        </div>
                        <div className={styles.bottom}>
                          <div className={styles.left}>
                            <div className={styles.users}>
                              {testArr.map((user, idx) => {
                                // only display first 4 users
                                if (idx > 3) return null;
                                return (
                                  <div className={styles.userCircle} key={idx}>
                                    <FontAwesomeIcon
                                      icon={faUser}
                                      className={styles.icon}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            {testArr.length > 4 ? (
                              <div className={styles.plusCircle}>
                                <p className={styles.plus}>+</p>
                              </div>
                            ) : null}
                            {/* {group.users.map((user) => {
                              return (
                                <div
                                  className={styles.userCircle}
                                  key={user.id}
                                >
                                  <FontAwesomeIcon
                                    icon={faUser}
                                    className={styles.icon}
                                  />
                                </div>
                              );
                            })} */}
                            {/* {group.users.length > 4 ? (
                              <div className={styles.plusCircle}>
                                <p className={styles.plus}>+</p>
                              </div>
                            ) : null} */}
                          </div>
                          <div
                            className={styles.right}
                            onClick={() => {
                              const obj: any = {};
                              obj[group.id] = true;
                              setRevealAside(obj);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faEllipsisH}
                              className={styles.icon}
                            />
                            <aside
                              className={styles.aside}
                              ref={node}
                              style={
                                revealAside[group.id] === true
                                  ? null
                                  : { display: "none" }
                              }
                            >
                              {group.admins.filter(
                                (admin) => admin.id === result.data.me.id
                              ).length > 0 || group.allowMemberToInvite ? (
                                <div
                                  className={styles.container}
                                  onClick={() => {
                                    setGroupName(group.name);
                                    setGroupId(group.id);
                                    setPopupSection("Invite_Users");
                                  }}
                                >
                                  <p className={styles.option}>Invite User</p>
                                </div>
                              ) : null}
                              {group.admins.filter(
                                (admin) => admin.id === result.data.me.id
                              ).length > 0 ? (
                                <div className={styles.container}>
                                  <p className={styles.option}>Edit Group</p>
                                </div>
                              ) : null}
                              {group.admins.filter(
                                (admin) => admin.id === result.data.me.id
                              ).length > 0 ? (
                                <div className={styles.container}>
                                  <p className={styles.option}>Delete Group</p>
                                </div>
                              ) : null}
                            </aside>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </section>
          )}
        </section>
      </section>
      {popupSection === "Create_Bundle" ? (
        <CreateBundle
          setPopupSection={setPopupSection}
          reexecuteBundle={reexecuteBundle}
        />
      ) : popupSection === "New_Group" ? (
        <CreateGroup
          setPopupSection={setPopupSection}
          reexecuteGroups={reexecuteGroups}
        />
      ) : popupSection === "Invite_Users" ? (
        <InviteUsers
          setPopupSection={setPopupSection}
          groupName={groupName}
          groupId={groupId}
        />
      ) : null}
    </>
  );
}

export default Groups;
