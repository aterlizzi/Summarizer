import {
  faChevronLeft,
  faChevronRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import GoogleLogin from "react-google-login";
import styles from "../../styles/Welcome.module.scss";
import Svg4 from "./svg4";
import Image from "next/image";
import logo from "../../public/favicon.png";
import googleLogo from "../../public/googleLogo.png";

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
}) {
  return (
    <div className={styles.gridWrap}>
      <section className={styles.left}>
        <section className={styles.top}>
          <div className={styles.logoContainer}>
            <Image src={logo} />
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
          <label htmlFor="" className={styles.formLabel}>
            Email
          </label>
          <input
            type="email"
            className={styles.input}
            placeholder="Enter your email:"
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
          <input
            type="submit"
            value={signin ? "Sign up" : "Sign in"}
            className={styles.submitBtn}
          />
          {error ? (
            <div className={styles.errorContainer}>
              <p className={styles.error}>{errorMsg}</p>
            </div>
          ) : null}
          <div className={styles.divider}>
            <p className={styles.or}>or</p>
          </div>
          <GoogleLogin
            clientId="210066948522-7af1f1tshqc33ku849gdjflhlv6df3dc.apps.googleusercontent.com"
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
      </section>
      <section className={styles.right}>
        <Svg4 />
        <section className={styles.rightContent}>
          <h5 className={styles.tagLine}>Untanglify</h5>
          <h3 className={styles.mainTag}>
            Start for free and save hours of your time with the click of a
            button.
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
