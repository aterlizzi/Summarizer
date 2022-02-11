import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/components/DefaultDisplay.module.scss";

function PostSettings({ bundleResult }) {
  const [showOptions, setShowOptions] = useState(false);
  const [addToBundle, setAddToBundle] = useState(false);

  const node = useRef(null);
  const bundleNode = useRef(null);

  console.log(bundleResult);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showOptions && node.current && !node.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [setShowOptions, showOptions]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        addToBundle &&
        bundleNode.current &&
        !bundleNode.current.contains(e.target)
      ) {
        setAddToBundle(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [addToBundle, setAddToBundle]);

  return (
    <section
      className={styles.postSettings}
      onClick={() => setShowOptions(true)}
    >
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      {addToBundle ? (
        <aside
          className={styles.options}
          style={{ display: "block" }}
          ref={bundleNode}
        >
          {addToBundle ? (
            bundleResult &&
            bundleResult.data &&
            bundleResult.data.returnBundles &&
            bundleResult.data.returnBundles.length > 0 ? (
              bundleResult.data.returnBundles.map((bundle) => {
                return (
                  <div className={styles.optionContainer} key={bundle.id}>
                    <p className={styles.option}>{bundle.title}</p>
                  </div>
                );
              })
            ) : (
              <div className={styles.optionContainer}>
                <p className={styles.option}>Create a bundle first.</p>
              </div>
            )
          ) : null}
        </aside>
      ) : (
        <aside
          className={styles.options}
          ref={node}
          style={showOptions ? { display: "block" } : null}
        >
          <div
            className={styles.optionContainer}
            onClick={() => setAddToBundle(true)}
          >
            <p className={styles.option}>Add to Bundle</p>
          </div>
        </aside>
      )}
    </section>
  );
}

export default PostSettings;
