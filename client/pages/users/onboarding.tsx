import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../../components/layout";
import styles from "../../styles/Onboarding.module.scss";

function Onboarding() {
  return <main className={styles.main}></main>;
}

Onboarding.getLayout = (page) => {
  return <Layout title="Learn the ropes - Untanglify">{page}</Layout>;
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.cookies.hasOwnProperty("jid")) {
    return {
      redirect: {
        destination: "/login?target_url=%2Fusers%2Fonboarding",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Onboarding;
