import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "urql";
import Layout from "../../../components/layout";
import styles from "../../../styles/ConfirmToken.module.scss";

const ConfirmUser = `
  query($token: String!){
    confirmUser(token: $token) {
      accessToken
    }
  }
`;

const ClickMe = `
  mutation{
    clickMe
  }
`;

const Logout = `
  mutation{
    logout
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
  const [clickResult, clickme] = useMutation(ClickMe);
  const [logoutResult, logout] = useMutation(Logout);
  useEffect(() => {
    if (result.data) {
      if (result.data.confirmUser.accessToken !== "") {
        localStorage.setItem(
          "accessToken",
          result.data.confirmUser.accessToken
        );
      }
    }
  }, [result]);

  const handleClick = () => {
    clickme().then((result) => console.log(result));
  };

  const handleLogout = () => {
    logout().then((result) => {
      if (result) {
        localStorage.clear();
      }
    });
  };
  return (
    <main className={styles.main}>
      {result.data ? result.data.confirmUser.accessToken : null}
      <button onClick={handleClick}>Click me</button>
      <button onClick={handleLogout}>logout</button>
    </main>
  );
}

Token.getLayout = (page) => (
  <Layout title="Confirmation - Untanglify">{page}</Layout>
);
export default Token;
