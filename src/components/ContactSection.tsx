"use client";

import styles from "./ContactSection.module.css";

export default function ContactSection({ num, label }: { num: string; label: string }) {
  return (
    <div className={styles.wrapper}>
      {/* Big heading area */}
      <div className={styles.headingArea}>
        <span className={styles.phoneNum}>+47</span>
        <h2 className={styles.heading}>
          <span>GET IN</span>
          <span>TOUCH</span>
        </h2>
      </div>

      {/* Bottom row */}
      <div className={styles.row}>
        <div className={styles.rowLeft}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>{num}</span>
            <span className={styles.sectionLabel}>{label}</span>
          </div>
        </div>

        <a href="mailto:siaresatcesur@gmail.com" className={styles.rowMid}>
          siaresatcesur@gmail.com
        </a>

        <div className={styles.rowRight}>
          <a
            href="https://github.com/esatcesur74/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/esat-cesur-240803390/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
