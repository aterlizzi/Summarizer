import React from "react";
import SideBar from "./SideBar";
import styles from "../../styles/components/DefaultDisplay.module.scss";
import CreateBundle from "./CreateBundle";

function DefaultDisplay({
  setSection,
  section,
  popupSection,
  setPopupSection,
}) {
  return (
    <>
      <SideBar
        setPopupSection={setPopupSection}
        popupSection={popupSection}
        setSection={setSection}
        section={section}
      />
      <section className={styles.home}></section>
      {popupSection === "Create_Bundle" ? (
        <CreateBundle setPopupSection={setPopupSection} />
      ) : null}
    </>
  );
}

export default DefaultDisplay;
