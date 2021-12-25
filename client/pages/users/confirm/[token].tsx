import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "urql";
import Layout from "../../../components/layout";
import Loader from "../../../components/zoteroAuth/loaderComp";
import styles from "../../../styles/ConfirmToken.module.scss";

const ConfirmUser = `
  query($token: String!){
    confirmUser(token: $token) {
      accessToken
    }
  }
`;

function Token() {
  const router = useRouter();
  const token = router.query.token;
  const [result, confirmUser] = useQuery({
    query: ConfirmUser,
    variables: { token },
    pause: !token,
  });
  useEffect(() => {
    if (
      result.data &&
      result.data.confirmUser &&
      result.data.confirmUser.accessToken !== ""
    ) {
      localStorage.setItem("accessToken", result.data.confirmUser.accessToken);
      router.push("/begin");
    }
  }, [result]);

  return (
    <main className={styles.main}>
      <Loader />
    </main>
  );
}

Token.getLayout = (page) => (
  <Layout title="Confirmation - Untanglify">{page}</Layout>
);
export default Token;
