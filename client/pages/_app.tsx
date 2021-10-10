import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
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
