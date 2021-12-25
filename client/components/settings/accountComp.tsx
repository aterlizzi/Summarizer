import React from "react";
import { useQuery } from "urql";
import styles from "../../styles/Settings.module.scss";
import AccountInfo from "./accountInfoComp";

const Me = `
query {
  me{
    accountType
    paymentTier
    email
    createdAt
    reason
    wordCount
    current_period
  }
}
`;

function Account() {
  const [meResult, reexecuteMe] = useQuery({ query: Me });

  return (
    <section className={styles.account}>
      {!meResult.fetching && !meResult.error ? (
        <>
          <AccountInfo
            title={"Account Type"}
            text={
              meResult.data.me.accountType == "web" ? "Untanglify" : "Google"
            }
          />
          <AccountInfo
            title={"Payment Tier"}
            text={`Untanglify ${meResult.data.me.paymentTier}`}
          />
          <AccountInfo
            title={"Remaining Words"}
            text={meResult.data.me.wordCount}
          />
          <AccountInfo title={"Email"} text={meResult.data.me.email} />
          <AccountInfo
            title={"Member Since"}
            text={new Date(parseInt(meResult.data.me.createdAt)).toUTCString()}
          />
          <AccountInfo title={"Motivation"} text={meResult.data.me.reason} />
          <AccountInfo
            title={"Next Period"}
            text={new Date(
              new Date(meResult.data.me.current_period).setMonth(
                new Date(meResult.data.me.current_period).getMonth() + 1
              )
            ).toUTCString()}
          />
        </>
      ) : null}
    </section>
  );
}

export default Account;
