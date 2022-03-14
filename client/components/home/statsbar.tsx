import dynamic from "next/dynamic";
import React from "react";
import styles from "../../styles/Home.module.scss";
const RiceSvg = dynamic(() => import("./riceSvg"));
import Image from "next/image";
import mit from "../../public/MIT.png";
import uva from "../../public/UVA-Logo.png";
import berkeley from "../../public/berkeley.png";
import { useQuery } from "urql";

const TotalWords = `
  query{
    totalWordsSummarized
  }
`;

function StatsBar({ type }) {
  const [result, reexecuteWords] = useQuery({ query: TotalWords });

  return (
    <div className={styles.statsbar}>
      {type === "usedby" ? (
        <h4 className={styles.statsPara}>
          Proud to be used by researchers and students from:
        </h4>
      ) : null}
      <div className={styles.statsGrid}>
        {type === "usedby" ? (
          <>
            <div className={styles.image}>
              <RiceSvg />
            </div>
            <div className={`${styles.image} ${styles.mit}`}>
              <Image src={mit} alt="MIT logo" />
            </div>
            <div className={`${styles.image} ${styles.uva}`}>
              <Image src={uva} alt="UVA logo" />
            </div>
            <div className={`${styles.image} ${styles.berkeley}`}>
              <Image src={berkeley} alt="Berkeley logo" />
            </div>
          </>
        ) : null}
        {type === "stats" ? (
          <>
            <div className={styles.statContainer}>
              <h4 className={styles.stat}>
                {result && result.data && result.data.totalWordsSummarized
                  ? Number(result.data.totalWordsSummarized).toLocaleString()
                  : "1,093,021"}
              </h4>
              <p className={styles.statWords}>total words summarized</p>
            </div>
            <div className={styles.statContainer}>
              <h4 className={styles.stat}>
                {" "}
                {result && result.data && result.data.totalWordsSummarized
                  ? Math.ceil(result.data.totalWordsSummarized / 250 / 60)
                  : "72"}
              </h4>
              <p className={styles.statWords}>hours saved</p>
            </div>
            <div className={styles.statContainer}>
              <h4 className={styles.stat}>
                {result && result.data && result.data.totalWordsSummarized
                  ? "$" +
                    Number(
                      Math.ceil(
                        (result.data.totalWordsSummarized / 1000000) *
                          41535 *
                          0.21 // median income in us is 41535, reading 10 books avgs 21% higher income
                      )
                    ).toLocaleString()
                  : "$9,536"}
              </h4>
              <p className={styles.statWords}>
                total indirect earnings this year
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default StatsBar;
