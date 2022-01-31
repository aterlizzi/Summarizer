import React from "react";
import Layout from "../components/layout";

function Privacy() {
  return <div></div>;
}

Privacy.getLayout = (page) => {
  return (
    <Layout
      metaContent="Find out how Untanglify is using your data here."
      title="Privacy Policy - Untanglify"
    >
      {page}
    </Layout>
  );
};
export default Privacy;
