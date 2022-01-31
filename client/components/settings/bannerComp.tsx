import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Settings.module.scss";
import logo from "../../public/logo.png";
import { Sling as Hamburger } from "hamburger-react";

function BannerComp({ setOpen, isOpen, burger, tryFree }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };
  return (
    <header className={styles.banner}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Image
            src={logo}
            onClick={handleClick}
            alt="Logo for Untanglify"
          ></Image>
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
        <button
          className={styles.contact}
          onClick={() => router.push("/referral")}
        >
          Refer a Friend
        </button>
        {burger ? (
          <div className={styles.burgerContainer}>
            <Hamburger
              size={25}
              toggled={isOpen}
              toggle={setOpen}
              aria-label="Mobile Menu Button"
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default BannerComp;
