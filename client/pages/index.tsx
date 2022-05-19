import dynamic from "next/dynamic";

import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import styles from "../styles/Home.module.scss";
import BannerComp from "../components/home/bannerComp";
const StatsBar = dynamic(() => import("../components/home/statsbar"));
const Feature = dynamic(() => import("../components/home/feature"));
import MobileMenu from "../components/home/mobileMenuComp";
import TitlePage from "../components/home/titlePage";
import Why from "../components/home/why";
import { useRouter } from "next/router";
import { useMutation } from "urql";

const UpdateData = `
mutation($medium: String!, $type: String!) {
  updateABCount(medium: $medium, type: $type)
}
`;

function Home() {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [updateResult, updateData] = useMutation(UpdateData);

  const { referral_med, referral_type } = router.query; // if user comes in via an email link or etc.

  useEffect(() => {
    if (referral_med === "email") {
      updateData({
        medium: referral_med as string,
        type: referral_type as string,
      });
    }
  }, [referral_med, referral_type]);
  return (
    <main className={styles.main}>
      <BannerComp isOpen={isOpen} setOpen={setOpen} />
      <MobileMenu isOpen={isOpen} />
      <section className={styles.titlePage}>
        <div className={styles.circle}></div>
        <div className={styles.circle2}></div>
        <TitlePage />
      </section>
      <section className={styles.statistics}>
        <StatsBar type={"usedby"} />
        <StatsBar type={"stats"} />
      </section>
      <section className={styles.why}>
        <Why />
      </section>
      <section className={styles.content}>
        <Feature section={1} />
        <Feature section={2} />
        <Feature section={3} />
        <Feature section={4} />
      </section>
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
