import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "urql";
import styles from "../../styles/ZoteroAuth.module.scss";
import Layout from "../../components/layout";
import Loader from "../../components/zoteroAuth/loaderComp";

const ZoteroAPI = `
    mutation($verifier: String!) {
        getAccessTokenZotero(verifier: $verifier)
    }
`;

function Zotero() {
  const router = useRouter();
  const [result, zotero] = useMutation(ZoteroAPI);
  const { oauth_verifier } = router.query;
  useEffect(() => {
    if (oauth_verifier) {
      zotero({
        verifier: oauth_verifier,
      }).then((res) => {
        if (res.data && res.data.getAccessTokenZotero) {
          router.push("/users/settings?auth=true");
        }
      });
    }
  }, [oauth_verifier, router, zotero]);
  return (
    <main className={styles.main}>
      <Loader />
    </main>
  );
}

Zotero.getLayout = (page) => {
  return (
    <Layout metaContent="" title="Zotero Authentication - Untanglify">
      {page}
    </Layout>
  );
};
export default Zotero;
