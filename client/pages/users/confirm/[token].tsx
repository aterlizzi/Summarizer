import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "urql";
import styles from "../../../styles/Token.module.scss";

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
  return <main className={styles.main}></main>;
}

export default Token;
