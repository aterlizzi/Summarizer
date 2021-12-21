import { GetServerSideProps } from "next";
import React from "react";
import { useMutation } from "urql";
import Layout from "../../components/layout";
import ZoteroContainerComp from "../../components/settings/zoteroContainerComp";
import styles from "../../styles/Settings.module.scss";
import { useRouter } from "next/router";

const AuthZotero = `
  mutation{
    authZotero
  }
`;

function Settings() {
  const router = useRouter();
  const [zoteroResult, authZotero] = useMutation(AuthZotero);

  const handleZoteroAuth = () => {
    authZotero().then((res) => {
      if (res.data && res.data.authZotero !== "") {
        const url = res.data.authZotero;
        router.push(url);
      }
    });
  };

  return (
    <main className={styles.main}>
      <ZoteroContainerComp handleZoteroAuth={handleZoteroAuth} />
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
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Settings;
