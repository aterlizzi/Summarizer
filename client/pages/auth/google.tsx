import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMutation } from "urql";
import Layout from "../../components/layout";
import Loader from "../../components/zoteroAuth/loaderComp";
import styles from "../../styles/GoogleAuth.module.scss";

const RetrieveGoogleToken = `
  mutation($code: String!){
    retrieveGoogleToken(code: $code)
  }
`;

function Google() {
  const router = useRouter();
  const [result, retrieveGoogleToken] = useMutation(RetrieveGoogleToken);
  const { code } = router.query;
  useEffect(() => {
    if (code) {
      retrieveGoogleToken({ code }).then((res) => {
        if (res.data && res.data.retrieveGoogleToken) {
          router.push("/users/settings?auth=true");
        }
      });
    }
  }, [code, retrieveGoogleToken, router]);
  return (
    <main className={styles.main}>
      <Loader />
    </main>
  );
}
Google.getLayout = (page) => {
  return (
    <Layout metaContent="" title="Google Authentication - Untanglify">
      {page}
    </Layout>
  );
};
export default Google;
