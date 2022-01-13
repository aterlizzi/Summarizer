import React from "react";
import Layout from "../components/layout";
import BannerComp from "../components/referral/bannerComp";
import Tiers from "../components/referral/tiersComp";
import TitleSection from "../components/referral/titleComp";
import styles from "../styles/Referral.module.scss";

function Referral() {
  return (
    <main className={styles.main}>
      <BannerComp />
      <TitleSection />
      <section className={styles.tiers}>
        <Tiers />
      </section>
    </main>
  );
}

Referral.getLayout = (page) => {
  return <Layout title="Referrals - Edutech">{page}</Layout>;
};
export default Referral;
