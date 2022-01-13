import React from "react";
import styles from "../../styles/Referral.module.scss";
import Svg from "./svg";
import Link from "next/link";

function TitleSection() {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <div className={styles.top}>
          <p className={styles.byline}>REFERRAL PROGRAM</p>
          <h1 className={styles.title}>Expand our network, get rewarded</h1>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.bottom}>
          <p className={styles.desc}>
            If you love Untanglify as much as we do, why not share the love.
            Through our tiered referral program, you’ll be rewarded for sharing
            Untanglify with others.
          </p>
          <p className={styles.link}>
            <Link href="#referral">GO TO MY REFERRAL LINK</Link>
          </p>
        </div>
      </section>
      <Svg />
    </header>
  );
}

export default TitleSection;
