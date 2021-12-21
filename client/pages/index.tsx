import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import Layout from "../components/layout";
import GoogleLogin from "react-google-login";
import { useMutation } from "urql";

const GoogleLoginMutation = `
  mutation($token: String!){
    registerGoogleUser(token: $token)
  }
`;

function Home() {
  const [googleLoginResult, googleLogin] = useMutation(GoogleLoginMutation);
  const handleResponseGoogle = (response) => {
    const variables = {
      token: response.tokenId,
    };
    googleLogin(variables);
  };
  const handleResponseGoogleFailure = (response) => {};
  return (
    <main className="main">
      <GoogleLogin
        clientId="210066948522-7af1f1tshqc33ku849gdjflhlv6df3dc.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={handleResponseGoogle}
        onFailure={handleResponseGoogleFailure}
      />
    </main>
  );
}

Home.getLayout = (page) => {
  return <Layout title="Home - Untanglify">{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
  };
};
export default Home;
