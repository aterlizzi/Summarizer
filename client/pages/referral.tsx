import React, { useState } from "react";
import Layout from "../components/layout";
import BannerComp from "../components/referral/bannerComp";
import MobileMenu from "../components/referral/mobileMenuComp";
import Tiers from "../components/referral/tiersComp";
import TitleSection from "../components/referral/titleComp";
import styles from "../styles/Referral.module.scss";

function Referral() {
  const [isOpen, setOpen] = useState(false);

  return (
    <main className={styles.main}>
      <BannerComp isOpen={isOpen} setOpen={setOpen} />
      <TitleSection />
      <section className={styles.tiers}>
        <Tiers />
      </section>
      <MobileMenu isOpen={isOpen} />
    </main>
  );
}

Referral.getLayout = (page) => {
  return (
    <Layout
      metaContent="Invite your friends to Untanglify and reap the benefits! Our tiered referral program rewards you for the work you put in."
      title="Referrals - Edutech"
    >
      {page}
    </Layout>
  );
};
export default Referral;
