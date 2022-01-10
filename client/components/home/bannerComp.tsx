import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.scss";
import logo from "../../public/logo.png";

function BannerComp() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <header className={styles.banner}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Image src={logo} onClick={handleClick}></Image>
        </div>
        <p className={styles.companyName}>Untanglify</p>
      </div>
      <div className={styles.right}>
        <button
          className={styles.contact}
          onClick={() => router.push("/contact")}
        >
          Contact
        </button>
        <a href="https://www.youtube.com" target="_blank">
          <button className={styles.try}>Try for Free</button>
        </a>
      </div>
    </header>
  );
}

export default BannerComp;
