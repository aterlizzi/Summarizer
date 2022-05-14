import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Onboarding.module.scss";
import logo from "../../public/logo.png";
import { useQuery } from "urql";
import { Sling as Hamburger } from "hamburger-react";
import Link from "next/link";

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
        <Link
          href="https://chrome.google.com/webstore/detail/untanglify/jfojfkbdmdgldjoodnjbbfahglinhkaa"
          passHref
        >
          <button className={styles.try}>Try for free</button>
        </Link>
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
