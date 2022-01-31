import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation } from "urql";
import Layout from "../../components/layout";
import BannerComp from "../../components/singleSummary/bannerComp";
import styles from "../../styles/SummaryPage.module.scss";

const FindRecentSummary = `
    mutation($id: Float!){
        returnSummary(id: $id){
            summary
            url
            title
        }
    }
`;

function SummaryPage() {
  const router = useRouter();
  const { summaryId } = router.query;

  const [unauth, setUnAuth] = useState(false);
  const [summary, setSummary] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const [result, findRecentSummary] = useMutation(FindRecentSummary);

  console.log(result);
  useEffect(() => {
    if (summaryId) {
      findRecentSummary({ id: parseInt(summaryId as any) }).then((res) => {
        if (!res.data || !res.data.returnSummary) {
          setUnAuth(true);
        } else {
          setSummary(res.data.returnSummary.summary);
          setTitle(res.data.returnSummary.title);
          if (res.data.returnSummary.url) {
            setUrl(res.data.returnSummary.url);
          }
        }
      });
    }
  }, [summaryId, findRecentSummary]);

  return (
    <main className={styles.main}>
      <BannerComp />
      {!unauth ? (
        <section className={styles.authContainer}>
          <h1>{title !== "" ? title : null}</h1>
          <h3>{summary !== "" ? summary : null}</h3>
          <p>{url !== "" ? url : null}</p>
          <a href={url !== "" ? url : null} target="_blank" rel="noreferrer">
            <button>Visit</button>
          </a>
        </section>
      ) : (
        <section className={styles.unauthContainer}>
          <h1>
            You are not authorized to view this summary. The owner of this
            summary has disabled other users from viewing his/her summaries.
          </h1>
        </section>
      )}
    </main>
  );
}

SummaryPage.getLayout = (page) => {
  return (
    <Layout
      metaContent="Check out this cool summary!"
      title={"Summary - Untanglify"}
    >
      {page}
    </Layout>
  );
};

export default SummaryPage;
