import React from "react";
import Layout from "../components/layout";
import styles from "../styles/Update.module.scss";

function Update() {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h2 className={styles.emoji}> (•◡•) /</h2>
        </header>
      </section>
    </main>
  );
}
Update.getLayout = (page) => (
  <Layout title="Update - Untanglify">{page}</Layout>
);
export default Update;
