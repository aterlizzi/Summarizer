import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import styles from "../../styles/Settings.module.scss";
import BannerComp from "../../components/settings/bannerComp";
import SideBar from "../../components/settings/sidebarComp";
import Info from "../../components/settings/infoComp";
import { useRouter } from "next/router";
import MobileMenu from "../../components/settings/mobileMenuComp";

function Settings() {
  const router = useRouter();
  const { auth, status, personal, account, reminders, extension } =
    router.query;

  const [section, setSection] = useState(0);
  const [isOpen, setOpen] = useState(false);

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
    if (reminders) {
      setSection(3);
    }
    if (extension) {
      setSection(7);
    }
  }, [auth, status, personal, account, reminders, extension]);

  return (
    <main className={styles.main}>
      <BannerComp
        setOpen={setOpen}
        isOpen={isOpen}
        burger={true}
        tryFree={false}
      />
      <div className={styles.columnContainer} onClick={() => setOpen(false)}>
        <SideBar setSection={setSection} section={section} />
        <Info section={section} />
      </div>
      <MobileMenu isOpen={isOpen} section={section} setSection={setSection} />
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
