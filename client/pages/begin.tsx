import { faArrowRight, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useMutation, useQuery } from "urql";
import Layout from "../components/layout";
import styles from "../styles/Begin.module.scss";
import { useRouter } from "next/router";
import BannerComp from "../components/begin/bannerComp";
import MobileMenu from "../components/begin/mobileMenuComp";

const Me = `
  query {
    me {
      paymentTier
      freeTrialed
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
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleFreeClick = () => {
    router.push(`/welcome?target_url=${encodeURIComponent("/begin")}`);
  };
  const handleStudentClick = () => {
    setLoading2(true);
    let mode;
    if (monthly) {
      mode = "monthly";
    } else {
      mode = "yearly";
    }
    const variables = {
      tier: "student",
      mode,
    };
    createSession(variables).then((res) => {
      setLoading2(false);
      if (res.data) {
        if (res.data.createStripeSession) {
          router.push(res.data.createStripeSession);
        }
      } else if (res.error) {
        router.push(`/welcome?target_url=${encodeURIComponent("/begin")}`);
      }
    });
  };
  const handleResearcherClick = () => {
    setLoading1(true);
    let mode;
    if (monthly) {
      mode = "monthly";
    } else {
      mode = "yearly";
    }
    const variables = {
      tier: "researcher",
      mode,
    };
    createSession(variables).then((res) => {
      setLoading1(false);
      if (res.data) {
        if (res.data.createStripeSession) {
          router.push(res.data.createStripeSession);
        }
      } else if (res.error) {
        router.push(`/welcome?target_url=${encodeURIComponent("/begin")}`);
      }
    });
  };

  return (
    <main className={styles.main}>
      <BannerComp isOpen={isOpen} setOpen={setOpen} />
      <MobileMenu isOpen={isOpen} />
      <header className={styles.head}>
        <h1 className={styles.title}>Which Untanglify is best for me?</h1>
        <p className={styles.byline}>
          <span className={styles.special}>*</span> Our prices are determined
          through customer surveys, so you pay only what is fair.
        </p>
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
              <p className={styles.feature}>
                {monthly ? "750,000 words / month" : "9,000,000 words / year"}
              </p>
            </div>
            {!meResult.fetching ? (
              meResult.data ? (
                meResult.data.me ? (
                  meResult.data.me.paymentTier === "Researcher" ? (
                    <button
                      className={styles.paymentBtn}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        cursor: "default",
                      }}
                      disabled={true}
                    >
                      {!loading1 ? (
                        (meResult.data &&
                          meResult.data.me &&
                          meResult.data.me.freeTrialed) ||
                        !monthly ? (
                          "Begin now"
                        ) : (
                          "Try for free"
                        )
                      ) : (
                        <div className={styles.loading2}></div>
                      )}
                    </button>
                  ) : (
                    <button
                      className={styles.paymentBtn}
                      onClick={handleResearcherClick}
                    >
                      {!loading1 ? (
                        meResult.data.me.freeTrialed || !monthly ? (
                          "Begin now"
                        ) : (
                          "Try for free"
                        )
                      ) : (
                        <div className={styles.loading2}></div>
                      )}
                    </button>
                  )
                ) : (
                  <button
                    className={styles.paymentBtn}
                    onClick={handleResearcherClick}
                  >
                    {!loading1 ? (
                      (meResult.data &&
                        meResult.data.me &&
                        meResult.data.me.freeTrialed) ||
                      !monthly ? (
                        "Begin now"
                      ) : (
                        "Try for free"
                      )
                    ) : (
                      <div className={styles.loading2}></div>
                    )}
                  </button>
                )
              ) : null
            ) : null}
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
              <p className={styles.feature}>
                {monthly ? "250,000 words / month" : "3,000,000 words / year"}
              </p>
            </div>
            {!meResult.fetching ? (
              meResult.data ? (
                meResult.data.me ? (
                  meResult.data.me.paymentTier === "Student" ||
                  meResult.data.me.paymentTier === "Researcher" ? (
                    <button
                      className={styles.paymentBtn}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        cursor: "default",
                      }}
                      disabled={true}
                    >
                      {!loading2 ? (
                        (meResult.data &&
                          meResult.data.me &&
                          meResult.data.me.freeTrialed) ||
                        !monthly ? (
                          "Begin now"
                        ) : (
                          "Try for free"
                        )
                      ) : (
                        <div className={styles.loading2}></div>
                      )}
                    </button>
                  ) : (
                    <button
                      className={styles.paymentBtn}
                      onClick={handleStudentClick}
                    >
                      {!loading2 ? (
                        (meResult.data &&
                          meResult.data.me &&
                          meResult.data.me.freeTrialed) ||
                        !monthly ? (
                          "Begin now"
                        ) : (
                          "Try for free"
                        )
                      ) : (
                        <div className={styles.loading2}></div>
                      )}
                    </button>
                  )
                ) : (
                  <button
                    className={styles.paymentBtn}
                    onClick={handleStudentClick}
                  >
                    {!loading2 ? (
                      (meResult.data &&
                        meResult.data.me &&
                        meResult.data.me.freeTrialed) ||
                      !monthly ? (
                        "Begin now"
                      ) : (
                        "Try for free"
                      )
                    ) : (
                      <div className={styles.loading2}></div>
                    )}
                  </button>
                )
              ) : null
            ) : null}
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
              <p className={styles.feature}>
                {monthly ? "25,000 words / month" : "300,000 words / year"}
              </p>
            </div>
            {!meResult.fetching ? (
              meResult.data ? (
                meResult.data.me ? (
                  <button
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      cursor: "pointer",
                    }}
                    className={styles.paymentBtn}
                    onClick={() => router.push("/home")}
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
  <Layout
    metaContent="Checkout Untanglify's plans to start saving hours of your time. Let's make reading online quick and effective."
    title="Begin now - Untanglify"
  >
    {page}
  </Layout>
);
export default Begin;
