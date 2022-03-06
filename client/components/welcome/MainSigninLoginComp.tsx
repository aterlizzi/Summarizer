import dynamic from "next/dynamic";

import {
  faChevronLeft,
  faChevronRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import styles from "../../styles/Welcome.module.scss";
const Svg4 = dynamic(() => import("./svg4"));
import Image from "next/image";
import logo from "../../public/favicon.png";
import googleLogo from "../../public/googleLogo.png";
import ForgotPassword from "./ForgotPasswordComp";
import router, { useRouter } from "next/router";

function MainSigninLoginComp({
  setSignin,
  signin,
  handleSubmit,
  setEmail,
  setError,
  setPassword,
  revealPass,
  setRevealPass,
  slide,
  error,
  errorMsg,
  handleResponseGoogle,
  handleResponseGoogleFailure,
  setSlide,
  disabledLoginAttempt,
  setUsername,
}) {
  const router = useRouter();
  const [forgotPass, setForgotPass] = useState(false);
  return (
    <div className={styles.gridWrap}>
      <section className={styles.left}>
        {!forgotPass ? (
          <>
            <section className={styles.top}>
              <div className={styles.logoContainer}>
                <Image src={logo} alt="Logo for Untanglify" />
              </div>
              <button
                className={styles.signinBtn}
                onClick={() => setSignin(!signin)}
              >
                {signin ? "Sign in" : "Sign up"}
              </button>
            </section>
            <header className={styles.registerHeader}>
              <h5 className={styles.tagLine}>Save time for free</h5>
              <h3 className={styles.registerTitle}>
                {signin ? "Create your account" : "Sign in to your account"}
              </h3>
            </header>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
              {signin ? (
                <>
                  <label htmlFor="" className={styles.formLabel}>
                    Username
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter your username:"
                    required
                    onChange={(e) => {
                      setUsername(e.currentTarget.value);
                      setError(false);
                    }}
                  />
                </>
              ) : null}
              <label htmlFor="" className={styles.formLabel}>
                Email
              </label>
              <input
                type="email"
                className={styles.input}
                placeholder="Enter your email:"
                required
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                  setError(false);
                }}
              />
              <label htmlFor="" className={styles.formLabel}>
                Password
              </label>
              <div className={styles.inputContainer}>
                <input
                  type={revealPass ? "text" : "password"}
                  className={styles.input}
                  placeholder="Enter your password:"
                  required
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                    setError(false);
                  }}
                />
                <FontAwesomeIcon
                  icon={revealPass ? faEyeSlash : faEye}
                  className={styles.icon}
                  onClick={() => setRevealPass(!revealPass)}
                />
              </div>
              {signin ? (
                <div className={styles.checkbox}>
                  <input
                    type="checkbox"
                    id="check"
                    name="check"
                    className={styles.box}
                    required
                  />
                  <label htmlFor="check" className={styles.label}>
                    By clicking, you consent to our{" "}
                    <span
                      className={styles.special}
                      onClick={() => {
                        router.push("/privacy");
                      }}
                    >
                      Privacy Policy
                    </span>{" "}
                    &{" "}
                    <span
                      className={styles.special}
                      onClick={() => router.push("/terms")}
                    >
                      Terms of Service
                    </span>
                  </label>
                </div>
              ) : null}
              <p
                className={styles.forgotPass}
                onClick={() => setForgotPass(true)}
              >
                Forgot password? Click me.
              </p>
              <input
                type="submit"
                value={signin ? "Sign up" : "Sign in"}
                className={styles.submitBtn}
              />
              {error || disabledLoginAttempt ? (
                <div className={styles.errorContainer}>
                  <p className={styles.error}>
                    {error
                      ? errorMsg
                      : "Whoops, please wait a few seconds before trying to login."}
                  </p>
                </div>
              ) : null}
              <div className={styles.divider}>
                <p className={styles.or}>or</p>
              </div>
              <GoogleLogin
                clientId={
                  process.env.NODE_ENV !== "production"
                    ? "809640821095-m0pfdn66qus97vnuspui18qh4eu2vsvg.apps.googleusercontent.com"
                    : "809640821095-a0ajq6tgr8hc8ejj3jp4225rnm6r6a11.apps.googleusercontent.com"
                }
                buttonText="Login with Google"
                onSuccess={handleResponseGoogle}
                onFailure={handleResponseGoogleFailure}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className={styles.loginGoogle}
                  >
                    <div className={styles.googleLogo}>
                      <Image src={googleLogo} alt="Google Logo"></Image>
                    </div>
                    {signin ? "Sign up with Google" : "Sign in with Google"}
                  </button>
                )}
              />
            </form>
          </>
        ) : (
          <ForgotPassword setForgotPass={setForgotPass} />
        )}
      </section>
      <section className={styles.right}>
        <Svg4 />
        <section
          className={styles.rightContent}
          style={forgotPass ? { marginBottom: "3em" } : null}
        >
          <h5 className={styles.tagLine}>Untanglify</h5>
          <h3 className={styles.mainTag}>
            {slide === 1
              ? "Start for free and save hours of your time with the click of a button."
              : slide === 2
              ? "See what your friends are reading by adding them as friends and creating groups."
              : slide === 3
              ? "Create bundles of articles, rate your favorite reads, and discover new passions."
              : null}
          </h3>
          <div className={styles.bottomContainer}>
            <div className={styles.circles}>
              <div
                className={styles.circle}
                style={
                  slide === 1
                    ? { background: "rgba(255, 255, 255, 0.87)" }
                    : { background: "rgba(255, 255, 255, 0.116)" }
                }
              ></div>
              <div
                className={styles.circle}
                style={
                  slide === 2
                    ? { background: "rgba(255, 255, 255, 0.87)" }
                    : { background: "rgba(255, 255, 255, 0.116)" }
                }
              ></div>
              <div
                className={styles.circle}
                style={
                  slide === 3
                    ? { background: "rgba(255, 255, 255, 0.87)" }
                    : { background: "rgba(255, 255, 255, 0.116)" }
                }
              ></div>
            </div>
            <div className={styles.controls}>
              <div
                className={styles.leftControl}
                onClick={() => {
                  if (slide === 1) {
                    setSlide(3);
                  } else {
                    setSlide(slide - 1);
                  }
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} className={styles.icon} />
              </div>
              <div
                className={styles.rightControl}
                onClick={() => {
                  if (slide === 3) {
                    setSlide(1);
                  } else {
                    setSlide(slide + 1);
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={styles.icon}
                />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default MainSigninLoginComp;
