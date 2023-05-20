import React, { useMemo, useState } from "react";
import styles from "./InputRange.module.css";

export default function InputRange({
  min,
  max,
  step,
  label,
  ...inputProps
}: { label: React.ReactNode } & JSX.IntrinsicElements["input"]) {
  const [value, setValue] = useState<number>(2);

  const handleClick = (selectedValue: number) => () => {
    setValue(selectedValue);
  };

  const calculatedRange = useMemo((): number => {
    return ((value - Number(min)) / (Number(max) - Number(min))) * 100;
  }, [value, min, max]);

  const list = [];
  for (let i = Number(min); i <= Number(max); i = i + Number(step)) {
    list.push(
      <div
        className={`${styles.option} ${value >= i ? styles.included : ""}`}
        onClick={handleClick(i)}
      >
        {i}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.label} role="label">
        {label}
      </div>
      <input
        type="range"
        className={styles.range}
        tabIndex={0}
        value={value}
        min={min}
        max={max}
        onChange={(e) => setValue(Number(e.target.value))}
        {...inputProps}
      />
      <div className={styles.progressWrapper}>
        <div
          className={styles.progress}
          style={{ width: `${calculatedRange}%` }}
        />
      </div>
      <div className={styles.list}>{list}</div>
    </div>
  );
}
