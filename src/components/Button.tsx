import React from "react";
import styles from "./Button.module.css";
import Image from "next/image";

export default function Button({
  children,
  isLoading,
  ...buttonProps
}: { isLoading?: boolean } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button className={styles.button} {...buttonProps}>
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
