import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../../styles/Begin.module.scss";

function Questions() {
  const [active, setActive] = useState({});

  console.log(active);

  return (
    <>
      <header className={styles.faqHeader}>
        <h3 className={styles.title}>Questions & answers</h3>
        <p className={styles.subtitle}>
          Can&apos;t find what you need?{" "}
          <Link href="/contact" passHref>
            <span className={styles.special}>Contact Support.</span>
          </Link>
        </p>
      </header>
      <section className={styles.faqContainer}>
        <div
          className={styles.top}
          onClick={() => {
            if (active[1]) {
              const current = active;
              current[1] = false;
              setActive({ ...current });
            } else {
              const current = active;
              current[1] = true;
              setActive({ ...current });
            }
          }}
        >
          <p className={styles.question}>What is meant by words? </p>
          <div className={styles.circle}>
            {active[1] ? (
              <FontAwesomeIcon icon={faTimes} className={styles.times} />
            ) : (
              <FontAwesomeIcon icon={faPlus} className={styles.icon} />
            )}
          </div>
        </div>
        {active[1] ? (
          <div className={styles.bottom}>
            Words are the currency on Untanglify. The word count of the text you
            want to summarize is subtracted from your total remaining words
            after summarization. <br />
            <br />
            Your remaining number of words for the month are available in the
            top right of the extension or on the{" "}
            <Link href="/users/settings/" passHref>
              <span className={styles.special}>settings page.</span>
            </Link>
          </div>
        ) : null}
      </section>
      <section className={styles.faqContainer}>
        <div
          className={styles.top}
          onClick={() => {
            if (active[2]) {
              const current = active;
              current[2] = false;
              setActive({ ...current });
            } else {
              const current = active;
              current[2] = true;
              setActive({ ...current });
            }
          }}
        >
          <p className={styles.question}>Do you offer refunds?</p>
          <div className={styles.circle}>
            {active[2] ? (
              <FontAwesomeIcon icon={faTimes} className={styles.times} />
            ) : (
              <FontAwesomeIcon icon={faPlus} className={styles.icon} />
            )}
          </div>
        </div>
        {active[2] ? (
          <div className={styles.bottom}>
            We offer refunds on a case-by-case basis. If you would like to file
            for a refund please{" "}
            <Link href="/contact" passHref>
              <span className={styles.special}>contact support.</span>
            </Link>
            <br />
            <br />
            We do our best to limit refunds by allowing users access to the
            product for free on a limited feature basis as well as by offering
            seven day free trials of our paid plans.
          </div>
        ) : null}
      </section>
      <section className={styles.faqContainer}>
        <div
          className={styles.top}
          onClick={() => {
            if (active[3]) {
              const current = active;
              current[3] = false;
              setActive({ ...current });
            } else {
              const current = active;
              current[3] = true;
              setActive({ ...current });
            }
          }}
        >
          <p className={styles.question}>
            Why was I declined from a free trial?
          </p>
          <div className={styles.circle}>
            {active[3] ? (
              <FontAwesomeIcon icon={faTimes} className={styles.times} />
            ) : (
              <FontAwesomeIcon icon={faPlus} className={styles.icon} />
            )}
          </div>
        </div>
        {active[3] ? (
          <div className={styles.bottom}>
            The most likely scenario is that your credit card has been used for
            a trial before. <br />
            <br />
            We use credit card fingerprints to detect whether a credit card has
            been used. Free trials are expensive for us, so we do our best to
            limit trial spamming. The funds we save here can be better put
            towards improving Untanglify for everyone.
            <br />
            <br />
            If you believe this is a mistake, please{" "}
            <Link href="/contact" passHref>
              <span className={styles.special}>contact support.</span>
            </Link>
          </div>
        ) : null}
      </section>
      <section className={styles.faqContainer}>
        <div
          className={styles.top}
          onClick={() => {
            if (active[4]) {
              const current = active;
              current[4] = false;
              setActive({ ...current });
            } else {
              const current = active;
              current[4] = true;
              setActive({ ...current });
            }
          }}
        >
          <p className={styles.question}>How can I activate a free trial?</p>
          <div className={styles.circle}>
            {active[4] ? (
              <FontAwesomeIcon icon={faTimes} className={styles.times} />
            ) : (
              <FontAwesomeIcon icon={faPlus} className={styles.icon} />
            )}
          </div>
        </div>
        {active[4] ? (
          <div className={styles.bottom}>
            Users are given a free trial by default, simply click "Begin now" on
            the plan you want to trial and it will be added. Allowing everyone
            to experience the most we offer is one of our primary objectives.
          </div>
        ) : null}
      </section>
      <section className={styles.faqContainer}>
        <div
          className={styles.top}
          onClick={() => {
            if (active[5]) {
              const current = active;
              current[5] = false;
              setActive({ ...current });
            } else {
              const current = active;
              current[5] = true;
              setActive({ ...current });
            }
          }}
        >
          <p className={styles.question}>
            What kind of information do you collect?
          </p>
          <div className={styles.circle}>
            {active[5] ? (
              <FontAwesomeIcon icon={faTimes} className={styles.times} />
            ) : (
              <FontAwesomeIcon icon={faPlus} className={styles.icon} />
            )}
          </div>
        </div>
        {active[5] ? (
          <div className={styles.bottom}>
            All of the data we collect can be found in our{" "}
            <Link href="/privacy" passHref>
              <span className={styles.special}>privacy policy.</span>
            </Link>{" "}
            <br />
            <br />
            Aidan built Untanglify with privacy in mind and has made it his
            promise that your data never be sold or used for purposes that do
            not benefit you as our user.
          </div>
        ) : null}
      </section>
      <section className={styles.faqContainer}>
        <div
          className={styles.top}
          onClick={() => {
            if (active[6]) {
              const current = active;
              current[6] = false;
              setActive({ ...current });
            } else {
              const current = active;
              current[6] = true;
              setActive({ ...current });
            }
          }}
        >
          <p className={styles.question}>
            How can I be sure my payment information is safe?
          </p>
          <div className={styles.circle}>
            {active[6] ? (
              <FontAwesomeIcon icon={faTimes} className={styles.times} />
            ) : (
              <FontAwesomeIcon icon={faPlus} className={styles.icon} />
            )}
          </div>
        </div>
        {active[6] ? (
          <div className={styles.bottom}>
            We don&apos;t even trust ourselves with your payment information,
            that&apos;s why we&apos;ve outsourced to Stripe.
            <br />
            <br />
            You can read more about Stripe&apos;s{" "}
            <Link href="https://stripe.com/docs/security/stripe#ssl" passHref>
              <span className={styles.special}>
                state-of-the-art security here.
              </span>
            </Link>
            <br />
            <br />
            Even though it&apos;s more expensive on our end, it&apos;s a small
            price to pay for keeping your information safe.
          </div>
        ) : null}
      </section>
      <section className={styles.faqContainer}>
        <div
          className={styles.top}
          onClick={() => {
            if (active[7]) {
              const current = active;
              current[7] = false;
              setActive({ ...current });
            } else {
              const current = active;
              current[7] = true;
              setActive({ ...current });
            }
          }}
        >
          <p className={styles.question}>Are my summaries private?</p>
          <div className={styles.circle}>
            {active[7] ? (
              <FontAwesomeIcon icon={faTimes} className={styles.times} />
            ) : (
              <FontAwesomeIcon icon={faPlus} className={styles.icon} />
            )}
          </div>
        </div>
        {active[7] ? (
          <div className={styles.bottom}>
            While we love our community and treasure sharing summaries between
            users, it&apos;s your experience and therefore your decision.
            <br />
            <br /> Our extension has a private button that makes any summary
            private. Summaries can be privated on the home page. You can even
            make your summaries private by default on the{" "}
            <Link href="/users/settings" passHref>
              <span className={styles.special}>settings page.</span>
            </Link>
          </div>
        ) : null}
      </section>
      <section className={styles.faqContainer}>
        <div
          className={styles.top}
          onClick={() => {
            if (active[8]) {
              const current = active;
              current[8] = false;
              setActive({ ...current });
            } else {
              const current = active;
              current[8] = true;
              setActive({ ...current });
            }
          }}
        >
          <p className={styles.question}>How accurate are the summaries?</p>
          <div className={styles.circle}>
            {active[8] ? (
              <FontAwesomeIcon icon={faTimes} className={styles.times} />
            ) : (
              <FontAwesomeIcon icon={faPlus} className={styles.icon} />
            )}
          </div>
        </div>
        {active[8] ? (
          <div className={styles.bottom}>
            Our state-of-the-art AI is the most accurate on the market right now
            and is improving everyday. With that being said however, sometimes
            its summaries can come up short.
            <br />
            <br />
            In our experience, with smaller word counts the AI returns more of
            the original text. Also, the more niche the topic the less accurate
            the summaries will be.
            <br />
            <br />
            Test for yourself before you pay using our free trials or freemium.
          </div>
        ) : null}
      </section>
    </>
  );
}

export default Questions;
