import React from "react";
import styles from "./Input.module.css";
import Image from "next/image";

export default function Input({
  label,
  value,
  onChange,
  search,
  className,
  ...inputProps
}: {
  label: string;
  search?: boolean;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <div className={`${styles.input} ${className || ""}`}>
      <input
        id={label}
        autoComplete="off"
        value={value}
        onChange={onChange}
        {...inputProps}
      />
      <label htmlFor={label} className={styles.label}>
        <div className={styles.text}>{label}</div>
      </label>
      {search && (
        <Image
          width={16}
          height={16}
          alt="search icon"
          src="/search.svg"
          className={styles.search}
        />
      )}
    </div>
  );
}
