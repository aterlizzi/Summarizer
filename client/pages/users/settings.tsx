import { GetServerSideProps } from "next";
import React from "react";
import { useMutation } from "urql";
import Layout from "../../components/layout";
import styles from "../../styles/Settings.module.scss";
import { useRouter } from "next/router";
import AuthContainerComp from "../../components/settings/authContainerComp";

const AuthZotero = `
  mutation{
    authZotero
  }
`;
const AuthNotion = `
  mutation{
    authNotion
  }
`;

function Settings() {
  const router = useRouter();
  const [zoteroResult, authZotero] = useMutation(AuthZotero);
  const [notionResult, authNotion] = useMutation(AuthNotion);

  const handleZoteroAuth = () => {
    authZotero().then((res) => {
      if (res.data && res.data.authZotero !== "") {
        const url = res.data.authZotero;
        router.push(url);
      }
    });
  };

  const handleNotionAuth = () => {
    authNotion().then((res) => {
      if (res.data && res.data.authNotion !== "") {
        const url = res.data.authNotion;
        router.push(url);
      }
    });
  };

  return (
    <main className={styles.main}>
      <AuthContainerComp handleAuth={handleZoteroAuth} name={"Zotero"} />
      <AuthContainerComp handleAuth={handleNotionAuth} name={"Notion"} />
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
