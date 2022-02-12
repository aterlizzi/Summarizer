import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation } from "urql";
import { setAccessToken } from "../../../accesstoken";
import Layout from "../../../components/layout";
import Loader from "../../../components/zoteroAuth/loaderComp";
import styles from "../../../styles/ForgotPassToken.module.scss";

const ConfirmForgotPassword = `
  mutation($token: String!){
    confirmForgotPassword(token: $token)
  }
`;

const ChangePassword = `
  mutation($password: String!, $id: Float!){
    changePassword(password: $password, id: $id){
      accessToken
    }
  }
`;

function ForgotPassToken() {
  const router = useRouter();
  const { forgotPassToken } = router.query;

  const [confirmResult, confirm] = useMutation(ConfirmForgotPassword);
  const [changeResult, change] = useMutation(ChangePassword);

  console.log(changeResult);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [displayPass, setDisplayPass] = useState(false);
  const [revealPass, setRevealPass] = useState(false);
  const [revealConfirmPass, setRevealConfirmPass] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (forgotPassToken) {
      confirm({ token: forgotPassToken }).then((res) => {
        if (res.data && res.data.confirmForgotPassword !== "") {
          setUserId(res.data.confirmForgotPassword);
          setDisplayPass(true);
        } else {
          setError(
            "Whoops! This isn't a valid page. It happens, just click me to redirect."
          );
        }
      });
    }
  }, [forgotPassToken, confirm]);

  const handleChangePass = () => {
    if (!displayPass) return;
    if (password.length < 8 || password !== confirmPass) return;
    change({ id: parseInt(userId), password }).then((res) => {
      if (
        res.data &&
        res.data.changePassword &&
        res.data.changePassword.accessToken !== ""
      ) {
        setAccessToken(res.data.changePassword.accessToken);
        router.push("/");
      }
    });
  };

  return (
    <main className={styles.main}>
      {displayPass ? (
        <section className={styles.passContainer}>
          <header className={styles.head}>
            <h1 className={styles.title}>Create new password</h1>
            <p className={styles.desc}>
              Enter a new password 8 characters or more. We recommend using your
              browsers suggestion.
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
            <p className={styles.subDesc}>Must be at least 8 characters.</p>
            <label htmlFor="confirmPass" className={styles.label}>
              Confirm Password
            </label>
            <div className={styles.inputContainer}>
              <input
                name="confirmPass"
                id="confirmPass"
                type={revealConfirmPass ? "text" : "password"}
                className={styles.input}
                onChange={(e) => setConfirmPass(e.currentTarget.value)}
              />
              <FontAwesomeIcon
                icon={revealConfirmPass ? faEyeSlash : faEye}
                className={styles.icon}
                onClick={() => setRevealConfirmPass(!revealConfirmPass)}
              />
            </div>
            <p className={styles.subDesc}>Both passwords must match.</p>
          </div>
          <button
            className={
              password.length < 8 || password !== confirmPass
                ? `${styles.disabledBtn}`
                : `${styles.activeBtn}`
            }
            disabled={password.length < 8 || password !== confirmPass}
            onClick={handleChangePass}
          >
            {changeResult.fetching ? (
              <div className={styles.loading}></div>
            ) : (
              "Change Password"
            )}
          </button>
        </section>
      ) : error == "" ? (
        <Loader />
      ) : (
        <section className={styles.errorContainer}>
          <h1 className={styles.emoji}>( ͡❛ ︵ ͡❛)</h1>
          <Link href="/" passHref>
            <p className={styles.msg}>{error}</p>
          </Link>
        </section>
      )}
    </main>
  );
}

ForgotPassToken.getLayout = (page) => {
  return (
    <Layout metaContent="" title="Forgot Password - Untanglify">
      {page}
    </Layout>
  );
};
export default ForgotPassToken;
