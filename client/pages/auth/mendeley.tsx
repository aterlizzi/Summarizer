import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMutation } from "urql";
import Layout from "../../components/layout";
import Loader from "../../components/zoteroAuth/loaderComp";
import styles from "../../styles/GoogleAuth.module.scss";

const RetrieveToken = `
  mutation($code: String!){
    retrieveMendeleyToken(code: $code)
  }

`;

function Mendeley() {
  const router = useRouter();
  const { code } = router.query;
  const [result, retrieveToken] = useMutation(RetrieveToken);

  useEffect(() => {
    if (code) {
      retrieveToken({ code }).then((res) => {
        if (res.data && res.data.retrieveMendeleyToken) {
          router.push("/users/settings?auth=true");
        } else {
        }
      });
    }
  }, [code, router, retrieveToken]);
  return (
    <main className={styles.main}>
      <Loader />
    </main>
  );
}

Mendeley.getLayout = (page) => {
  return (
    <Layout metaContent="" title="Mendeley Authentication - Untanglify">
      {page}
    </Layout>
  );
};
export default Mendeley;
