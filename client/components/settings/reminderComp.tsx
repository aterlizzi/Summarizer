import React from "react";
import styles from "../../styles/Settings.module.scss";

function Reminders() {
  const handleSave = () => {};
  const handleClear = () => {};
  return (
    <section className={styles.reminders}>
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
              />
              <label htmlFor="feature" className={styles.optionLabel}>
                Update feature releases
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.btnContainer}>
        <button onClick={handleSave} className={styles.save}>
          Save
        </button>
        <button onClick={handleClear} className={styles.cancel}>
          Cancel
        </button>
      </div>
    </section>
  );
}

export default Reminders;
