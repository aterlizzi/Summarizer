import Link from "next/link";
import React from "react";
import styles from "../../styles/Home.module.scss";

function TitlePage() {
  return (
    <div className={styles.titleCard}>
      <h1 className={styles.title}>
        Learn More.
        <br />
        Earn More.
        <br />
        Faster.
      </h1>
      <p className={styles.desc}>
        <span className={styles.italic}>
          All that anyone ever wants in the end is more time.
        </span>{" "}
        Untanglify saves time by using advanced AI and deep learning to extract
        the key information in text, faster and more accurately than ever
        before. Oh, and it&apos;s free.
      </p>
      <Link
        href="https://chrome.google.com/webstore/detail/untanglify/jfojfkbdmdgldjoodnjbbfahglinhkaa"
        passHref
      >
        <button className={styles.tryButton}>Try for Free</button>
      </Link>
    </div>
  );
}

export default TitlePage;
