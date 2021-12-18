import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../components/layout";
import styles from "../styles/Settings.module.scss";

function Settings() {
  return <main className={styles.main}></main>;
}

Settings.getLayout = (page) => (
  <Layout title="Settings - Untanglify">{page}</Layout>
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.cookies.hasOwnProperty("uid")) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Settings;
