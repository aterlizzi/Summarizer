import dynamic from "next/dynamic";
import {
  faChevronLeft,
  faChevronRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery } from "urql";
import styles from "../../styles/components/DefaultDisplay.module.scss";
const PostSettings = dynamic(() => import("./PostSettings"));
import StarRating from "./StarRating";

const ReturnRecentSummaries = `
    query {
        returnUserSummaries {
            summary
            title
            url
            id
            rating
        }
    }
`;
const SendAidanFriendRequest = `
    mutation{
      sendAidanFriendRequest
    }
`;
const ReturnFriendsRecentSummaries = `
    query{
      returnFriendsRecentSummaries{
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
interface SliderProps {
  title: string;
  type: string;
  data?: any;
  bundleResult?: any;
  reexecuteBundle: any;
}

function Slider({
  type,
  title,
  data,
  bundleResult,
  reexecuteBundle,
}: SliderProps) {
  const router = useRouter();
  const [returnSummariesResult, rexecuteReturnSummaries] = useQuery({
    query: ReturnRecentSummaries,
    pause: type !== "recentReads",
  });
  const [returnFriendsSummariesResult, rexecuteReturnFriendsSummaries] =
    useQuery({
      query: ReturnFriendsRecentSummaries,
      pause: type !== "friendsReads",
    });
  const [sendAidanFriendRequestResult, sendAidanFriendRequest] = useMutation(
    SendAidanFriendRequest
  );

  return (
    <section className={styles.slider}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.arrowContainer}>
          {type === "recentReads" ? (
            data &&
            data.data &&
            data.data.me &&
            data.data.me.paymentTier !== "Free" ? (
              <div className={styles.see}>
                <p className={styles.seeall}>See all</p>
              </div>
            ) : null
          ) : (
            <>
              <div className={styles.circle}>
                <FontAwesomeIcon icon={faChevronLeft} className={styles.icon} />
              </div>
              <div className={styles.circle}>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={styles.icon}
                />
              </div>
            </>
          )}
        </div>
      </header>
      <div className={styles.sliderContainer}>
        {type === "recentReads" &&
        returnSummariesResult.data &&
        returnSummariesResult.data.returnUserSummaries &&
        returnSummariesResult.data.returnUserSummaries.length > 0 ? (
          returnSummariesResult.data.returnUserSummaries.map((summary) => {
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
                    </div>
                    <PostSettings
                      summaryId={summary.id}
                      bundleResult={bundleResult}
                      reexecuteBundle={reexecuteBundle}
                    />
                  </div>
                  <h4 className={styles.title}>
                    {summary.title ? summary.title : "Untitled"}
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
                <StarRating currentRating={summary.rating} id={summary.id} />
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
                    onClick={() => router.push(`/summaries/${summary.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    Summary
                  </p>
                </div>
              </section>
            );
          })
        ) : type === "friendsReads" &&
          returnFriendsSummariesResult.data &&
          returnFriendsSummariesResult.data.returnFriendsRecentSummaries &&
          returnFriendsSummariesResult.data.returnFriendsRecentSummaries
            .length > 0 ? (
          returnFriendsSummariesResult.data.returnFriendsRecentSummaries.map(
            (summary) => {
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
                          {summary.user.username}
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
                  <StarRating currentRating={summary.rating} id={summary.id} />
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
                      onClick={() => router.push(`/summaries/${summary.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      Summary
                    </p>
                  </div>
                </section>
              );
            }
          )
        ) : returnFriendsSummariesResult.fetching ||
          returnSummariesResult.fetching ? (
          <div className={styles.loader}></div>
        ) : returnSummariesResult.data &&
          returnSummariesResult.data.returnUserSummaries.length === 0 ? (
          <section className={styles.card}>
            <div className={styles.top}>
              <h4 className={styles.title}>
                You haven&apos;t summarized anything recently.
              </h4>
              <p className={styles.summary}>
                Summaries can be created through the Google Chrome Extension for
                free!
              </p>
            </div>
          </section>
        ) : returnFriendsSummariesResult.data &&
          returnFriendsSummariesResult.data.returnFriendsRecentSummaries
            .length === 0 ? (
          <section className={styles.card}>
            <div className={styles.top}>
              <h4 className={styles.title}>
                You haven&apos;t added any friends yet!
              </h4>
              <p className={styles.summary}>
                Search for friends in the search bar above or refer a friend by
                <span
                  onClick={() => router.push("/referral")}
                  style={{ color: "#bb86fc", cursor: "pointer" }}
                >
                  {" "}
                  clicking here.
                </span>{" "}
                I&apos;m always here for you too,{" "}
                <span
                  onClick={() =>
                    sendAidanFriendRequest().then((res) => {
                      if (res.data && res.data.sendAidanFriendRequest) {
                        rexecuteReturnFriendsSummaries();
                      }
                    })
                  }
                  style={{ color: "#bb86fc", cursor: "pointer" }}
                >
                  click me
                </span>{" "}
                to add me to your friendslist, I am told I need some.
              </p>
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}

export default Slider;
