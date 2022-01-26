import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/Home.module.scss";
import BannerComp from "../components/home/bannerComp";

function Home() {
  const [isOpen, setOpen] = useState(false);

  return (
    <main className={styles.main}>
      <BannerComp />
    </main>
  );
}

Home.getLayout = (page) => {
  return <Layout title="Home - Untanglify">{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.cookies.hasOwnProperty("jid")) {
    return {
      redirect: {
        destination: `/home`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Home;
