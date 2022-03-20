import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery } from "urql";
import Layout from "../../../components/layout";

const ReturnGroup = `
  query($id: String!){
    returnGroup(id: $id){
      id
    }
  }
`;

function Group() {
  const router = useRouter();
  const { groupId } = router.query;

  const [result, reexecuteReturnGroup] = useQuery({
    query: ReturnGroup,
    pause: !groupId,
    variables: { id: groupId },
  });

  // return the user if they are not allowed to view.
  useEffect(() => {
    if (result.data) {
      if (result.data.returnGroup === null) {
        router.push("/home");
      }
    }
  }, [result]);

  return <div>Group</div>;
}
Group.getLayout = (page) => {
  return (
    <Layout
      title="Group - Untanglify"
      metaContent="View a group to keep in touch with what your friends are reading."
    >
      {page}
    </Layout>
  );
};
export default Group;
