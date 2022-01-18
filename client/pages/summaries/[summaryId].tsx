import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation } from "urql";
import Layout from "../../components/layout";
import styles from "../../styles/SummaryPage.module.scss";

const FindRecentSummary = `
    mutation($id: Float!){
        returnSummary(id: $id){
            summary
            url
        }
    }
`;

function SummaryPage() {
  const router = useRouter();
  const { summaryId } = router.query;

  const [unauth, setUnAuth] = useState(false);
  const [summary, setSummary] = useState("");
  const [url, setUrl] = useState("");

  const [result, findRecentSummary] = useMutation(FindRecentSummary);

  console.log(result);
  useEffect(() => {
    if (summaryId) {
      findRecentSummary({ id: parseInt(summaryId as any) }).then((res) => {
        if (!res.data || !res.data.returnSummary) {
          setUnAuth(true);
        } else {
          setSummary(res.data.returnSummary.summary);
          if (res.data.returnSummary.url) {
            setUrl(res.data.returnSummary.url);
          }
        }
      });
    }
  }, [summaryId]);

  return (
    <main className={styles.main}>
      {!unauth ? (
        <section className={styles.authContainer}>
          <h1>{summary !== "" ? summary : null}</h1>
          <p>{url !== "" ? url : null}</p>
        </section>
      ) : (
        <section className={styles.unauthContainer}>
          <h1>
            You are not authorized to view this summary. Contact the owner to
            allow access.
          </h1>
        </section>
      )}
    </main>
  );
}

SummaryPage.getLayout = (page) => {
  return <Layout title={"Summary - Untanglify"}>{page}</Layout>;
};
export default SummaryPage;
