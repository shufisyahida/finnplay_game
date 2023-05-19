import React from "react";
import styles from "./Input.module.css";

export default function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className={styles.input}>
      <input autoComplete="off" value={value} onChange={onChange} />
      <label className={styles.label}>
        <div className={styles.text}>{label}</div>
      </label>
    </div>
  );
}
