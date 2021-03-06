import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import styles from "../../styles/Referral.module.scss";
import ListItem from "./listItemComp";
const Svg2 = dynamic(() => import("./svg2"));
const Svg3 = dynamic(() => import("./svg3"));
const Svg4 = dynamic(() => import("./svg4"));
import { useMutation, useQuery } from "urql";
import router from "next/router";

const Me = `
    query{
        me{
            referralCode
        }
    }
`;

const SendEmail = `
    mutation($email: String!){
      sendReferralEmail(email: $email)
    }
`;

function Tiers() {
  const [email, setEmail] = useState("");
  const [copy, setCopy] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState("");
  const [emailFailure, setEmailFailure] = useState("");
  const inputRef = useRef(null);

  const [result, reexecuteMe] = useQuery({ query: Me });
  const [emailResult, sendEmail] = useMutation(SendEmail);

  const handleCopy = (e) => {
    if (result.error) return;
    if (!result.data || !result.data.me || !result.data.me.referralCode) return;
    inputRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopy(true);
  };

  const handleSendEmail = () => {
    setEmailFailure("");
    setEmailSuccess("");
    sendEmail({ email }).then((res) => {
      if (res.data && res.data.sendReferralEmail) {
        setEmailSuccess("Successfully sent an invite!");
      } else {
        setEmailFailure("Whoops, something went wrong. Try again.");
      }
    });
  };

  return (
    <>
      <section id="referral" className={`${styles.tier3} ${styles.tier}`}>
        <div className={styles.container}>
          <div className={styles.top}>
            <p className={styles.byline}>REFERRAL LINK</p>
            <h2 className={styles.title}>
              Easily share your referral link with others
            </h2>
            <p className={styles.desc}>
              Simply provide your link to others and once they sign up both you
              and your friend will be acredited with your duly earned rewards!
            </p>
          </div>
        </div>
        <div className={styles.referContainer}>
          <div className={styles.inputContainer}>
            {copy ? (
              <div className={styles.copiedContainer}>
                <div className={styles.triangle}></div>
                <p className={styles.copyText}>Copied!</p>
              </div>
            ) : null}
            <input
              type="text"
              readOnly={true}
              value={
                result &&
                result.data &&
                result.data.me &&
                result.data.me.referralCode
                  ? `https://untanglify.com/${result.data.me.referralCode}`
                  : "You must login to see your referral link."
              }
              className={styles.copyLink}
              ref={inputRef}
            />
            <button
              className={styles.copyBtn}
              onClick={(e) => {
                if (
                  result &&
                  result.data &&
                  result.data.me &&
                  result.data.me.referralCode
                ) {
                  setTimeout(() => {
                    setCopy(false);
                  }, 3000);
                  handleCopy(e);
                } else {
                  router.push(
                    `/login?target_url=${encodeURIComponent(
                      "/referral#referral"
                    )}`
                  );
                }
              }}
            >
              {result &&
              result.data &&
              result.data.me &&
              result.data.me.referralCode
                ? "Copy Link"
                : "Login"}
            </button>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="email"
              readOnly={
                result &&
                result.data &&
                result.data.me &&
                result.data.me.referralCode
                  ? false
                  : true
              }
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder={
                result &&
                result.data &&
                result.data.me &&
                result.data.me.referralCode
                  ? "Your friend's email."
                  : "You must login to send an invite to a friend."
              }
              className={styles.copyLink}
              style={
                result &&
                result.data &&
                result.data.me &&
                result.data.me.referralCode
                  ? { cursor: "pointer" }
                  : null
              }
            />
            <button
              className={styles.copyBtn}
              onClick={() => {
                if (
                  result &&
                  result.data &&
                  result.data.me &&
                  result.data.me.referralCode
                ) {
                  handleSendEmail();
                } else {
                  router.push(
                    `/login?target_url=${encodeURIComponent(
                      "/referral#referral"
                    )}`
                  );
                }
              }}
            >
              {result &&
              result.data &&
              result.data.me &&
              result.data.me.referralCode
                ? "Share"
                : "Login"}
            </button>
          </div>
        </div>
      </section>
      <section className={`${styles.tier1} ${styles.tier}`}>
        <Svg2 />
        <div className={styles.container}>
          <div className={styles.top}>
            <p className={styles.byline}>FIRST 10 FRIENDS</p>
            <h2 className={styles.title}>Invite your friends</h2>
            <p className={styles.desc}>
              In this first referral tier, refering a friend grants the
              following benefits from Untanglify.
            </p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.bottom}>
            <ListItem purpleText={"+10,000"} text={"words / user"} />
            <ListItem purpleText={"10%"} text={"discount for you"} />
            <ListItem purpleText={"10%"} text={"discount for friend"} />
          </div>
        </div>
      </section>
      <section className={`${styles.tier2} ${styles.tier}`}>
        <div className={styles.container}>
          <div className={styles.top}>
            <p className={styles.byline}>BETWEEN 10-15 FRIENDS</p>
            <h2 className={styles.title}>Work with your colleagues</h2>
            <p className={styles.desc}>
              In our second referral tier, refering between 10 to 15 friends
              grants the following benefits from Untanglify.
            </p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.bottom}>
            <ListItem purpleText={"+15,000"} text={"words / user"} />
            <ListItem purpleText={"15%"} text={"discount for you"} />
            <ListItem purpleText={"10%"} text={"discount for friend"} />
          </div>
        </div>
        <Svg3 />
      </section>
      <section className={`${styles.tier1} ${styles.tier}`}>
        <Svg4 />
        <div className={styles.container}>
          <div className={styles.top}>
            <p className={styles.byline}>MORE THAN 15 FRIENDS</p>
            <h2 className={styles.title}>Get your network involved</h2>
            <p className={styles.desc}>
              Wow! If you reach the third tier in our referral program,
              referring more than 15 friends, you will be bestowed with the
              following from Untanglify.
            </p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.bottom}>
            <ListItem purpleText={"+20,000"} text={"words / user"} />
            <ListItem purpleText={"FREE"} text={"student plan"} />
            <ListItem purpleText={"10%"} text={"discount for friend"} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Tiers;
