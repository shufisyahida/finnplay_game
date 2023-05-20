import React from "react";
import styles from "./Input.module.css";

export default function Input({
  label,
  value,
  onChange,
  ...inputProps
}: {
  label: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <div className={styles.input}>
      <input
        autoComplete="off"
        value={value}
        onChange={onChange}
        {...inputProps}
      />
      <label className={styles.label}>
        <div className={styles.text}>{label}</div>
      </label>
    </div>
  );
}
