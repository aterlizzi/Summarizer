import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useMutation } from "urql";
import styles from "../../styles/Welcome.module.scss";

const ChangePassword = `
    mutation($email: String!){
        forgotPassword(email: $email)
    }
`;

function ForgotPassword({ setForgotPass }) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const [result, changePass] = useMutation(ChangePassword);

  const handleChangePassword = () => {
    setSuccess("");
    if (!email) return;
    changePass({ email }).then((res) => {
      if (res.data && res.data.forgotPassword) {
        setSuccess(res.data.forgotPassword);
      }
    });
  };

  return (
    <>
      <div className={styles.backBtn} onClick={() => setForgotPass(false)}>
        <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
        <p className={styles.back}>Back</p>
      </div>
      <section className={styles.forgotPassContainer}>
        <header className={styles.head} style={{ marginTop: "3em" }}>
          <h3 className={styles.title}>Reset password</h3>
          <p className={styles.desc}>
            Enter the email associated with your account and we&apos;ll send an
            email with instructions to reset your password.
          </p>
        </header>
        <div className={styles.inputSection}>
          <label htmlFor="email" className={styles.label}>
            Email address
          </label>
          <input
            type="email"
            className={styles.input}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          {success !== "" ? <p className={styles.success}>{success}</p> : null}
        </div>
        <button className={styles.btn} onClick={handleChangePassword}>
          {result.fetching ? (
            <div className={styles.loader}></div>
          ) : (
            "Send Instructions"
          )}
        </button>
      </section>
    </>
  );
}

export default ForgotPassword;
