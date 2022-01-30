import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/Home.module.scss";
import BannerComp from "../components/home/bannerComp";
import Svg from "../components/home/svg";
import UnderConstruction from "../components/home/underConstruction";

function Home() {
  const [isOpen, setOpen] = useState(false);

  return (
    <main className={styles.main}>
      <BannerComp />
      <div className={styles.gridWrap}>
        <UnderConstruction />
        <Svg />
      </div>
    </main>
  );
}

Home.getLayout = (page) => {
  return <Layout title="Home - Untanglify">{page}</Layout>;
};

export default Home;
