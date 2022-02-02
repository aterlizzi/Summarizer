import {
  faChevronLeft,
  faChevronRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "urql";
import styles from "../../styles/components/DefaultDisplay.module.scss";

const ReturnRecentSummaries = `
    query {
        returnUserSummaries {
            summary
            title
            url
            id
        }
    }
`;

function Slider({ type, title }) {
  const router = useRouter();
  const [returnSummariesResult, rexecuteReturnSummaries] = useQuery({
    query: ReturnRecentSummaries,
    pause: type !== "recentReads",
  });

  console.log(returnSummariesResult);

  return (
    <section className={styles.slider}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.arrowContainer}>
          <div className={styles.circle}>
            <FontAwesomeIcon icon={faChevronLeft} className={styles.icon} />
          </div>
          <div className={styles.circle}>
            <FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
          </div>
        </div>
      </header>
      <div className={styles.sliderContainer}>
        {returnSummariesResult.data &&
        returnSummariesResult.data.returnUserSummaries ? (
          returnSummariesResult.data.returnUserSummaries.map((summary) => {
            return (
              <section className={styles.card} key={summary.id}>
                <div className={styles.top}>
                  <div className={styles.circle}>
                    <FontAwesomeIcon icon={faUser} className={styles.icon} />
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
        ) : (
          <div className={styles.loader}></div>
        )}
      </div>
    </section>
  );
}

export default Slider;
