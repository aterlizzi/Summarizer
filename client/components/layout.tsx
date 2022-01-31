import React from "react";
import Head from "next/head";

function Layout({ children, title, metaContent }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1 "
        />
        <meta name="description" content={metaContent} />
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      {children}
    </>
  );
}

export default Layout;
