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

function Admin() {
  const [premiumResult, makePremium] = useMutation(MakePremium);
  const [adminResult, makeAdmin] = useMutation(MakeAdmin);
  const [deleteUserResult, deleteUser] = useMutation(DeleteUser);
  const [findUsersResult, findUsers] = useQuery({ query: FindUsers });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handlePremium = () => {
    makePremium({ username }).then((res) => {
      console.log(res);
    });
  };

  const handleDeleteUser = () => {
    deleteUser({ email }).then((res) => {
      console.log(res);
    });
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
      <label htmlFor="">Delete User</label>
      <input type="text" onChange={(e) => setUsername(e.currentTarget.value)} />
      <button type="button" onClick={handleDeleteUser}>
        Delete User
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
