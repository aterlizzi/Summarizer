import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Layout from "../components/layout";
import DefaultDisplay from "../components/LoggedHome/DefaultDisplay";
import styles from "../styles/LoggedHome.module.scss";

function Home() {
  const [section, setSection] = useState("Home");
  const [popupSection, setPopupSection] = useState("");

  return (
    <main className={styles.main}>
      {section === "Home" ? (
        <DefaultDisplay
          setPopupSection={setPopupSection}
          popupSection={popupSection}
          section={section}
          setSection={setSection}
        />
      ) : null}
    </main>
  );
}

Home.getLayout = (page) => {
  return <Layout title="Untanglify">{page}</Layout>;
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
