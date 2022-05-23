import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";

const MakePremium = `
    mutation($username: String!){
        makePremium(username: $username)
    }
`;

const MakeAdmin = `
    mutation{
      makeAdmin
    }
`;

const DeleteUser = `
    mutation($email: String!){
      deleteUserAdmin(email: $email)
    }
`;

const FindUsers = `
    query{
      findUsersAdmin{
        email
        id
      }
    }
`;

const ReturnABTest = `
    query($medium: String!){
      returnABCount(medium: $medium){
        a
        b
        type
      }
    }
`;

const ConfirmUserAdmin = `
    mutation($email: String!){
      confirmAdminUser(email: $email)
    }
`;

function Admin() {
  const [send, setSend] = useState(false);
  const [medium, setMedium] = useState("");
  const [premiumResult, makePremium] = useMutation(MakePremium);
  const [adminResult, makeAdmin] = useMutation(MakeAdmin);
  const [deleteUserResult, deleteUser] = useMutation(DeleteUser);
  const [confirmUserAdminResult, confirmUserAdmin] =
    useMutation(ConfirmUserAdmin);
  const [returnABResult, returnAB] = useQuery({
    query: ReturnABTest,
    variables: { medium },
    pause: !send,
  });
  const [findUsersResult, findUsers] = useQuery({ query: FindUsers });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handlePremium = () => {
    makePremium({ username }).then((res) => {
      console.log(res);
    });
  };

  const handleConfirmUserAdmin = () => {
    confirmUserAdmin({ email }).then((res) => console.log(res));
  };

  const handleDeleteUser = () => {
    deleteUser({ email }).then((res) => {
      console.log(res);
    });
  };

  const handleReturnABTest = () => {
    setSend(true);
    setTimeout(() => {
      setSend(false);
    }, 5000);
  };

  // useEffect(() => {
  //   makeAdmin().then((res) => {
  //     console.log(res);
  //   });
  // }, [makeAdmin]);
  console.log(findUsersResult);

  return (
    <div className="">
      <label htmlFor="">Make user premium</label>
      <input type="text" onChange={(e) => setUsername(e.currentTarget.value)} />
      <button type="button" onClick={handlePremium}>
        Make Premium
      </button>
      <label htmlFor="">Return AB Test Results</label>
      <input type="text" onChange={(e) => setMedium(e.currentTarget.value)} />
      <button type="button" onClick={handleReturnABTest}>
        Return Results
      </button>
      <p>
        a:{" "}
        {returnABResult &&
        returnABResult.data &&
        returnABResult.data.returnABCount
          ? returnABResult.data.returnABCount.a
          : null}
      </p>
      <p>
        b:{" "}
        {returnABResult &&
        returnABResult.data &&
        returnABResult.data.returnABCount
          ? returnABResult.data.returnABCount.b
          : null}
      </p>
      <label htmlFor="">Delete User</label>
      <input type="text" onChange={(e) => setUsername(e.currentTarget.value)} />
      <button type="button" onClick={handleDeleteUser}>
        Delete User
      </button>
      <label htmlFor="">Confirm User</label>
      <input type="text" onChange={(e) => setEmail(e.currentTarget.value)} />
      <button type="button" onClick={handleConfirmUserAdmin}>
        Confirm User
      </button>
      {findUsersResult.data && findUsersResult.data.findUsersAdmin
        ? findUsersResult.data.findUsersAdmin.map((user) => {
            return <p key={user.id}>{user.email}</p>;
          })
        : null}
    </div>
  );
}

export default Admin;
