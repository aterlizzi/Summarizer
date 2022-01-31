import React from "react";
import Layout from "../components/layout";

function Terms() {
  return <div></div>;
}

Terms.getLayout = (page) => {
  return (
    <Layout
      metaContent="If you're using Untanglify, you must comply by our Terms of Service. Check out this page to find our Untanglify's policies for the benefit of us both!"
      title="Terms of Service - Untanglify"
    >
      {page}
    </Layout>
  );
};
export default Terms;
