import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/Welcome.module.scss";
import { useMutation } from "urql";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import SelectUsecaseComp from "../components/welcome/SelectUsecaseComp";
import ReturnButtonComp from "../components/welcome/ReturnButtonComp";
import MainSigninLoginComp from "../components/welcome/MainSigninLoginComp";
import { setAccessToken } from "../accesstoken";

const RegisterWebUser = `
    mutation($options: registerUserInput!) {
        registerWebUser(options: $options) {
          registered
          error {
            type
            message
          }
        }
    }
`;
const RegisterGoogleUser = `
    mutation($token: String!, $usecase: String!, $referral: String) {
        registerGoogleUser(token: $token, usecase: $usecase, referral: $referral) {
          accessToken
        }
    }
`;
const VerifyGoogleUser = `
    mutation($token: String, $sub: String) {
      verifyGoogleUser(token: $token, sub: $sub) {
        logged
        accessToken
      }
    }
`;
const VerifyWebUser = `
    mutation($email: String!, $password: String!) {
      verifyUser(email: $email, password: $password) {
        logged
        error {
          message
        }
        accessToken
      }
    }
`;

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

function Welcome() {
  const router = useRouter();

  const { target_url, referral } = router.query;
  const [usecase, setUseCase] = useState("");
  const [section, setSection] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [revealPass, setRevealPass] = useState(false);
  const [slide, setSlide] = useState(1);
  const [signin, setSignin] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [url, setUrl] = useState("");
  const [disabledLoginAttempt, setDisableLoginAttempt] = useState(false);
  const [username, setUsername] = useState("");

  const [webResult, registerWebUser] = useMutation(RegisterWebUser);
  const [googleResult, registerGoogleUser] = useMutation(RegisterGoogleUser);
  const [verifyGoogleResult, verifyGoogleUser] = useMutation(VerifyGoogleUser);
  const [verifyWebResult, verifyWebUser] = useMutation(VerifyWebUser);

  useEffect(() => {
    if (target_url) {
      setUrl(decodeURIComponent(target_url as any));
    }
  }, [target_url]);

  const handleResponseGoogle = (data) => {
    const token = data.tokenId;
    if (signin) {
      const usecaseVariable = usecase;
      const variables = {
        token,
        usecase: usecaseVariable,
        referral,
      };
      registerGoogleUser(variables).then((response) => {
        if (response) {
          if (response.data) {
            if (response.data.registerGoogleUser.accessToken === "") {
              setErrorMsg("User with that email already exists.");
              setError(true);
            } else {
              setAccessToken(response.data.registerGoogleUser.accessToken);
              if (url) {
                router.push(url);
              } else {
                router.push("/begin");
              }
            }
          }
        }
      });
    } else {
      if (disabledLoginAttempt) return;
      verifyGoogleUser({ token }).then((response) => {
        if (response) {
          if (response.data) {
            if (response.data.verifyGoogleUser) {
              if (response.data.verifyGoogleUser.logged) {
                setAccessToken(response.data.verifyGoogleUser.accessToken);
                if (url) {
                  router.push(url);
                } else {
                  router.push("/begin");
                }
              } else {
                setDisableLoginAttempt(true);
                setErrorMsg(
                  "No user with that Google account exists. Create an account first."
                );
                setTimeout(() => {
                  setDisableLoginAttempt(false);
                }, 5000);
              }
            }
          }
        }
      });
    }
  };
  const handleResponseGoogleFailure = () => {};
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (signin) {
      const variables = {
        options: {
          email,
          password,
          reason: usecase,
          referral,
          username,
        },
      };
      registerWebUser(variables).then((response) => {
        if (response) {
          if (response.data) {
            if (response.data.registerWebUser) {
              if (!response.data.registerWebUser.registered) {
                setError(true);
                setErrorMsg(response.data.registerWebUser.error.message);
              } else {
                router.push(
                  `/users/verification?email=${encodeURIComponent(
                    email
                  )}&url=${encodeURIComponent(url)}`
                );
              }
            }
          }
        }
      });
    } else {
      const variables = {
        email,
        password,
      };
      if (disabledLoginAttempt) return;
      verifyWebUser(variables).then((response) => {
        if (response) {
          if (response.data) {
            if (response.data.verifyUser) {
              if (!response.data.verifyUser.logged) {
                setDisableLoginAttempt(true);
                setError(true);
                setErrorMsg(response.data.verifyUser.error.message);
                setTimeout(() => {
                  setDisableLoginAttempt(false);
                }, 5000);
              } else {
                setAccessToken(response.data.verifyUser.accessToken);
                if (url) {
                  router.push(url);
                } else {
                  router.push("/begin");
                }
              }
            }
          }
        }
      });
    }
  };

  return (
    <main className={styles.main}>
      {section === 0 ? (
        <SelectUsecaseComp
          setUseCase={setUseCase}
          setSection={setSection}
          section={section}
        />
      ) : section === 1 ? (
        <>
          <ReturnButtonComp setSection={setSection} section={section} />
          <div className={styles.accountType}>
            <p className={styles.type}>{usecase}</p>
          </div>
          <MainSigninLoginComp
            setSignin={setSignin}
            signin={signin}
            handleSubmit={handleSubmit}
            setEmail={setEmail}
            setError={setError}
            setPassword={setPassword}
            revealPass={revealPass}
            setRevealPass={setRevealPass}
            slide={slide}
            error={error}
            errorMsg={errorMsg}
            handleResponseGoogle={handleResponseGoogle}
            handleResponseGoogleFailure={handleResponseGoogleFailure}
            setSlide={setSlide}
            disabledLoginAttempt={disabledLoginAttempt}
            setUsername={setUsername}
          />
        </>
      ) : null}
    </main>
  );
}

Welcome.getLayout = (page) => {
  return (
    <Layout
      metaContent="Summarize any text with Untanglify, saving you hours of your time. Start saving time for free with our Google Chrome Extension."
      title="Welcome! - Summarizer"
    >
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
export default Welcome;
