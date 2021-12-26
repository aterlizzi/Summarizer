import React from "react";
import Image from "next/image";
import styles from "../../styles/Settings.module.scss";
import notion from "../../public/notion.png";
import google from "../../public/gmail.png";
import zotero from "../../public/zotero.png";
import evernote from "../../public/evernote.png";
import mendeley from "../../public/mendeleylogo.png";

function AuthContainerComp({
  handleAuth,
  name,
  connection,
  handleDisableAuth,
}) {
  return (
    <section className={styles.card} onClick={handleAuth}>
      <div className={styles.top}>
        <div className={styles.utility}>
          <div className={styles.image}>
            <div className={styles.logo}>
              <Image
                src={
                  name === "Zotero"
                    ? zotero
                    : name === "Notion"
                    ? notion
                    : name === "Evernote"
                    ? evernote
                    : name === "Google"
                    ? google
                    : name === "Mendeley"
                    ? mendeley
                    : null
                }
              ></Image>
            </div>
            <p className={styles.app}>{name}</p>
          </div>
          <div className={styles.toggleContainer}>
            <input
              type="checkbox"
              name="switch"
              id="switch"
              className={styles.switch}
              defaultChecked={connection}
              onClick={connection ? handleDisableAuth : handleAuth}
            />
          </div>
        </div>
        <p className={styles.desc}>
          {name === "Zotero"
            ? "Frictionless saving of summaries and articles in Zotero with the Zotero authorization."
            : name === "Notion"
            ? "Simplify your workflow by quickly adding your summaries to your Notion workspace."
            : name === "Google"
            ? "Seamlessly email your favorite summaries around the world."
            : name === "Evernote"
            ? "Save precious time by quickly adding summaries as notes in Evernote with the click of a button."
            : name === "Mendeley"
            ? "Save precious time by quickly adding summaries as notes in Evernote with the click of a button."
            : null}
        </p>
      </div>
      <div className={styles.bottom}>
        <p className={styles.connected}>
          {connection ? "Connected" : "Disconnected"}
        </p>
        <a
          target="_blank"
          href={
            name === "Zotero"
              ? "https://www.zotero.org/"
              : name === "Notion"
              ? "https://www.notion.so/"
              : name === "Google"
              ? "https://support.google.com/a/users/answer/9297685?hl=en"
              : name === "Evernote"
              ? "https://evernote.com/"
              : name === "Mendeley"
              ? "https://www.mendeley.com/?interaction_required=true"
              : ""
          }
        >
          <p className={styles.info}>Info</p>
        </a>
      </div>
    </section>
  );
}

export default AuthContainerComp;
