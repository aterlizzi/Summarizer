import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "urql";
import styles from "../../styles/Onboarding.module.scss";
import Link from "next/link";
const Svg = dynamic(() => import("./svg"));
const Svg2 = dynamic(() => import("./svg2"));
const Svg3 = dynamic(() => import("./svg3"));

const Me = `
    query{
        me{
            prem
            onboardCompleted
        }
    }
`;

function Popup({ setPopup }) {
  const router = useRouter();
  const [failedTrial, setFailedTrial] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [popupState, setPopupState] = useState(0);

  const [result, reexecuteMe] = useQuery({ query: Me });

  const { session_id } = router.query;

  //   if trial fails, set the failed trial.
  useEffect(() => {
    if (session_id && result.data && result.data.me && !result.data.me.prem) {
      setFailedTrial(true);
    }
    if (!session_id) {
      setPopup(false);
    }
  }, [session_id, result, setPopup]);

  useEffect(() => {
    if (result.data && result.data.me && result.data.me.onboardCompleted) {
      setOnboarded(true);
    }
  }, [result]);

  return (
    <section className={styles.popup}>
      {popupState === 0 ? (
        <>
          <div className={styles.top}>
            <Svg failed={failedTrial} />
          </div>
          <div className={styles.bot}>
            <header className={styles.header}>
              <h3 className={styles.title}>
                {!failedTrial ? "Hi there" : "Whoops!"}
              </h3>
              <p className={styles.desc}>
                {!failedTrial && !onboarded
                  ? `Let's get the show on the road. Complete the tutorial for the chance
            to win some pretty big prizes.`
                  : !failedTrial && onboarded
                  ? "Let's get the show on the road. We've detected that you've gone through this process before, so unfortunately you won't be eligible for the prizes at the end."
                  : "We only allow one free trial per credit card! This is done to prevent trial spamming as trials are quite expensive for us to give out. If you think this is a mistake, please contact support."}
              </p>
              {failedTrial ? (
                <p className={styles.error}>
                  You can purchase access to the product{" "}
                  <span className={styles.link}>
                    <Link href="/begin">here.</Link>
                  </span>
                </p>
              ) : null}
            </header>
            <div className={styles.content}>
              <div className={styles.slider}>
                <div
                  className={styles.section1}
                  style={
                    popupState === 0
                      ? { background: "rgba(255, 255, 255, 0.87)" }
                      : null
                  }
                ></div>
                <div
                  className={styles.section2}
                  onClick={() => setPopupState(1)}
                ></div>
                <div
                  className={styles.section3}
                  onClick={() => setPopupState(2)}
                ></div>
              </div>
              <button
                className={styles.btn}
                style={failedTrial ? { background: "#cf6679" } : null}
                onClick={() => {
                  setPopupState(popupState + 1);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : popupState === 1 ? (
        <>
          <div className={styles.top}>
            <Svg2 />
          </div>
          <div className={styles.bot}>
            <header className={styles.header}>
              <h3 className={styles.title}>What&apos;s this?</h3>
              <p className={styles.desc}>
                In an effort to catapult you into summarizing, we&apos;ll walk
                you through the most important aspects of the extension. Upon
                completion of the tutorial, you&apos;ll be rewarded with some
                more words, and the chance to win stuff even greater than
                knowledge itself, wild.
              </p>
            </header>
            <div className={styles.content}>
              <div className={styles.slider}>
                <div
                  className={styles.section1}
                  onClick={() => setPopupState(0)}
                ></div>
                <div
                  className={styles.section2}
                  style={
                    popupState === 1
                      ? { background: "rgba(255, 255, 255, 0.87)" }
                      : null
                  }
                ></div>
                <div
                  className={styles.section3}
                  onClick={() => setPopupState(2)}
                ></div>
              </div>
              <button
                className={styles.btn}
                onClick={() => {
                  setPopupState(popupState + 1);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : popupState === 2 ? (
        <>
          <div className={styles.top}>
            <Svg3 />
          </div>
          <div className={styles.bot}>
            <header className={styles.header}>
              <h3 className={styles.title}>How?</h3>
              <p className={styles.desc}>
                Just follow the steps on the page to complete the tutorial. No
                words will be deducted for any of the steps in the tutorial.
                Happy summarizing!
              </p>
            </header>
            <div className={styles.content}>
              <div className={styles.slider}>
                <div
                  className={styles.section1}
                  onClick={() => setPopupState(0)}
                ></div>
                <div
                  className={styles.section2}
                  onClick={() => setPopupState(1)}
                ></div>
                <div
                  className={styles.section3}
                  style={
                    popupState === 2
                      ? { background: "rgba(255, 255, 255, 0.87)" }
                      : null
                  }
                ></div>
              </div>
              <button
                className={styles.btn}
                onClick={() => {
                  setPopup(false);
                }}
              >
                Begin Tutorial
              </button>
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}

export default Popup;
