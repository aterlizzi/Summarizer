import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import Layout from "../../components/layout";
import BannerComp from "../../components/onboarding/bannerComp";
import Grid from "../../components/onboarding/grid";
import Header from "../../components/onboarding/header";
import MobileMenu from "../../components/onboarding/mobileMenuComp";
import Options from "../../components/onboarding/options";
import Popup from "../../components/onboarding/popupComp";
import styles from "../../styles/Onboarding.module.scss";

const CallBackend = `
  query{
    userOnboardingProgress{
      summarizedEntirePage
      summarizedFile
      summarizedHighlightedSectionPage
      summarizedManual
      summarizedPrivately
    }
  }
`;

function Onboarding() {
  const [popup, setPopup] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [displayExtension, setDisplayExtension] = useState(true);
  const [data, callBackend] = useQuery({ query: CallBackend });

  useEffect(() => {
    const myInterval = setInterval(handleCallBackend, 5000);
    return function cleanup() {
      clearInterval(myInterval);
    };
  }, []);

  const handleCallBackend = async () => {
    callBackend();
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
      <BannerComp isOpen={isOpen} setOpen={setOpen} />
      <MobileMenu isOpen={isOpen} />
      <Header />
      <Options
        displayExtension={displayExtension}
        setDisplayExtension={setDisplayExtension}
      />
      <Grid data={data} />
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
