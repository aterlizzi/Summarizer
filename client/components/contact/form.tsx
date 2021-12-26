import React, { useState } from "react";
import { useMutation } from "urql";
import styles from "../../styles/Contact.module.scss";

const SendEmail = `
    mutation($options: ContactInput!){
        contact(options: $options)
    }
`;
function Form() {
  const [success, setSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const [result, sendMail] = useMutation(SendEmail);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    sendMail({ options: { firstName, lastName, subject, email, text } }).then(
      (res) => {
        if (res.data && res.data.contact) {
          setSuccess(true);
        }
      }
    );
  };

  return (
    <div className={styles.formContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
      </header>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.nameContainer}>
          <div className={styles.labelContainer}>
            <label htmlFor="first" className={styles.label}>
              First name<span className={styles.special}>*</span>
            </label>
            <input
              type="text"
              required
              name="first"
              id="first"
              placeholder="Jane"
              className={styles.input}
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
          </div>
          <div className={styles.labelContainer}>
            <label htmlFor="last" className={styles.label}>
              Last name<span className={styles.special}>*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Doe"
              name="last"
              id="last"
              className={styles.input}
              onChange={(e) => setLastName(e.currentTarget.value)}
            />
          </div>
        </div>
        <label htmlFor="email" className={styles.label}>
          Email<span className={styles.special}>*</span>
        </label>
        <input
          type="email"
          required
          placeholder="jane.doe@example.com"
          name="email"
          id="email"
          className={styles.input}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label htmlFor="subject" className={styles.label}>
          Subject<span className={styles.special}>*</span>
        </label>
        <input
          type="text"
          required
          name="subject"
          id="subject"
          placeholder="Subject"
          className={styles.input}
          onChange={(e) => setSubject(e.currentTarget.value)}
        />
        <label htmlFor="help" className={styles.label}>
          How can we help?<span className={styles.special}>*</span>
        </label>
        <textarea
          name="help"
          required
          placeholder="How can we help?"
          id="help"
          className={styles.textarea}
          onChange={(e) => setText(e.currentTarget.value)}
          style={!success ? { marginBottom: "1em" } : null}
        ></textarea>
        {success ? (
          <p className={styles.success}>
            Successfully sent an email! We will get back to you as soon as
            possible.
          </p>
        ) : null}
        <button className={styles.btn}>
          {result.fetching ? (
            <div className={styles.loading}></div>
          ) : (
            "Send Email"
          )}
        </button>
      </form>
    </div>
  );
}

export default Form;
