import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Settings.module.scss";
import logo from "../../public/logo.png";

function BannerComp() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };
  return (
    <header className={styles.banner}>
      <div className={styles.logo}>
        <Image src={logo} onClick={handleClick}></Image>
      </div>
      <p className={styles.companyName}>Untanglify</p>
    </header>
  );
}

export default BannerComp;
