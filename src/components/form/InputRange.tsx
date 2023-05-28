import React, {
  DOMAttributes,
  MouseEventHandler,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./InputRange.module.css";

export default function InputRange({
  min,
  max,
  step,
  label,
  value,
  onChange,
  onThumbClick,
  className,
  ...inputProps
}: JSX.IntrinsicElements["input"] & {
  label: React.ReactNode;
  onThumbClick: (i: number) => MouseEventHandler<HTMLDivElement>;
}) {
  const calculatedRange = useMemo((): number => {
    return (Number(value) - Number(min)) / (Number(max) - Number(min));
  }, [value, min, max]);

  const list = [];
  for (let i = Number(min); i <= Number(max); i = i + Number(step)) {
    list.push(
      <div
        key={i}
        className={`${styles.option} ${
          Number(value) >= i ? styles.included : ""
        }`}
        onClick={onThumbClick(i)}
        style={{ visibility: Number(value) === i ? "hidden" : "visible" }}
      >
        {i}
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.label} role="label">
        {label}
      </div>
      <div
        className={styles.value}
        style={{
          left: `calc((100% * ${calculatedRange}) - (${
            2.4 / (Number(max) - Number(min))
          }rem * ${Number(value) - Number(min)}))`,
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
        onChange={onChange}
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
