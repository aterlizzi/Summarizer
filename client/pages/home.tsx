import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Layout from "../components/layout";
import DefaultDisplay from "../components/LoggedHome/DefaultDisplay";
import UserProfile from "../components/LoggedHome/UserProfile";
import styles from "../styles/LoggedHome.module.scss";

function Home() {
  const [section, setSection] = useState("Home");
  const [popupSection, setPopupSection] = useState("");
  const [userProfileId, setUserProfileId] = useState("");
  const [history, setHistory] = useState({});

  return (
    <main className={styles.main}>
      {section === "Home" ? (
        <DefaultDisplay
          setPopupSection={setPopupSection}
          popupSection={popupSection}
          section={section}
          setSection={setSection}
          setUserProfileId={setUserProfileId}
          history={history}
          setHistory={setHistory}
        />
      ) : section === "UserProfile" ? (
        <UserProfile
          setPopupSection={setPopupSection}
          popupSection={popupSection}
          section={section}
          setSection={setSection}
          userProfileId={userProfileId}
          setUserProfileId={setUserProfileId}
          history={history}
          setHistory={setHistory}
        />
      ) : null}
    </main>
  );
}

Home.getLayout = (page) => {
  return (
    <Layout
      metaContent="Share, save, and read articles from your friends!"
      title="Untanglify"
    >
      {page}
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.cookies.hasOwnProperty("jid")) {
    return {
      redirect: {
        destination: `/login?return_url=${encodeURIComponent("/home")}`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Home;
