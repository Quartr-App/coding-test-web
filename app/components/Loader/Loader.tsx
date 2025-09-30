import React from "react";
import styles from "./Loader.module.css";

const Loader: React.FC = () => (
  <div className={styles.loader}>
    <div className={styles.spinner}></div>
    <span className={styles.caption}>Loading companies...</span>
  </div>
);

export default Loader;
