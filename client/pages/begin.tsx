import { faArrowRight, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useMutation, useQuery } from "urql";
import Layout from "../components/layout";
import styles from "../styles/Begin.module.scss";
import { useRouter } from "next/router";

const Me = `
  query {
    me {
      paymentTier
    }
  }
`;
const CreateSession = `
  mutation($mode: String!, $tier: String!) {
    createStripeSession(mode: $mode, tier: $tier)
  }

`;

function Begin() {
  const router = useRouter();

  const [meResult, reexecuteMe] = useQuery({ query: Me });
  const [sessionResult, createSession] = useMutation(CreateSession);

  const [monthly, setMonthly] = useState(true);
  const [tier, setTier] = useState("");
  const [mode, setMode] = useState("");

  const handleFreeClick = () => {
    router.push("/welcome");
  };
  const handleStudentClick = () => {
    setTier("student");
    monthly ? setMode("monthly") : setMode("yearly");
    const variables = {
      tier,
      mode,
    };
    createSession(variables).then((res) => {
      console.log(res);
      if (res.data) {
        if (res.data.createStripeSession) {
          router.push(res.data.createStripeSession);
        }
      }
    });
  };
  const handleResearcherClick = () => {
    setTier("researcher");
    monthly ? setMode("monthly") : setMode("yearly");
    const variables = {
      tier,
      mode,
    };
    createSession(variables).then((res) => {
      if (res.data) {
        if (res.data.createStripeSession) {
          router.push(res.data.createStripeSession);
        }
      }
    });
  };

  return (
    <main className={styles.main}>
      <header className={styles.head}>
        <h1 className={styles.title}>Which Untanglify is best for me?</h1>
        <div className={styles.switchPayment}>
          <button
            style={
              monthly
                ? { background: "#4740d1" }
                : { background: "transparent" }
            }
            className={styles.monthly}
            onClick={() => setMonthly(true)}
          >
            Pay Monthly
          </button>
          <button
            style={
              !monthly
                ? { background: "#4740d1" }
                : { background: "transparent" }
            }
            className={styles.yearly}
            onClick={() => setMonthly(false)}
          >
            Pay Yearly
          </button>
        </div>
      </header>
      <section className={styles.cardContainer}>
        <div className={styles.card}>
          <header className={styles.cardHeader}>
            <h3 className={styles.title}>Researcher</h3>
            <div className={styles.priceContainer}>
              {!monthly ? <p className={styles.prevPrice}>11.99</p> : null}
              <h5 className={styles.price}>
                {monthly ? 11.99 : 9.99}{" "}
                <span className={styles.special}>/ month</span>
              </h5>
            </div>
            {!monthly ? (
              <p className={styles.yearPrice}>
                Pay 119.99 <span className={styles.specialTwo}>/ year</span>
              </p>
            ) : null}
            <p className={styles.desc}>
              Simplify your workflow by quickly summarizing research papers into
              one digestible paragraph.
            </p>
          </header>
          <section className={styles.content}>
            <div className={styles.featureContainer}>
              <div className={styles.circle}>
                <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
              </div>
              <p className={styles.feature}>
                <strong>Everything in Student</strong>
              </p>
            </div>
            <div className={styles.featureContainer}>
              <div className={styles.circle}>
                <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
              </div>
              <p className={styles.feature}>Super Untanglifier access</p>
            </div>
            <div className={styles.featureContainer}>
              <div className={styles.circle}>
                <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
              </div>
              <p className={styles.feature}>1,000,000 words</p>
            </div>
            <button
              className={styles.paymentBtn}
              onClick={handleResearcherClick}
            >
              Try for free
            </button>
          </section>
        </div>
        <div className={styles.card}>
          <header className={styles.cardHeader}>
            <h3 className={styles.title}>Student</h3>
            <div className={styles.priceContainer}>
              {!monthly ? <p className={styles.prevPrice}>5.99</p> : null}
              <h5 className={styles.price}>
                {monthly ? 5.99 : 4.37}{" "}
                <span className={styles.special}>/ month</span>
              </h5>
            </div>
            {!monthly ? (
              <p className={styles.yearPrice}>
                Pay 52.99 <span className={styles.specialTwo}>/ year</span>
              </p>
            ) : null}
            <p className={styles.desc}>
              Free up your time by uploading school readings and gettings
              summaries back in seconds.
            </p>
          </header>
          <section className={styles.content}>
            <div className={styles.featureContainer}>
              <div className={styles.circle}>
                <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
              </div>
              <p className={styles.feature}>
                <strong>Everything in Free</strong>
              </p>
            </div>
            <div className={styles.featureContainer}>
              <div className={styles.circle}>
                <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
              </div>
              <p className={styles.feature}>Upload PDFs</p>
            </div>
            <div className={styles.featureContainer}>
              <div className={styles.circle}>
                <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
              </div>
              <p className={styles.feature}>Manual text access</p>
            </div>
            <div className={styles.featureContainer}>
              <div className={styles.circle}>
                <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
              </div>
              <p className={styles.feature}>500,000 words</p>
            </div>
            <button className={styles.paymentBtn} onClick={handleStudentClick}>
              Try for free
            </button>
          </section>
        </div>
        <div className={styles.card}>
          <header className={styles.cardHeader}>
            <h3 className={styles.title}>Free</h3>
            <div className={styles.priceContainer}>
              <h5 className={styles.price}>0</h5>
            </div>
            <p className={styles.desc}>
              Bypass misleading article titles by quickly summarizing articles
              on the web.
            </p>
          </header>
          <section className={styles.content}>
            <div className={styles.featureContainer}>
              <div className={styles.circle}>
                <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
              </div>
              <p className={styles.feature}>Summarize article access</p>
            </div>
            <div className={styles.featureContainer}>
              <div className={styles.circle}>
                <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
              </div>
              <p className={styles.feature}>Summarize highlighted access</p>
            </div>
            <div className={styles.featureContainer}>
              <div className={styles.circle}>
                <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
              </div>
              <p className={styles.feature}>25,000 words</p>
            </div>
            {!meResult.fetching ? (
              meResult.data ? (
                meResult.data.me ? (
                  <button
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      cursor: "default",
                    }}
                    disabled={true}
                    className={styles.paymentBtn}
                  >
                    Get started
                  </button>
                ) : (
                  <button
                    className={styles.paymentBtn}
                    onClick={handleFreeClick}
                  >
                    Get started
                  </button>
                )
              ) : null
            ) : null}
          </section>
        </div>
      </section>
    </main>
  );
}

Begin.getLayout = (page) => (
  <Layout title="Begin now - Untanglify">{page}</Layout>
);
export default Begin;
