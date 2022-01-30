import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMutation } from "urql";
import Layout from "../../../components/layout";
import Loader from "../../../components/zoteroAuth/loaderComp";
import styles from "../../../styles/NotionAuth.module.scss";

const RetrieveNotionToken = `
  mutation($code: String!){
    retrieveNotionToken(code: $code)
  }
`;

function Notion() {
  const router = useRouter();
  const [result, retrieveNotionToken] = useMutation(RetrieveNotionToken);
  const { code, error } = router.query;
  console.log(result);
  useEffect(() => {
    if (error) {
      router.push("/users/settings?auth=true");
    }
    if (code) {
      retrieveNotionToken({ code }).then((res) => {
        if (res) {
          router.push("/users/settings?auth=true");
        }
      });
    }
  }, [code, error, router, retrieveNotionToken]);
  return (
    <main className={styles.main}>
      <Loader />
    </main>
  );
}
Notion.getLayout = (page) => {
  return <Layout title="Notion Authentication - Untanglify">{page}</Layout>;
};
export default Notion;
