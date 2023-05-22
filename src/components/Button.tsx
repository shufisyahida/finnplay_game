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
  buttonType?: "default" | "primary";
  buttonSize?: "md" | "lg";
  full?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
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
