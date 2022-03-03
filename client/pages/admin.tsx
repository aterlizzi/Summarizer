import React, { useEffect, useState } from "react";
import { useMutation } from "urql";

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

function Admin() {
  const [premiumResult, makePremium] = useMutation(MakePremium);
  const [adminResult, makeAdmin] = useMutation(MakeAdmin);
  const [username, setUsername] = useState("");

  const handlePremium = () => {
    makePremium({ username }).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    makeAdmin().then((res) => {
      console.log(res);
    });
  }, [makeAdmin]);

  return (
    <div className="">
      <label htmlFor="">Make user premium</label>
      <input type="text" onChange={(e) => setUsername(e.currentTarget.value)} />
      <button type="button" onClick={handlePremium}>
        Make Premium
      </button>
    </div>
  );
}

export default Admin;
