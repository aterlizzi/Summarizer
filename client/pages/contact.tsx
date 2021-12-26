import React from "react";
import Layout from "../components/layout";
import BannerComp from "../components/contact/bannerComp";
import styles from "../styles/Contact.module.scss";
import Svg from "../components/contact/svg";
import Form from "../components/contact/form";

function Contact() {
  return (
    <main className={styles.main}>
      <BannerComp />
      <section className={styles.columns}>
        <Form />
        <Svg />
      </section>
    </main>
  );
}

Contact.getLayout = (page) => {
  return <Layout title="Contact - Untanglify">{page}</Layout>;
};
export default Contact;
