import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import SideBar from "../SideBar";
import styles from "../../../styles/components/Bundle.module.scss";

const CreateBundle = dynamic(() => import("../CreateBundle"));
const EditBundle = dynamic(() => import("./EditBundle"));
import SearchBar from "../SearchBar";
import { useMutation, useQuery } from "urql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faPen,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const ReturnBundle = `
    query($id: Float!){
        returnBundle(id: $id){
            title
            createdAt
            hideOwnership
            description
            user{
              username
              id
            }
            summaries{
                id
                title
                createdAt
                rating
                url
            }
        }
    }
`;
const DeleteBundle = `
    mutation($bundleId: Float!){
      deleteBundle(bundleId: $bundleId)
    }
`;

function DisplayBundle({
  setSection,
  section,
  popupSection,
  setPopupSection,
  setUserProfileId,
  history,
  setHistory,
  bundleResult,
  result,
  reexecuteBundle,
  setSort,
  sort,
  setExecute,
}) {
  const router = useRouter();
  const { bundleId } = router.query;

  const [id, setId] = useState(0);
  const [revealAside, setRevealAside] = useState({});
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  const [copied, setCopied] = useState(false);
  const [aside, setAside] = useState(false);
  const [confirmDeleteBundle, setConfirmDeleteBundle] = useState(false);

  const node = useRef(null);
  const bundleSettings = useRef(null);

  const [returnResult, reexecuteReturnBundle] = useQuery({
    query: ReturnBundle,
    pause: !bundleId || id === 0,
    variables: { id },
  });
  const [deleteResult, deleteBundle] = useMutation(DeleteBundle);

  function handleResize() {
    // Set window width/height to state
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  const handleCopy = async () => {
    const url =
      process.env.NODE_ENV === "production"
        ? `https://untanglify.com/bundles/${id}`
        : `http://localhost:4000/bundles/${id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
  };

  const handleDeleteBundle = () => {
    deleteBundle({ bundleId: id }).then((res) => {
      if (res.data && res.data.deleteBundle) {
        router.replace("/home", undefined, { shallow: true });
        reexecuteBundle();
        setSection("Home");
      }
    });
  };

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        Object.keys(revealAside).length !== 0 &&
        node.current &&
        !node.current.contains(e.target)
      ) {
        setRevealAside({});
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [revealAside]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        aside &&
        bundleSettings.current &&
        !bundleSettings.current.contains(e.target)
      ) {
        setAside(false);
        setConfirmDeleteBundle(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [aside]);

  useEffect(() => {
    if (bundleId) {
      setId(parseInt(bundleId as any));
    }
  }, [bundleId]);

  return (
    <>
      <SideBar
        setPopupSection={setPopupSection}
        popupSection={popupSection}
        setSection={setSection}
        section={section}
        bundleResult={bundleResult}
        reexecuteBundle={reexecuteBundle}
        meResult={result}
        setSort={setSort}
        sort={sort}
        setExecute={setExecute}
      />
      <section className={styles.home}>
        <SearchBar
          setSection={setSection}
          setUserProfileId={setUserProfileId}
          history={history}
          setHistory={setHistory}
        />
        {returnResult.fetching ||
        !returnResult.data ||
        !returnResult.data.returnBundle ? (
          <div className={styles.loader}></div>
        ) : (
          <section className={styles.bundleContainer}>
            <header className={styles.header}>
              <h1 className={styles.title}>
                {returnResult.data.returnBundle.title}
              </h1>
              {returnResult.data.returnBundle.description ? (
                <p className={styles.bundleDescription}>
                  {returnResult.data.returnBundle.description}
                </p>
              ) : null}
              <p className={styles.createdAt} style={{ marginBottom: ".5em" }}>
                Created:{" "}
                <span className={styles.special}>
                  {" "}
                  {new Date(
                    parseInt(returnResult.data.returnBundle.createdAt)
                  ).toDateString()}
                </span>
              </p>
              <p className={styles.createdAt}>
                Owner:{" "}
                <span
                  className={styles.special}
                  onClick={() => {
                    if (!returnResult.data.returnBundle.hideOwnership) {
                      setUserProfileId(
                        parseInt(returnResult.data.returnBundle.user.id)
                      );
                      setSection("UserProfile");
                    }
                  }}
                >
                  {returnResult.data.returnBundle.hideOwnership
                    ? "Anonymous"
                    : returnResult.data.returnBundle.user.username}
                </span>
              </p>
            </header>
            <div className={styles.utils}>
              <div className={styles.utilContainer}>
                {returnResult.data.returnBundle.user.id ===
                result.data.me.id ? (
                  <div
                    className={styles.util}
                    onClick={() => setPopupSection("Edit_Bundle")}
                  >
                    <FontAwesomeIcon icon={faPen} className={styles.icon} />
                    <p className={styles.utilText}>Edit</p>
                  </div>
                ) : null}
                <div
                  className={styles.util}
                  onClick={() => {
                    setTimeout(() => {
                      setCopied(false);
                    }, 3000);
                    handleCopy();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faShareSquare}
                    className={styles.icon}
                  />
                  <p className={styles.utilText}>Share</p>
                  {copied ? (
                    <div className={styles.copiedContainer}>
                      <div className={styles.triangle}></div>
                      <p className={styles.copyText}>Copied!</p>
                    </div>
                  ) : null}
                </div>
                <div
                  className={styles.util}
                  onClick={() => {
                    setAside(true);
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsisH} className={styles.icon} />
                  <p className={styles.utilText}>More</p>
                  <aside
                    className={styles.popoutSettings}
                    ref={bundleSettings}
                    style={aside ? null : { display: "none" }}
                  >
                    <div
                      className={styles.container}
                      onClick={() => {
                        if (!confirmDeleteBundle) {
                          setConfirmDeleteBundle(true);
                        } else {
                          handleDeleteBundle();
                        }
                      }}
                    >
                      <p className={styles.info}>
                        {!confirmDeleteBundle
                          ? "Delete Bundle"
                          : "Are you sure you want to delete your bundle?"}
                      </p>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
            {returnResult.data.returnBundle.summaries.length > 0 ? (
              <table className={styles.table}>
                <thead className={styles.tableHeader}>
                  <tr className={styles.headerRow}>
                    <th className={styles.tableTitle}>#</th>
                    <th className={styles.tableTitle}>Title</th>
                    {windowSize.width > 650 ? (
                      <th className={styles.tableTitle}>Date Summarized</th>
                    ) : null}
                    {windowSize.width > 530 ? (
                      <th className={styles.tableTitle}>Rating</th>
                    ) : null}
                    {windowSize.width > 450 ? (
                      <>
                        <th className={styles.tableTitle}>Summary</th>
                        <th className={styles.tableTitle}>Article</th>
                      </>
                    ) : (
                      <th className={styles.tableTitle}>More</th>
                    )}
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {returnResult.data.returnBundle.summaries.length > 0
                    ? returnResult.data.returnBundle.summaries.map(
                        (summary, idx) => {
                          return (
                            <tr className={styles.bodyRow} key={idx}>
                              <td className={styles.entry}>{idx + 1}</td>
                              <td className={styles.entry}>{summary.title}</td>
                              {windowSize.width > 650 ? (
                                <td className={styles.entry}>
                                  {new Date(
                                    parseInt(summary.createdAt)
                                  ).toDateString()}
                                </td>
                              ) : null}
                              {windowSize.width > 530 ? (
                                <td className={styles.entry}>
                                  {Math.round(summary.rating * 100) / 100}/5
                                </td>
                              ) : null}
                              {windowSize.width > 450 ? (
                                <>
                                  <td className={styles.entry}>
                                    <Link href={`/summaries/${summary.id}`}>
                                      Visit
                                    </Link>
                                  </td>
                                  <td className={styles.entry}>
                                    <Link href={summary.url}>Visit</Link>
                                  </td>
                                </>
                              ) : (
                                <td
                                  className={styles.entry}
                                  onClick={() => {
                                    const obj: any = {};
                                    obj[summary.id] = true;
                                    setRevealAside(obj);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faEllipsisH}
                                    className={styles.icon}
                                  />
                                </td>
                              )}
                              <td className={styles.popoutContainer}>
                                <aside
                                  className={styles.popout}
                                  ref={node}
                                  style={
                                    revealAside[summary.id] === true
                                      ? null
                                      : { display: "none" }
                                  }
                                >
                                  <div className={styles.container}>
                                    <Link
                                      href={`/summaries/${summary.id}`}
                                      passHref
                                    >
                                      <p className={styles.info}>
                                        Visit Summary
                                      </p>
                                    </Link>
                                  </div>
                                  <div className={styles.container}>
                                    <Link href={summary.url} passHref>
                                      <p className={styles.info}>
                                        Visit Article
                                      </p>
                                    </Link>
                                  </div>
                                  <div className={styles.container}>
                                    <p className={styles.info}>
                                      Rating:{" "}
                                      {Math.round(summary.rating * 100) / 100}/5
                                    </p>
                                  </div>
                                  <div className={styles.container}>
                                    <p className={styles.info}>
                                      Summarized:{" "}
                                      {new Date(
                                        parseInt(summary.createdAt)
                                      ).toDateString()}
                                    </p>
                                  </div>
                                </aside>
                              </td>
                            </tr>
                          );
                        }
                      )
                    : null}
                </tbody>
              </table>
            ) : (
              <p className={styles.empty}>
                Add articles to your bundle and they will be displayed here.
              </p>
            )}
          </section>
        )}
      </section>
      {popupSection === "Create_Bundle" ? (
        <CreateBundle
          setPopupSection={setPopupSection}
          reexecuteBundle={reexecuteBundle}
        />
      ) : popupSection === "Edit_Bundle" ? (
        <EditBundle
          setPopupSection={setPopupSection}
          reexecuteReturnBundle={reexecuteReturnBundle}
          id={id}
          bundleResult={returnResult}
          reexecuteSideBarBundle={reexecuteBundle}
        />
      ) : null}
    </>
  );
}

export default DisplayBundle;
