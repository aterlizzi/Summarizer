import React, { useState } from "react";
import { useMutation } from "urql";
import styles from "../../styles/Home.module.scss";

const SendEmail = `
  mutation($email: String!){
    sendUserInterest(email: $email)
  }
`;

function UnderConstruction() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const [emailResult, sendEmail] = useMutation(SendEmail);

  const handleSendEmail = (e) => {
    e.preventDefault();
    setSuccess(false);
    sendEmail({ email }).then((res) => {
      console.log(res);
      if (res.data && res.data.sendUserInterest) {
        setSuccess(true);
      }
    });
  };
  return (
    <div className={styles.constructionCard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Invite only!</h1>
        <p className={styles.desc}>
          We love the passion, but we are in closed beta right now. If
          you&apos;d like an invite, submit your email below and we&apos;ll
          email you with next steps.
        </p>
      </header>
      <div className={styles.emailSubmit}>
        <form action="" onSubmit={handleSendEmail} className={styles.form}>
          <input
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="email"
            className={styles.input}
            placeholder="Your email"
            required
          />
          <button className={styles.btn}>
            {emailResult.fetching ? (
              <div className={styles.loader}></div>
            ) : (
              "Join"
            )}
          </button>
        </form>
      </div>
      {success ? (
        <p className={styles.success}>
          Received your request, I'll follow up soon.
        </p>
      ) : null}
    </div>
  );
}

export default UnderConstruction;
