import React, { useEffect, useRef, useState } from "react";
import styles from "./Error.module.css";
import Loader from "../Loader/Loader";

type StructuredError = { code?: number | null; message: string };

interface ErrorProps {
  message?: string | StructuredError;
  onRetry?: () => void | Promise<void>;
}

const Error: React.FC<ErrorProps> = ({ message, onRetry }) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleRetry = async () => {
    if (!onRetry) return;
    setIsRetrying(true);
    try {
      await Promise.resolve(onRetry());
    } catch (err) {
      // log and allow parent to handle errors
      console.error('Retry failed', err);
    } finally {
      if (mounted.current) setIsRetrying(false);
    }
  };

  if (isRetrying) {
    return <Loader />;
  }

  const renderMessage = () => {
    if (!message) return <span>Something went wrong. Please try again.</span>;
    if (typeof message === 'string') return <span>{message}</span>;
    return (
      <div>
        <div style={{ fontWeight: 700 }}>ERROR</div>
        <div>{(message.code ? `${message.code}: ` : '') + message.message}</div>
      </div>
    );
  };

  return (
    <div className={styles.error} role="alert">
      {renderMessage()}
      {onRetry && (
        <button
          type="button"
          onClick={handleRetry}
          className={styles.retry}
          aria-label="Retry fetching data"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default Error;
