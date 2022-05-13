import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Popup from "../../components/onboarding/popupComp";
import styles from "../../styles/Onboarding.module.scss";

function Onboarding() {
  const [popup, setPopup] = useState(true);

  useEffect(() => {
    const myInterval = setInterval(callBackend, 5000);
    return function cleanup() {
      clearInterval(myInterval);
    };
  }, []);

  const callBackend = async () => {
    console.log("called");
  };

  return (
    <main
      className={styles.main}
      style={
        popup
          ? { display: "flex", justifyContent: "center", alignItems: "center" }
          : null
      }
    >
      {popup ? <Popup setPopup={setPopup} /> : null}
    </main>
  );
}

Onboarding.getLayout = (page) => {
  return (
    <Layout
      metaContent="Untanglify wants to make sure you're getting the best for your buck (or time!). Complete our onboarding to learn the tech and get rewards!"
      title="Learn the ropes - Untanglify"
    >
      {page}
    </Layout>
  );
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
