import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "urql";
import styles from "../../../styles/ForgotPassToken.module.scss";

const ChangeEmailRequest = `
  mutation($token: String!, $password: String!){
    confirmChangeEmail(token: $token, password: $password)
  }
`;

function ChangeEmail() {
  const router = useRouter();
  const { changeEmailToken } = router.query;

  const [result, changeEmail] = useMutation(ChangeEmailRequest);

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [revealPass, setRevealPass] = useState(false);
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setSuccess(false);
    setFailure(false);
    e.preventDefault();
    changeEmail({ token: changeEmailToken, password }).then((res) => {
      if (res.data && res.data.confirmChangeEmail) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 5000);
      } else {
        setFailure(true);
      }
    });
  };

  return (
    <main className={styles.main}>
      <section className={styles.passContainer}>
        <header className={styles.head}>
          <h1 className={styles.title}>Enter Your Password</h1>
          <p className={styles.desc}>
            We require you to enter your password before your email is changed
            for security purposes.
          </p>
        </header>
        <div className={styles.inputSection}>
          <label htmlFor="pass" className={styles.label}>
            Password
          </label>
          <div className={styles.inputContainer}>
            <input
              name="pass"
              id="pass"
              type={revealPass ? "text" : "password"}
              className={styles.input}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <FontAwesomeIcon
              icon={revealPass ? faEyeSlash : faEye}
              className={styles.icon}
              onClick={() => setRevealPass(!revealPass)}
            />
          </div>
          <p className={styles.subDesc}>
            Your password must be your current valid password.
          </p>
        </div>
        <button
          className={
            password.length < 8
              ? `${styles.disabledBtn}`
              : `${styles.activeBtn}`
          }
          disabled={password.length < 8}
          onClick={handleChangeEmail}
        >
          Change Email
        </button>
        {failure ? (
          <p className={styles.failure}>
            Something went wrong, make sure your password is correct.
          </p>
        ) : null}
        {success ? (
          <p className={styles.success}>Successfully changed your email.</p>
        ) : null}
      </section>
    </main>
  );
}

export default ChangeEmail;
