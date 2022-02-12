import dynamic from "next/dynamic";

import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/Home.module.scss";
import BannerComp from "../components/home/bannerComp";
const Svg = dynamic(() => import("../components/home/svg"));
import UnderConstruction from "../components/home/underConstruction";
import MobileMenu from "../components/home/mobileMenuComp";

function Home() {
  const [isOpen, setOpen] = useState(false);

  return (
    <main className={styles.main}>
      <BannerComp isOpen={isOpen} setOpen={setOpen} />
      <div className={styles.gridWrap}>
        <UnderConstruction />
        <Svg />
      </div>
      <MobileMenu isOpen={isOpen} />
    </main>
  );
}

Home.getLayout = (page) => {
  return (
    <Layout
      metaContent="Summarize any text with Untanglify, saving you hours of your time. Start saving time for free with our Google Chrome Extension."
      title="Home - Untanglify"
    >
      {page}
    </Layout>
  );
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
