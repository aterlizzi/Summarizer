import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/Welcome.module.scss";
import { useMutation } from "urql";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import SelectUsecaseComp from "../components/welcome/SelectUsecaseComp";
import ReturnButtonComp from "../components/welcome/ReturnButtonComp";
import MainSigninLoginComp from "../components/welcome/MainSigninLoginComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import VerificationInput from "react-verification-input";

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
    mutation($token: String!, $usecase: String!) {
        registerGoogleUser(token: $token, usecase: $usecase) {
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

function Welcome() {
  const router = useRouter();

  const { target_url } = router.query;
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
  const [code, setCode] = useState(0);

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
      };
      registerGoogleUser(variables).then((response) => {
        console.log(response);
        if (response) {
          if (response.data) {
            if (response.data.registerGoogleUser.accessToken === "") {
              setErrorMsg("User with that email already exists.");
              setError(true);
            } else {
              localStorage.setItem(
                "accessToken",
                response.data.registerGoogleUser.accessToken
              );
              setSection(2);
            }
          }
        }
      });
    } else {
      verifyGoogleUser({ token }).then((response) => {
        if (response) {
          if (response.data) {
            if (response.data.verifyGoogleUser) {
              if (response.data.verifyGoogleUser.logged) {
                localStorage.setItem(
                  "accessToken",
                  response.data.verifyGoogleUser.accessToken
                );
                setSection(2);
              } else {
                setErrorMsg(
                  "No user with that Google account exists. Create an account first."
                );
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
                setSection(2);
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
      verifyWebUser(variables).then((response) => {
        if (response) {
          if (response.data) {
            if (response.data.verifyUser) {
              if (!response.data.verifyUser.logged) {
                setError(true);
                setErrorMsg(response.data.verifyUser.error.message);
              } else {
                localStorage.setItem(
                  "accessToken",
                  response.data.verifyUser.accessToken
                );
                setSection(2);
              }
            }
          }
        }
      });
    }
  };

  const handleVerificationCode = () => {};

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
          />
        </>
      ) : (
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
            <button className={styles.verify} onClick={handleVerificationCode}>
              Verify
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

Welcome.getLayout = (page) => {
  return <Layout title="Welcome! - Summarizer">{page}</Layout>;
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
