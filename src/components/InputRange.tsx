import React, { useMemo, useRef, useState } from "react";
import styles from "./InputRange.module.css";

export default function InputRange({
  min,
  max,
  step,
  label,
  ...inputProps
}: { label: React.ReactNode } & JSX.IntrinsicElements["input"]) {
  const [value, setValue] = useState<number>(Number(min));

  const handleClick = (selectedValue: number) => () => {
    setValue(selectedValue);
  };

  const calculatedRange = useMemo((): number => {
    return (value - Number(min)) / (Number(max) - Number(min));
  }, [value, min, max]);

  const list = [];
  for (let i = Number(min); i <= Number(max); i = i + Number(step)) {
    list.push(
      <div
        className={`${styles.option} ${value >= i ? styles.included : ""}`}
        onClick={handleClick(i)}
        style={{ visibility: value === i ? "hidden" : "visible" }}
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
      <div
        className={styles.value}
        style={{
          left: `calc((100% * ${calculatedRange}) - (${
            2.4 / (Number(max) - Number(min))
          }rem * ${value - Number(min)}))`,
        }}
      >
        {value}
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
      <div
        className={styles.progress}
        style={{
          WebkitTransform: `scaleX(${calculatedRange})`,
          transform: `scaleX(${calculatedRange})`,
        }}
      />
      <div className={styles.list}>{list}</div>
    </div>
  );
}
