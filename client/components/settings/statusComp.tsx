import React, { useState } from "react";
import styles from "../../styles/Settings.module.scss";
import { useRouter } from "next/router";
import { useMutation } from "urql";

const DeleteUser = `
    mutation {
        deleteUser
    }
`;

function Status() {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [word, setWord] = useState("");

  const [result, deleteUser] = useMutation(DeleteUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word !== "DELETE") {
      setConfirm(false);
      return;
    }
    deleteUser().then((res) => {
      if (res.data && res.data.deleteUser) {
        localStorage.clear();
        router.push("/users/offboard");
      } else {
        router.push("/users/settings?account=true");
      }
    });
  };

  return (
    <section className={styles.status}>
      <header className={styles.statusHeader}>
        <h4 className={styles.title}>Delete Account?</h4>
      </header>
      <div className={styles.content}>
        <p className={styles.text}>
          {!confirm
            ? "Deleting your account removes all of your information from our database. Only use this if you do not intend to return to Untanglify."
            : "This is an irreversible process, are you sure you want to delete your account?"}
        </p>
        {!confirm ? (
          <button
            type="button"
            className={styles.btn}
            onClick={() => setConfirm(true)}
          >
            Delete
          </button>
        ) : null}
      </div>
      {confirm ? (
        <section className={styles.confirm}>
          <div className={styles.features}>
            <h4 className={styles.title}>Thank you, really!</h4>
            <p className={styles.message}>
              Your use has helped to make Untanglify a better application for
              everyone. While we are sad to see you go, we wish you the best of
              luck on your endeavours and hope to see you around as we continue
              to develop a better application.
            </p>
            <h5 className={styles.extra}>Before deleting, know this:</h5>
            <ul className={styles.list}>
              <li className={styles.item}>
                Deletion is a permanent action, you can't undo this!
              </li>
              <li className={styles.item}>
                You can cancel your subscription{" "}
                <span
                  onClick={() => {
                    if (router) {
                      router.push("/users/settings?account=true");
                    }
                  }}
                  className={styles.redirect}
                >
                  here.
                </span>
              </li>
              <li className={styles.item}>
                You can contact us if you're having any difficulties{" "}
                <span
                  className={styles.redirect}
                  onClick={() => {
                    if (router) {
                      router.push("/contact");
                    }
                  }}
                >
                  here.
                </span>
              </li>
              <li className={styles.item}>
                You do not have to delete your account to change your email or
                password. Those can be changed{" "}
                <span
                  className={styles.redirect}
                  onClick={() => {
                    if (router) {
                      router.push("/users/settings?personal=true");
                    }
                  }}
                >
                  here.
                </span>
              </li>
            </ul>
          </div>
          <form className={styles.form} action="" onSubmit={handleSubmit}>
            <label htmlFor="delete" className={styles.label}>
              Please type DELETE to confirm.
            </label>
            <input
              type="text"
              className={styles.input}
              onChange={(e) => setWord(e.currentTarget.value)}
            />
            <div className={styles.btnContainer}>
              {word === "DELETE" ? (
                <input
                  type="submit"
                  value="Delete My Account"
                  className={styles.confirmBtn}
                />
              ) : null}
              <button
                onClick={() => {
                  setConfirm(false);
                  setWord("");
                }}
                type="button"
                className={styles.cancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </section>
  );
}

export default Status;
