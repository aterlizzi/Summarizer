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
      <div style={{ display: "flex" }}>
        <div style={{ maxWidth: "50px" }}>
          <Image src={logo} />
        </div>
        <p style={{ color: "rgba(255, 255, 255, 0.87)" }}>Untanglify</p>
      </div>
    </main>
  );
}

export default Emails;
