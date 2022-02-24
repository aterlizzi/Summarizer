import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/SummaryPage.module.scss";
import logo from "../../public/logo.png";
import { useQuery } from "urql";
import { Sling as Hamburger } from "hamburger-react";

const Me = `
    query{
        me {
            id
        }
    }
`;

function BannerComp({ isOpen, setOpen }) {
  const router = useRouter();

  const [result, reexecuteMe] = useQuery({ query: Me });

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
        {!result ||
        !result.data ||
        result.error ||
        !result.data.me ||
        !result.data.me.id ? (
          <button
            className={styles.contact}
            onClick={() =>
              router.push(`/login?redirect_url=${encodeURIComponent("/")}`)
            }
          >
            Login
          </button>
        ) : (
          <button
            className={styles.contact}
            onClick={() => router.push("/users/settings")}
          >
            Settings
          </button>
        )}
        <a
          href="https://chrome.google.com/webstore/detail/untanglify/jfojfkbdmdgldjoodnjbbfahglinhkaa"
          target="_blank"
          rel="noreferrer"
        >
          <button className={styles.try}>Try for free</button>
        </a>
        <div className={styles.burgerContainer}>
          <Hamburger
            size={25}
            toggled={isOpen}
            toggle={setOpen}
            aria-label="Mobile Menu Button"
          />
        </div>
      </div>
    </header>
  );
}

export default BannerComp;
