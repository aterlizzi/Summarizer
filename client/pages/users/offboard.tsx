import React from "react";
import Layout from "../../components/layout";
import styles from "../../styles/Offboard.module.scss";

function Offboard() {
  return (
    <main className={styles.main}>
      <a href="mailto:act5@rice.edu?subject=Summary&body=this is a test">Hi</a>
    </main>
  );
}
Offboard.getLayout = (page) => {
  return <Layout title="Offboarding - Untanglify">{page}</Layout>;
};
export default Offboard;
