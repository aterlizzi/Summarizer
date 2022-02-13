import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation } from "urql";
import Layout from "../../components/layout";
import BannerComp from "../../components/singleSummary/bannerComp";
import MobileMenu from "../../components/singleSummary/mobileMenuComp";
import styles from "../../styles/SummaryPage.module.scss";
import { Rating } from "react-simple-star-rating";

const FindRecentSummary = `
    mutation($id: Float!){
        returnSummary(id: $id){
            summary
            url
            createdAt
            id
            rating
            title
            user {
              username
            }
        }
    }
`;

const EditSummary = `
    mutation($id: Float!, $rating: Float!){
      editSummary(id: $id, rating: $rating)
    }
`;

function SummaryPage() {
  const router = useRouter();
  const { summaryId } = router.query;

  const [unauth, setUnAuth] = useState(false);
  const [auth, setAuth] = useState(false);
  const [summary, setSummary] = useState([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);
  const [id, setId] = useState("0");

  const [editSummaryResult, editSummary] = useMutation(EditSummary);
  const [result, findRecentSummary] = useMutation(FindRecentSummary);

  useEffect(() => {
    if (summaryId) {
      findRecentSummary({ id: parseInt(summaryId as any) }).then((res) => {
        if (!res.data || !res.data.returnSummary) {
          setUnAuth(true);
        } else {
          setAuth(true);
          setTitle(res.data.returnSummary.title);
          setUsername(res.data.returnSummary.user.username);
          setCreatedAt(res.data.returnSummary.createdAt);
          setId(res.data.returnSummary.id);
          setRating(res.data.returnSummary.rating);
          const arr = res.data.returnSummary.summary.split(
            /\s(?=Addition)|(?=Additional)/gm
          );
          setSummary(arr);
          if (res.data.returnSummary.url) {
            setUrl(res.data.returnSummary.url);
          }
        }
      });
    }
  }, [summaryId, findRecentSummary]);

  const handleRating = (rate) => {
    setRating(rate / 20);
    if (rated) return;
    editSummary({ id: parseInt(id), rating: rate / 20 }).then((res) => {
      if (res.data && res.data.editSummary) {
        setRated(true);
      }
    });
  };

  return (
    <main
      className={styles.main}
      style={
        unauth
          ? {
              display: "flex",
              flexDirection: "column",
            }
          : null
      }
    >
      <BannerComp isOpen={isOpen} setOpen={setOpen} />
      {!unauth && auth ? (
        <section className={styles.authContainer}>
          <header className={styles.byline}>
            <div className={styles.circle}>
              <FontAwesomeIcon icon={faUser} className={styles.icon} />
            </div>
            <p className={styles.text}>
              summarized by <span className={styles.special}>{username}</span>{" "}
              on{" "}
              <span className={styles.special}>
                {new Date(parseInt(createdAt)).toDateString()}
              </span>
            </p>
          </header>
          <div className={styles.content}>
            <h1 className={styles.title}>{title}</h1>
            {summary.map((section, idx) => {
              return (
                <p className={styles.desc} key={idx}>
                  {section}
                </p>
              );
            })}
            <div className={styles.btnContainer}>
              <button onClick={() => router.push(url)} className={styles.btn}>
                Continue Reading
              </button>
              <Rating
                onClick={handleRating}
                ratingValue={rating * 20}
                size={20}
                allowHalfIcon={true}
                fillColor="#5952d3"
                emptyColor="rgba(255, 255, 255, 0.6)"
                className={styles.ratingSystem}
              />
            </div>
          </div>
        </section>
      ) : unauth ? (
        <section className={styles.unauthContainer}>
          <h1 className={styles.error}>
            You are not authorized to view this summary. Add the owner as a
            friend to gain access or ask them to change their settings.
          </h1>
        </section>
      ) : !unauth && !auth ? (
        <div className={styles.loader}></div>
      ) : null}
      <MobileMenu isOpen={isOpen} />
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
