import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation } from "urql";
import { setAccessToken } from "../accesstoken";
import Layout from "../components/layout";
import MainSigninLoginComp from "../components/welcome/MainSigninLoginComp";
import styles from "../styles/Welcome.module.scss";

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
        registerGoogleUser(token: $token, usecase: $usecase)
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

function Login() {
  const router = useRouter();

  const { target_url } = router.query;

  const [usecase, setUseCase] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [revealPass, setRevealPass] = useState(false);
  const [slide, setSlide] = useState(1);
  const [signin, setSignin] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [url, setUrl] = useState("");
  const [disabledLoginAttempt, setDisableLoginAttempt] = useState(false);
  const [section, setSection] = useState(0);
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
      };
      registerGoogleUser(variables).then((response) => {
        if (response) {
          if (response.data) {
            if (response.data.registerGoogleUser.accessToken === "") {
              setErrorMsg("User with that email already exists.");
              setError(true);
            } else {
              setAccessToken(response.data.registerGoogleUser.accessToken);
              router.push("/begin");
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
                router.push(url);
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
                router.push(url);
              }
            }
          }
        }
      });
    }
  };
  return (
    <main className={styles.main}>
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
    </main>
  );
}

Login.getLayout = (page) => {
  return (
    <Layout
      metaContent="Log in now to start saving hours of your time."
      title="Login - Untanglify"
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
export default Login;
