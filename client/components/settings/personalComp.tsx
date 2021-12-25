import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import styles from "../../styles/Settings.module.scss";

const Me = `
query {
  me{
      username
      email
      prem
  }
}
`;

const ChangeEmail = `
    mutation($email: String!){
        changeEmail(email: $email) {
            success
            error
        }
    }
`;

const ChangeName = `
    mutation($name: String!){
        changeName(name: $name)
    }
`;

const CreateCustomerPortal = `
    mutation{
      createCustomerPortal
    }
`;

function Personal() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState({ type: "", msg: "" });

  const [changed, setChanged] = useState(false);

  const [meResult, reexecuteMe] = useQuery({ query: Me });
  const [emailResult, changeEmail] = useMutation(ChangeEmail);
  const [nameResult, changeName] = useMutation(ChangeName);
  const [portalResult, createCustomerPortal] =
    useMutation(CreateCustomerPortal);

  useEffect(() => {
    if (name !== "") {
      setChanged(true);
    }
    if (
      meResult.data &&
      meResult.data.me &&
      meResult.data.me.email !== email &&
      email !== ""
    ) {
      setChanged(true);
    }
  }, [name, email]);

  const handleSave = () => {
    if (
      meResult.data &&
      meResult.data.me &&
      email !== meResult.data.me.email &&
      email !== ""
    ) {
      changeEmail({ email }).then((res) => {
        if (res.data && res.data.changeEmail && !res.data.changeEmail.success) {
          setError(res.data.changeEmail.error);
        } else if (
          res.data &&
          res.data.changeEmail &&
          res.data.changeEmail.success
        ) {
          setSuccess({ type: "email", msg: "Successfully updated email." });
        }
      });
    }
    if (
      meResult.data &&
      meResult.data.me &&
      name !== meResult.data.me.username &&
      name !== ""
    ) {
      changeName({ name }).then((res) => {
        if (res.data && res.data.changeName) {
          setSuccess({ type: "name", msg: "Successfully updated name." });
        }
      });
    }
  };

  const handlePortal = () => {
    createCustomerPortal().then((res) => {
      if (res.data && res.data.createCustomerPortal !== "") {
        router.push(res.data.createCustomerPortal);
      }
    });
  };
  const handleCancel = () => {
    setError("");
    setEmail("");
    setName("");
    setSuccess({ type: "", msg: "" });
  };
  return (
    <section className={styles.personal}>
      <div className={styles.personalContainer}>
        <p className={styles.contact}>Contact Name</p>
        <form action="" className={styles.contactForm}>
          <label htmlFor="" className={styles.label}>
            Full Name
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder={
              meResult.data && meResult.data.me && meResult.data.me.username
                ? meResult.data.me.username
                : null
            }
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <p className={styles.desc}>
            ** Contact names act like usernames, they are completely optional
            and are only used in emails.
          </p>
          {success.type === "name" ? (
            <p className={styles.success}>{success.msg}</p>
          ) : null}
        </form>
      </div>
      <div className={styles.personalContainer}>
        <p className={styles.contact}>Email</p>
        <form action="" className={styles.contactForm}>
          <label htmlFor="" className={styles.label}>
            Account Email
          </label>
          <input
            type="email"
            className={styles.input}
            placeholder={
              meResult.data && meResult.data.me && meResult.data.me.email
                ? meResult.data.me.email
                : null
            }
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          {error !== "" ? <p className={styles.error}>{error}</p> : null}
          {success.type === "email" ? (
            <p className={styles.success}>{success.msg}</p>
          ) : null}
        </form>
      </div>
      {meResult.data && meResult.data.me && meResult.data.me.prem ? (
        <div className={styles.personalContainer}>
          <p className={styles.contact}>Customer Portal</p>
          <div className={styles.contactForm}>
            <button onClick={handlePortal} className={styles.customerPortal}>
              {portalResult.fetching ? (
                <div className={styles.loading}></div>
              ) : (
                "Enter Portal"
              )}
            </button>
            <p className={styles.desc}>
              ** Inside the Customer Portal you can
              <span style={{ color: "#bb86fc" }}> cancel </span>and
              <span style={{ color: "#bb86fc" }}> update </span>
              subscriptions.
            </p>
          </div>
        </div>
      ) : null}
      {changed ? (
        <div className={styles.btnContainer}>
          <button className={styles.save} onClick={handleSave}>
            {emailResult.fetching ? (
              <div className={styles.loading}></div>
            ) : (
              "Save"
            )}
          </button>
          <button className={styles.cancel} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : null}
    </section>
  );
}

export default Personal;
