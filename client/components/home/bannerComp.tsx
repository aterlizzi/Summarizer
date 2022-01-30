import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.scss";
import logo from "../../public/logo.png";
import { useQuery } from "urql";

const Me = `
    query{
        me {
            id
        }
    }
`;

function BannerComp() {
  const router = useRouter();

  const [result, reexecuteMe] = useQuery({ query: Me });

  console.log(result);

  const handleClick = () => {
    router.push("/");
  };

  return (
    <header className={styles.banner}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Image
            alt="Logo for Untanglify"
            src={logo}
            onClick={handleClick}
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
        <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
          <button className={styles.try}>Try for free</button>
        </a>
      </div>
    </header>
  );
}

export default BannerComp;
