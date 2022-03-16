import {
  faAlignLeft,
  faFile,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.scss";
import UntanglifySummarize from "../../public/UntanglifySummarize.jpg";
import UntanglifyBundle from "../../public/UntanglifyBundle.jpg";
import UntanglifyGroups from "../../public/UntanglifyGroups.jpg";
import UntanglifyShare from "../../public/UntanglifyShare.jpg";
import dynamic from "next/dynamic";
import useMobileDetect from "./util";
const Video = dynamic(() => import("./video"));

interface FeatureSettings {
  section: number;
}

function Feature({ section }: FeatureSettings) {
  const isMobile = useMobileDetect().isMobile();

  return (
    <div
      className={
        section === 1 || section === 3
          ? `${styles.featureContainer} ${styles.reversed}`
          : `${styles.featureContainer} `
      }
    >
      {section === 1 ? (
        <>
          <div className={styles.left}>
            <h4 className={styles.subtitle}>Extract Key Info</h4>
            <p className={styles.subdesc}>
              Pull out only what matters, saving you your most important
              resource, your time.
            </p>
            <div className={styles.bottom}>
              <div className={styles.bottomContainer}>
                <div className={styles.featureCircle}>
                  <FontAwesomeIcon icon={faFile} className={styles.icon} />
                </div>
                <p className={styles.para}>PDFs</p>
              </div>
              <div className={styles.bottomContainer}>
                <div className={styles.featureCircle}>
                  <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
                </div>
                <p className={styles.para}>Articles</p>
              </div>
              <div className={styles.bottomContainer}>
                <div className={styles.featureCircle}>
                  <FontAwesomeIcon icon={faAlignLeft} className={styles.icon} />
                </div>
                <p className={styles.para}>Misc Text</p>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            {isMobile ? (
              <div className={styles.image}>
                <Image
                  src={UntanglifySummarize}
                  alt="Untanglify Summarize Feature"
                />
              </div>
            ) : (
              <Video type={"summary"} />
            )}
          </div>
        </>
      ) : section === 2 ? (
        <>
          <div className={styles.right}>
            {isMobile ? (
              <div className={styles.image}>
                <Image src={UntanglifyShare} alt="Untanglify Share Feature" />
              </div>
            ) : (
              <Video type={"share"} />
            )}
          </div>
          <div className={styles.left} style={{ textAlign: "right" }}>
            <h4 className={styles.subtitle}>
              View & Share Summaries Anywhere, Anytime
            </h4>
            <p className={styles.subdesc}>
              Publicly or privately share and rate your article summaries
              amongst colleagues and friends
            </p>
          </div>
        </>
      ) : section === 3 ? (
        <>
          <div className={styles.left}>
            <h4 className={styles.subtitle}>Add Similar Articles to Bundles</h4>
            <p className={styles.subdesc}>
              Keep track of important articles and summaries by adding them to a
              bundle.
            </p>
          </div>
          <div className={styles.right}>
            {isMobile ? (
              <div className={styles.image}>
                <Image src={UntanglifyBundle} alt="Untanglify Bundle Feature" />
              </div>
            ) : (
              <Video type={"bundle"} />
            )}
          </div>
        </>
      ) : section === 4 ? (
        <>
          <div className={styles.right}>
            {isMobile ? (
              <div className={styles.image}>
                <Image src={UntanglifyGroups} alt="Untanglify Groups Feature" />
              </div>
            ) : (
              <Video type={"group"} />
            )}
          </div>
          <div className={styles.left} style={{ textAlign: "right" }}>
            <h4 className={styles.subtitle}>
              Create and Join Groups with Friends, Colleagues, and Users
            </h4>
            <p className={styles.subdesc}>
              Share summaries with customizable groups to keep up with what your
              friends are reading.
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Feature;
