import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation } from "urql";

const ConfirmForgotPassword = `
  mutation($token: String!){
    confirmForgotPassword(token: $token)
  }
`;

const ChangePassword = `
  mutation($password: String!, id: Float!){
    changePassword(password: $password, id: $id){
      accessToken
    }
  }
`;

function ForgotPassToken() {
  const router = useRouter();
  const { forgotPassToken } = router.query;

  const [confirmResult, confirm] = useMutation(ConfirmForgotPassword);
  const [changeResult, change] = useMutation(ChangePassword);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [displayPass, setDisplayPass] = useState(false);

  useEffect(() => {
    if (forgotPassToken) {
      confirm({ token: forgotPassToken }).then((res) => {
        if (res.data && res.data.confirmForgotPassword !== "") {
          setUserId(res.data.confirmForgotPassword);
          setDisplayPass(true);
        }
      });
    }
  }, [forgotPassToken]);

  const handleChangePass = () => {
    if (!displayPass) return;
    change({ id: userId, password }).then((res) => {
      if (
        res.data &&
        res.data.changePassword &&
        res.data.changePassword.accessToken !== ""
      ) {
        localStorage.setItem(
          "accessToken",
          res.data.changePassword.accessToken
        );
        router.push("/users/settings");
      }
    });
  };

  return <div></div>;
}

export default ForgotPassToken;
