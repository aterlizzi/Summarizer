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
import { useMemo } from "react";
import { willAuthError } from "../utils/willAuthError";

function MyApp({ Component, pageProps, isLoggedIn }) {
  const getLayout = Component.getLayout || ((page) => page);

  const client = useMemo(() => {
    return createClient({
      url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/graphql"
          : "https://untanglify.com/graphql",
      exchanges: [
        dedupExchange,
        authExchange({
          getAuth,
          addAuthToOperation,
          didAuthError,
          willAuthError,
        }),
        multipartFetchExchange,
      ],
      fetchOptions: {
        credentials: "include",
      },
    });
  }, []);

  return getLayout(
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
