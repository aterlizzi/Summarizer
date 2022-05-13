import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery } from "urql";
import Layout from "../../../components/layout";
import styles from "../../../styles/GroupId.module.scss";

const ReturnGroup = `
  query($id: String!){
    returnGroup(id: $id){
      id
      name
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
  }, [result, router]);

  return (
    <main className={styles.main}>
      {result.data && result.data.returnGroup
        ? result.data.returnGroup.name
        : null}
    </main>
  );
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
