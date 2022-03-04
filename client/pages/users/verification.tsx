import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import VerificationInput from "react-verification-input";
import { useMutation } from "urql";
import { setAccessToken } from "../../accesstoken";
import Layout from "../../components/layout";
import styles from "../../styles/Verification.module.scss";

const ConfirmUser = `
    mutation($code: String!){
      confirmUser(code: $code){
        accessToken
      }
    }
`;

const Resend = `
    mutation($email: String!){
      resend(email: $email)
    }
`;

function Verification() {
  const router = useRouter();
  const { email, url } = router.query;

  const [code, setCode] = useState(0);
  const [codeError, setCodeError] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");

  const [confirmResult, confirmUser] = useMutation(ConfirmUser);
  const [resendResult, resend] = useMutation(Resend);

  const handleResend = () => {
    setResendSuccess("");
    setCodeError("");
    resend({ email }).then((res) => {
      if (res.data && res.data.resend) {
        setResendSuccess("Successfully resent verification code.");
      } else {
        setCodeError("Failed to resend verification code.");
      }
    });
  };

  const handleVerificationCode = () => {
    setResendSuccess("");
    setCodeError("");
    if (code.toString().length === 4) {
      confirmUser({ code: code.toString() }).then((res) => {
        if (res.data && res.data.confirmUser.accessToken !== "") {
          setAccessToken(res.data.confirmUser.accessToken);
          if (url) {
            router.push(url as any);
          } else {
            router.push("/begin");
          }
        } else {
          setCodeError("Incorrect verification code, please try again.");
        }
      });
    } else {
      setCodeError("Code must be 4 characters long.");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h3 className={styles.title}>Verification</h3>
        </header>
        <div className={styles.content}>
          <FontAwesomeIcon icon={faUserLock} className={styles.icon} />
          <p className={styles.instructions}>
            Please enter the verification code we sent to {email}.
          </p>
          <VerificationInput
            validChars="0-9"
            onChange={(value: any) => setCode(value)}
            length={4}
            removeDefaultStyles={true}
            classNames={{
              container: styles.container,
              character: styles.character,
              characterInactive: styles.characterInactive,
              characterSelected: styles.characterSelected,
            }}
          />
          {codeError !== "" ? (
            <p className={styles.error}>{codeError}</p>
          ) : null}
          {resendSuccess !== "" ? (
            <p className={styles.success}>{resendSuccess}</p>
          ) : null}
          <button className={styles.verify} onClick={handleVerificationCode}>
            {confirmResult.fetching ? (
              <div className={styles.loader}></div>
            ) : (
              "Verify"
            )}
          </button>
          {resendResult.fetching ? (
            <div className={styles.loader}></div>
          ) : (
            <p className={styles.resend} onClick={handleResend}>
              Resend code
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

Verification.getLayout = (page) => {
  return (
    <Layout metaContent="" title="Verify Account - Untanglify">
      {page}
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.cookies.hasOwnProperty("jid")) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Verification;
