import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "urql";
import styles from "../../styles/components/DefaultDisplay.module.scss";

const CreateNewBundle = `
    mutation($options: CreateBundleInput!){
        createBundle(options: $options)
    }
`;

function CreateBundle({ setPopupSection, reexecuteBundle }) {
  const [characterCount, setCharacterCount] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [createResult, createBundle] = useMutation(CreateNewBundle);

  const node = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    createBundle({ options: { title, description } }).then((res) => {
      if (res.data && res.data.createBundle) {
        setPopupSection("");
        reexecuteBundle();
      }
    });
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (node.current && !node.current.contains(e.target)) {
        setPopupSection("");
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <section className={styles.createBundleCard} ref={node}>
        <header className={styles.header}>
          <h3 className={styles.title}>Create a new Bundle</h3>
          <div className={styles.exit} onClick={() => setPopupSection("")}>
            <div className={styles.exit1}></div>
            <div className={styles.exit2}></div>
          </div>
        </header>
        <form
          action=""
          className={styles.basicSettings}
          onSubmit={handleSubmit}
        >
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Provide your bundle with a title"
            required
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <label htmlFor="desc" className={styles.label}>
            Write a description
          </label>
          <textarea
            name="desc"
            id="desc"
            className={styles.textarea}
            onChange={(e) => {
              setCharacterCount(e.currentTarget.value.length);
              setDescription(e.currentTarget.value);
            }}
          ></textarea>
          <p
            className={styles.count}
            style={characterCount > 500 ? { color: "#cf6679" } : null}
          >
            {characterCount} / 500
          </p>
          <button
            className={styles.btn}
            style={
              characterCount > 500
                ? {
                    background: "transparent",
                    border: "2px solid rgba(255, 255, 255, 0.08)",
                    cursor: "default",
                  }
                : null
            }
            disabled={characterCount > 500}
          >
            {createResult.fetching ? (
              <div className={styles.loader}></div>
            ) : (
              "Create Bundle"
            )}
          </button>
        </form>
      </section>
    </div>
  );
}

export default CreateBundle;
