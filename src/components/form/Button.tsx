import React from "react";
import styles from "./Button.module.css";
import Image from "next/image";

export default function Button({
  children,
  isLoading,
  buttonType = "default",
  buttonSize = "md",
  full,
  className,
  ...buttonProps
}: {
  isLoading?: boolean;
  buttonType?: "default" | "primary" | "transparent";
  buttonSize?: "md" | "lg";
  full?: boolean;
} & JSX.IntrinsicElements["button"]) {
  return (
    <button
      className={`${styles.button} ${styles[buttonType]} ${
        styles[buttonSize]
      } ${full ? styles.full : ""} ${className || ""}`}
      {...buttonProps}
    >
      {isLoading ? (
        <Image
          className={styles.loading}
          width={14}
          height={14}
          src="/loading.svg"
          alt="loading"
        />
      ) : (
        children
      )}
    </button>
  );
}
