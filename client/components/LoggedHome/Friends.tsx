import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import styles from "../../styles/components/Friends.module.scss";
import { useQuery } from "urql";
import StarRating from "./Friends/StarRatingFriends";
import PostSettings from "./Friends/PostSettingsFriends";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import CreateBundle from "./Friends/CreateBundleFriends";

const ReturnFriendsRecentSummaries = `
    query($take: Float!){
      returnFriendsRecentSummaries(take: $take){
        summary
        title
        url
        rating
        id
        user{
          username
        }
      }
    }
`;

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
  const router = useRouter();
  const [take, setTake] = useState(20);
  const [returnFriendsSummariesResult, rexecuteReturnFriendsSummaries] =
    useQuery({
      query: ReturnFriendsRecentSummaries,
      variables: { take },
    });

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
        <div className={styles.grid}>
          {returnFriendsSummariesResult.data &&
          returnFriendsSummariesResult.data.returnFriendsRecentSummaries
            .length > 0
            ? returnFriendsSummariesResult.data.returnFriendsRecentSummaries.map(
                (summary, idx) => {
                  return (
                    <section className={styles.card} key={summary.id}>
                      <div className={styles.top}>
                        <div className={styles.userContainer}>
                          <div className={styles.left}>
                            <div className={styles.circle}>
                              <FontAwesomeIcon
                                icon={faUser}
                                className={styles.icon}
                              />
                            </div>
                            <p className={styles.usernameText}>
                              {summary && summary.user && summary.user.username
                                ? summary.user.username
                                : "Anonymous"}
                            </p>
                          </div>
                          <PostSettings
                            summaryId={summary.id}
                            bundleResult={bundleResult}
                            reexecuteBundle={reexecuteBundle}
                          />
                        </div>
                        <h4 className={styles.title}>
                          {summary
                            ? summary.title
                              ? summary.title
                              : "Untitled"
                            : null}
                        </h4>
                        <p className={styles.summary}>
                          {summary.summary.length > 100
                            ? summary.summary
                                .split("")
                                .filter((_, idx) => {
                                  if (idx > 100) return false;
                                  return true;
                                })
                                .join("") + "..."
                            : summary.summary}
                        </p>
                      </div>
                      <StarRating
                        currentRating={summary.rating}
                        id={summary.id}
                      />
                      <div className={styles.bottom}>
                        <a
                          className={styles.link}
                          href={summary.url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Article
                        </a>
                        <p
                          className={styles.link}
                          aria-label="Click to visit summary."
                          onClick={() =>
                            router.push(`/summaries/${summary.id}`)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          Summary
                        </p>
                      </div>
                    </section>
                  );
                }
              )
            : null}
        </div>
        <div className={styles.loadmoreContainer}>
          <button
            className={styles.loadmorebtn}
            onClick={() => setTake(take + 20)}
          >
            Load more
          </button>
        </div>
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

export default Friends;
