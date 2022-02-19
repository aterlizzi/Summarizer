import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { useMutation, useQuery } from "urql";
import Layout from "../components/layout";
import DefaultDisplay from "../components/LoggedHome/DefaultDisplay";

const Friends = dynamic(() => import("../components/LoggedHome/Friends"));
const UserProfile = dynamic(
  () => import("../components/LoggedHome/UserProfile")
);
const Groups = dynamic(() => import("../components/LoggedHome/Groups"));
const Bundles = dynamic(
  () => import("../components/LoggedHome/Bundles/DisplayBundle")
);

import styles from "../styles/LoggedHome.module.scss";

const Me = `
query{
    me{
      paymentTier
        bundles{
            title
        }
        settings{
          extensionSettings{
            lastBundleSortType
          }
        }
    }
}
`;

const ReturnBundles = `
query($sort: String){
  returnBundles(sort: $sort){
    title
    id
    summaries {
      id
    }
  }
}
`;

const SendFriendRequest = `
mutation($friendId: Float!){
    sendFriendRequest(friendId: $friendId)
}
`;

function Home() {
  const [section, setSection] = useState("Home");
  const [popupSection, setPopupSection] = useState("");
  const [userProfileId, setUserProfileId] = useState("");
  const [execute, setExecute] = useState(false);
  const [sort, setSort] = useState("");

  const [history, setHistory] = useState({});

  const [result, rexecuteMe] = useQuery({ query: Me });
  const [friendRequestResult, sendFriendRequest] =
    useMutation(SendFriendRequest);
  const [bundleResult, reexecuteBundle] = useQuery({
    query: ReturnBundles,
    variables: { sort },
    pause: !execute,
  });

  return (
    <main className={styles.main}>
      {section === "Home" ? (
        <DefaultDisplay
          setPopupSection={setPopupSection}
          popupSection={popupSection}
          section={section}
          setSection={setSection}
          setUserProfileId={setUserProfileId}
          history={history}
          setHistory={setHistory}
          bundleResult={bundleResult}
          reexecuteBundle={reexecuteBundle}
          result={result}
          setExecute={setExecute}
          setSort={setSort}
          sort={sort}
        />
      ) : section === "UserProfile" ? (
        <UserProfile
          setPopupSection={setPopupSection}
          popupSection={popupSection}
          section={section}
          setSection={setSection}
          userProfileId={userProfileId}
          setUserProfileId={setUserProfileId}
          history={history}
          setHistory={setHistory}
          bundleResult={bundleResult}
          result={result}
          reexecuteBundle={reexecuteBundle}
          sendFriendRequest={sendFriendRequest}
          setSort={setSort}
          setExecute={setExecute}
          sort={sort}
        />
      ) : section === "Friends" ? (
        <Friends
          setPopupSection={setPopupSection}
          popupSection={popupSection}
          section={section}
          setSection={setSection}
          setUserProfileId={setUserProfileId}
          history={history}
          setHistory={setHistory}
          bundleResult={bundleResult}
          result={result}
          reexecuteBundle={reexecuteBundle}
          setSort={setSort}
          setExecute={setExecute}
          sort={sort}
        />
      ) : section === "Groups" ? (
        <Groups
          setPopupSection={setPopupSection}
          popupSection={popupSection}
          section={section}
          setSection={setSection}
          setUserProfileId={setUserProfileId}
          history={history}
          setHistory={setHistory}
          bundleResult={bundleResult}
          result={result}
          reexecuteBundle={reexecuteBundle}
          setSort={setSort}
          setExecute={setExecute}
          sort={sort}
        />
      ) : section === "Bundle" ? (
        <Bundles
          setPopupSection={setPopupSection}
          popupSection={popupSection}
          section={section}
          setSection={setSection}
          setUserProfileId={setUserProfileId}
          history={history}
          setHistory={setHistory}
          bundleResult={bundleResult}
          result={result}
          reexecuteBundle={reexecuteBundle}
          setSort={setSort}
          setExecute={setExecute}
          sort={sort}
        />
      ) : null}
    </main>
  );
}

Home.getLayout = (page) => {
  return (
    <Layout
      metaContent="Share, save, and read articles from your friends!"
      title="Untanglify"
    >
      {page}
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.cookies.hasOwnProperty("jid")) {
    return {
      redirect: {
        destination: `/login?return_url=${encodeURIComponent("/home")}`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Home;
