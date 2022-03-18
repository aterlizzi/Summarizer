import React from "react";
import Image from "next/image";
import logo from "../public/logo.png";

function Emails() {
  return (
    <main
      style={{
        height: "100vh",
        width: "100%",
        background: "#121212",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2em",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: "50px", marginRight: ".5em" }}>
          <Image src={logo} />
        </div>
        <p style={{ color: "rgba(255, 255, 255, 0.87)", fontSize: "2rem" }}>
          Untanglify
        </p>
      </div>
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "2em",
          maxWidth: "30em",
          width: "90%",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <header
          style={{
            background: "#4740d1",
            borderBottom: "3px solid rgba(255, 255, 255, 0.08)",
            padding: "2em 1em",
            borderTopLeftRadius: "2em",
            borderTopRightRadius: "2em",
          }}
        >
          <h3
            style={{
              color: "rgba(255, 255, 255, 0.87)",
              margin: "0em",
            }}
          >
            Reset Password Request
          </h3>
        </header>
        <section
          style={{ padding: "1em", display: "flex", flexDirection: "column" }}
        >
          <p style={{ color: "rgba(255, 255, 255, .6)", margin: "0em" }}>
            Hi Aidan, <br /> <br />
            We got a request for a password change on your Untanglify account.
            <br />
            <br />
            If this was you,{" "}
            <span style={{ color: "#bb86fc" }}>click the button below</span> to
            reset your password. <br /> <br />
            If this wasn't you, no worries. You can ignore this email your
            account is secured.
            <br />
            <br />
            If you need help with any of the steps outlined in this email,
            please contact{" "}
            <a href="https://untanglify.com/contact">
              <span style={{ color: "#bb86fc" }}>Customer Support.</span>
            </a>
            <br />
            <br />
            Best, <br />
            The Untanglify Team.
          </p>
          <a href="" style={{ margin: "2em 0em 1em 0em" }}>
            <button
              style={{
                background: "#4740d1",
                width: "50%",
                outline: "none",
                border: "none",
                borderRadius: ".5em",
                padding: ".5em 0em",
                color: "rgba(255, 255, 255, 0.87)",
                cursor: "pointer",
                alignSelf: "center",
                marginBottom: "1em",
                fontSize: "1rem",
              }}
            >
              Reset Password
            </button>
          </a>
        </section>
      </div>
    </main>
  );
}

export default Emails;
