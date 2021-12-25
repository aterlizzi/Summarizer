import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import styles from "../../styles/Settings.module.scss";

const Me = `
query {
  me{
    settings {
        emailSettings {
            monthlyNews
            improvementSurveys
            businessEmails
            featureReleases
        }
    }
  }
}
`;

const UpdateSettings = `
    mutation($options: UpdateEmailSettingsInput!){
        updateEmailSettings(options: $options)
    }
`;

function Reminders() {
  const [updateResult, updateSettings] = useMutation(UpdateSettings);
  const [meResult, reexecuteMe] = useQuery({ query: Me });

  const [news, setNews] = useState(false);
  const [surveys, setSurveys] = useState(false);
  const [business, setBusiness] = useState(false);
  const [features, setFeatures] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (
      meResult.data &&
      meResult.data.me &&
      meResult.data.me.settings &&
      meResult.data.me.settings.emailSettings
    ) {
      setNews(meResult.data.me.settings.emailSettings.monthlyNews);
      setSurveys(meResult.data.me.settings.emailSettings.improvementSurveys);
      setBusiness(meResult.data.me.settings.emailSettings.businessEmails);
      setFeatures(meResult.data.me.settings.emailSettings.featureReleases);
    }
  }, [meResult]);

  const handleSave = () => {
    updateSettings({ options: { news, surveys, business, features } }).then(
      (res) => {
        if (res.data && res.data.updateEmailSettings) {
          setSuccess("Successfully updated email settings.");
          setChanged(false);
        } else {
          setError("Whoops! Something has gone wrong, please try again.");
        }
      }
    );
  };
  const handleClear = () => {
    setChanged(false);
    setSuccess("");
    setError("");
    reexecuteMe();
  };
  return (
    <section className={styles.reminders}>
      {meResult.data && meResult.data.me ? (
        <>
          <div className={styles.reminderContainer}>
            <h4 className={styles.reminderTitle}>Emails</h4>
            <form action="" className={styles.reminderForm}>
              <h5 className={styles.emailTitle}>
                I want to receive these emails from Untanglify!
              </h5>
              <div className={styles.inputContainer}>
                <div className={styles.option}>
                  <input
                    type="checkbox"
                    name="news"
                    onClick={() => {
                      setChanged(true);
                      setNews(!news);
                    }}
                    defaultChecked={
                      meResult.data &&
                      meResult.data.me &&
                      meResult.data.me.settings &&
                      meResult.data.me.settings.emailSettings.monthlyNews
                    }
                    id="news"
                    className={styles.checkbox}
                  />
                  <label htmlFor="news" className={styles.optionLabel}>
                    Monthly newsletters
                  </label>
                </div>
                <div className={styles.option}>
                  <input
                    type="checkbox"
                    name="surveys"
                    id="surveys"
                    onClick={() => {
                      setSurveys(!surveys);
                      setChanged(true);
                    }}
                    defaultChecked={
                      meResult.data &&
                      meResult.data.me &&
                      meResult.data.me.settings &&
                      meResult.data.me.settings.emailSettings.improvementSurveys
                    }
                    className={styles.checkbox}
                  />
                  <label htmlFor="surveys" className={styles.optionLabel}>
                    Improvement surveys
                  </label>
                </div>
                <div className={styles.option}>
                  <input
                    type="checkbox"
                    name="business"
                    id="business"
                    className={styles.checkbox}
                    onClick={() => {
                      setBusiness(!business);
                      setChanged(true);
                    }}
                    defaultChecked={
                      meResult.data &&
                      meResult.data.me &&
                      meResult.data.me.settings &&
                      meResult.data.me.settings.emailSettings.businessEmails
                    }
                  />
                  <label htmlFor="business" className={styles.optionLabel}>
                    Untanglify business emails
                  </label>
                </div>
                <div className={styles.option}>
                  <input
                    type="checkbox"
                    name="feature"
                    id="feature"
                    className={styles.checkbox}
                    onClick={() => {
                      setFeatures(!features);
                      setChanged(true);
                    }}
                    defaultChecked={
                      meResult.data &&
                      meResult.data.me &&
                      meResult.data.me.settings &&
                      meResult.data.me.settings.emailSettings.featureReleases
                    }
                  />
                  <label htmlFor="feature" className={styles.optionLabel}>
                    Update feature releases
                  </label>
                </div>
                {success !== "" ? (
                  <div className={styles.success}>{success}</div>
                ) : null}
                {error !== "" ? (
                  <div className={styles.error}>{error}</div>
                ) : null}
              </div>
            </form>
          </div>
          <div className={styles.btnContainer}>
            <button
              style={
                !changed
                  ? {
                      background: "rgba(255, 255, 255, 0.08)",
                      cursor: "default",
                    }
                  : null
              }
              disabled={!changed}
              onClick={handleSave}
              className={styles.save}
            >
              Save
            </button>
            <button
              disabled={!changed}
              style={!changed ? { cursor: "default" } : null}
              onClick={handleClear}
              className={styles.cancel}
            >
              Cancel
            </button>
          </div>
        </>
      ) : null}
    </section>
  );
}

export default Reminders;
