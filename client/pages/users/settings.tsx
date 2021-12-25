import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import styles from "../../styles/Settings.module.scss";
import BannerComp from "../../components/settings/bannerComp";
import SideBar from "../../components/settings/sidebarComp";
import Info from "../../components/settings/infoComp";
import { useRouter } from "next/router";

function Settings() {
  const router = useRouter();
  const { auth, status, personal, account, reminder } = router.query;
  const [section, setSection] = useState(0);

  useEffect(() => {
    if (auth) {
      setSection(5);
    }
    if (status) {
      setSection(6);
    }
    if (personal) {
      setSection(1);
    }
    if (account) {
      setSection(0);
    }
    if (reminder) {
      setSection(3);
    }
  }, [auth, status, personal, account, reminder]);

  return (
    <main className={styles.main}>
      <BannerComp />
      <div className={styles.columnContainer}>
        <SideBar setSection={setSection} section={section} />
        <Info section={section} />
      </div>
    </main>
  );
}

Settings.getLayout = (page) => (
  <Layout title="Settings - Untanglify">{page}</Layout>
);
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.cookies.hasOwnProperty("jid")) {
    return {
      redirect: {
        destination: "/login?target_url=%2Fusers%2Fsettings",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Settings;
