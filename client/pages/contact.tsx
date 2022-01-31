import dynamic from "next/dynamic";

import React, { useState } from "react";
import Layout from "../components/layout";
import BannerComp from "../components/contact/bannerComp";
import styles from "../styles/Contact.module.scss";
const Svg = dynamic(() => import("../components/contact/svg"));
import Form from "../components/contact/form";
import MobileMenu from "../components/contact/mobileMenuComp";

function Contact() {
  const [isOpen, setOpen] = useState(false);

  return (
    <main className={styles.main}>
      <BannerComp isOpen={isOpen} setOpen={setOpen} />
      <section className={styles.columns}>
        <Form />
        <Svg />
      </section>
      <MobileMenu isOpen={isOpen} />
    </main>
  );
}

Contact.getLayout = (page) => {
  return (
    <Layout
      metaContent="Got a question? Reach Untanglify here! A direct line of contact is best for us both, plus we're probably getting tired of coding - reach out to us!"
      title="Contact - Untanglify"
    >
      {page}
    </Layout>
  );
};
export default Contact;
