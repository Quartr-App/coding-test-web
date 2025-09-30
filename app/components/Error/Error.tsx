import React from "react";
import styles from "./Error.module.css";

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => (
  <div className={styles.error}>
    <span>{message || "Something went wrong. Please try again."}</span>
  </div>
);

export default Error;
