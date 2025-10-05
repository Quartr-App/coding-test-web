import React from "react";
import styles from "./Loader.module.css";

const Loader: React.FC = () => (
  <div className={styles.loader} role="status" aria-label="Loading companies">
    <div className={styles.spinner} aria-hidden="true"></div>
    <span className={styles.caption}>Loading companies...</span>
  </div>
);

export default Loader;
