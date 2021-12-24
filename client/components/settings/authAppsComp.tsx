import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery } from "urql";
import styles from "../../styles/Settings.module.scss";
import AuthContainerComp from "./authContainerComp";

const AuthZotero = `
  mutation{
    authZotero
  }
`;
const AuthNotion = `
  mutation{
    authNotion
  }
`;

const AuthGoogle = `
  mutation{
    authGoogle
  }
`;

const AuthEvernote = `
  mutation{
    authEvernote
  }
`;
const ClearEvernote = `
  mutation{
    clearEvernote
  }
`;
const ClearNotion = `
  mutation{
    clearNotion
  }
`;
const ClearGoogle = `
  mutation{
    clearGoogle
  }
`;
const ClearZotero = `
  mutation{
    clearZotero
  }
`;

const Me = `
query {
  me{
    settings {
      zoteroConnected
      notionConnected
      googleConnected
      evernoteConnected
    }
  }
}
`;

function AuthorizeApps() {
  const router = useRouter();
  const [zoteroResult, authZotero] = useMutation(AuthZotero);
  const [notionResult, authNotion] = useMutation(AuthNotion);
  const [googleResult, authGoogle] = useMutation(AuthGoogle);
  const [evernoteResult, authEvernote] = useMutation(AuthEvernote);
  const [clearZoteroResult, clearZotero] = useMutation(ClearZotero);
  const [clearNotionResult, clearNotion] = useMutation(ClearNotion);
  const [clearEvernoteResult, clearEvernote] = useMutation(ClearEvernote);
  const [clearGoogleResult, clearGoogle] = useMutation(ClearGoogle);

  const [meResult, reexecuteMe] = useQuery({ query: Me });

  console.log(meResult);

  const handleClearZotero = () => {
    clearZotero();
  };
  const handleClearNotion = () => {
    clearNotion();
  };
  const handleClearEvernote = () => {
    clearEvernote();
  };
  const handleClearGoogle = () => {
    clearGoogle();
  };

  const handleZoteroAuth = () => {
    authZotero().then((res) => {
      if (res.data && res.data.authZotero !== "") {
        const url = res.data.authZotero;
        router.push(url);
      }
    });
  };

  const handleNotionAuth = () => {
    authNotion().then((res) => {
      if (res.data && res.data.authNotion !== "") {
        const url = res.data.authNotion;
        router.push(url);
      }
    });
  };

  const handleGoogleAuth = () => {
    authGoogle().then((res) => {
      if (res.data && res.data.authGoogle !== "") {
        const url = res.data.authGoogle;
        router.push(url);
      }
    });
  };

  const handleEvernoteAuth = () => {
    authEvernote().then((res) => {
      if (res.data && res.data.authEvernote !== "") {
        const url = res.data.authEvernote;
        router.push(url);
      }
    });
  };

  return (
    <div className={styles.grid}>
      {meResult.fetching || meResult.error ? null : (
        <>
          <AuthContainerComp
            handleAuth={handleZoteroAuth}
            name={"Zotero"}
            connection={meResult.data.me.settings.zoteroConnected}
            handleDisableAuth={handleClearZotero}
          />
          <AuthContainerComp
            handleAuth={handleNotionAuth}
            name={"Notion"}
            connection={meResult.data.me.settings.notionConnected}
            handleDisableAuth={handleClearNotion}
          />
          <AuthContainerComp
            handleAuth={handleGoogleAuth}
            name={"Google"}
            connection={meResult.data.me.settings.googleConnected}
            handleDisableAuth={handleClearGoogle}
          />
          <AuthContainerComp
            handleAuth={handleEvernoteAuth}
            connection={meResult.data.me.settings.evernoteConnected}
            name={"Evernote"}
            handleDisableAuth={handleClearEvernote}
          />
        </>
      )}
    </div>
  );
}

export default AuthorizeApps;
