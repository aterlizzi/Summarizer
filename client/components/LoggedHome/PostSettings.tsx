import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "urql";
import styles from "../../styles/components/DefaultDisplay.module.scss";

const EditBundle = `
    mutation($bundleId: Float!, $summaryId: Float!){
      addToBundle(bundleId: $bundleId, summaryId: $summaryId)
    }
`;
const EditSummary = `
    mutation($id: Float!, $status: Boolean!){
      editSummaryPrivateStatus(id: $id, status: $status)
    }
`;

interface PostSettingsType {
  bundleResult: any;
  summaryId: any;
  reexecuteBundle: any;
  privated?: boolean;
}

function PostSettings({
  bundleResult,
  summaryId,
  reexecuteBundle,
  privated,
}: PostSettingsType) {
  const [showOptions, setShowOptions] = useState(false);
  const [addToBundle, setAddToBundle] = useState(false);
  const [privatedSummary, setPrivatedSummary] = useState(privated);

  const node = useRef(null);
  const bundleNode = useRef(null);

  const [editBundleResult, editBundle] = useMutation(EditBundle);
  const [editSummaryResult, editSummary] = useMutation(EditSummary);

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

  const handleEditBundle = (summaryId, bundleId) => {
    editBundle({
      summaryId: parseInt(summaryId),
      bundleId: parseInt(bundleId),
    }).then(() => {
      reexecuteBundle();
    });
  };

  const handlePrivate = () => {
    if (privatedSummary === null) return;
    editSummary({ id: parseInt(summaryId), status: !privatedSummary }).then(
      (res) => {
        if (res.data && res.data.editSummaryPrivateStatus) {
          setPrivatedSummary(!privatedSummary);
        }
      }
    );
  };

  return (
    <div className={styles.settingsWrapper}>
      {privatedSummary ? (
        <FontAwesomeIcon
          icon={faEyeSlash}
          className={styles.privateIcon}
          aria-label="Summary is privated."
        />
      ) : null}
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
                  const indexes = bundle.summaries.map((summary) => summary.id);
                  if (indexes.indexOf(summaryId) !== -1) {
                    return null;
                  }
                  return (
                    <div
                      className={styles.optionContainer}
                      onClick={() => handleEditBundle(summaryId, bundle.id)}
                      key={bundle.id}
                    >
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
            {privatedSummary === false || privatedSummary === true ? (
              <div className={styles.optionContainer} onClick={handlePrivate}>
                <p className={styles.option}>
                  {privatedSummary === true
                    ? "Unprivate"
                    : privatedSummary === false
                    ? "Private"
                    : null}
                </p>
              </div>
            ) : null}
          </aside>
        )}
      </section>
    </div>
  );
}

export default PostSettings;
