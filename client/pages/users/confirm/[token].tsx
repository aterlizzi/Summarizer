import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "urql";
import Layout from "../../../components/layout";
import styles from "../../../styles/ConfirmToken.module.scss";

const ConfirmUser = `
  query($token: String!){
    confirmUser(token: $token) {
      id
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
  console.log(result);
  return <main className={styles.main}></main>;
}

Token.getLayout = (page) => (
  <Layout title="Confirmation - Untanglify">{page}</Layout>
);
export default Token;
