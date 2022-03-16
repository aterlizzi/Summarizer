import React from "react";
import styles from "../../styles/Home.module.scss";

function Video({ type }) {
  switch (type) {
    case "summary":
      return (
        <video
          className={styles.video}
          src="/UntanglifySummarize.mp4"
          autoPlay
          loop
          muted
        ></video>
      );
    case "share":
      return (
        <video
          className={styles.video}
          src="/UntanglifyShare.mp4"
          autoPlay
          loop
          muted
        ></video>
      );
    case "bundle":
      return (
        <video
          className={styles.video}
          src="/UntanglifyBundlesVideo.mp4"
          autoPlay
          loop
          muted
        ></video>
      );
    case "group":
      return (
        <video
          className={styles.video}
          src="/UntanglifyGroups.mp4"
          autoPlay
          loop
          muted
        ></video>
      );
  }
}

export default Video;
