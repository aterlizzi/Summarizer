import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/components/Bundle.module.scss";
import { useMutation } from "urql";

const EditBundleRequest = `
    mutation($bundleId: Float!, $options: EditBundleInput!){
        editBundle(bundleId: $bundleId, options: $options)
    }
`;

function EditBundle({
  setPopupSection,
  reexecuteReturnBundle,
  id,
  bundleResult,
  reexecuteSideBarBundle,
}) {
  const [characterCount, setCharacterCount] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editResult, editBundle] = useMutation(EditBundleRequest);

  const node = useRef(null);
  const descElement = useRef(null);
  const titleElement = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    editBundle({ bundleId: id, options: { title, description } }).then(
      (res) => {
        if (res.data && res.data.editBundle) {
          reexecuteReturnBundle();
          reexecuteSideBarBundle();
          setPopupSection("");
        }
      }
    );
  };

  useEffect(() => {
    titleElement.current.value = bundleResult.data.returnBundle.title;

    if (bundleResult.data.returnBundle.description !== undefined) {
      descElement.current.value = bundleResult.data.returnBundle.description;
      setCharacterCount(
        bundleResult.data.returnBundle.description.split("").length
      );
    }
  }, []);

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
  }, [setPopupSection]);

  return (
    <div className={styles.wrapper}>
      <section className={styles.createBundleCard} ref={node}>
        <header className={styles.header}>
          <h3 className={styles.title}>Edit Existing Bundle</h3>
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
            ref={titleElement}
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
            ref={descElement}
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
            {editResult.fetching ? (
              <div className={styles.loader}></div>
            ) : (
              "Edit Bundle"
            )}
          </button>
        </form>
      </section>
    </div>
  );
}

export default EditBundle;
