import "../styles/globals.css";
import type { AppProps } from "next/app";

import { createClient, dedupExchange, Provider } from "urql";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";

const client = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [multipartFetchExchange, dedupExchange],
  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
