import React from "react";
import Layout from "../components/layout";
import styles from "../styles/Begin.module.scss";

function Begin() {
  return <main className={styles.main}></main>;
}

Begin.getLayout = (page) => (
  <Layout title="Begin now - Untanglify">{page}</Layout>
);
export default Begin;
