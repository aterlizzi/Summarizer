import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loader from "../../components/zoteroAuth/loaderComp";
import styles from "../../styles/ZoteroAuth.module.scss";

function BundleId() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      router.push(`/home?bundleId=${token}`);
    }
  }, [token, router]);

  return (
    <main className={styles.main}>
      <Loader />
    </main>
  );
}

export default BundleId;
