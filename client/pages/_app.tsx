import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { createClient, dedupExchange, Provider } from "urql";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { authExchange } from "@urql/exchange-auth";
import { getAuth } from "../utils/getAuth";
import { addAuthToOperation } from "../utils/addAuthToOperation";
import { didAuthError } from "../utils/didAuthError";

const client = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [
    multipartFetchExchange,
    dedupExchange,
    authExchange({
      getAuth,
      addAuthToOperation,
      didAuthError,
    }),
  ],
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
