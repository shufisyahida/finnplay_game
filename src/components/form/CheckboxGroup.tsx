import React, { useState } from "react";
import styles from "./CheckboxGroup.module.css";

interface CheckboxOptions {
  label: string;
  value: string;
}

const CheckboxGroup: React.FC<{
  label: React.ReactNode;
  options: CheckboxOptions[] | undefined;
  value: string[];
  onSelect?: (value: string) => void;
}> = ({ label, options, value, onSelect }) => {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    value: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (onSelect) {
        onSelect(value);
      }
    }
  };

  return (
    <div>
      <div className={styles.label} role="label">
        {label}
      </div>
      <div className={styles.checkboxWrapper}>
        {options?.map((checkbox) => (
          <div
            role="checkbox"
            id={`checkbox-${checkbox.value}`}
            key={`checkbox-${checkbox.value}`}
            aria-checked={value.includes(checkbox.value)}
            onClick={() => onSelect && onSelect(checkbox.value)}
            onKeyDown={(event) => handleKeyDown(event, checkbox.value)}
            tabIndex={0}
            className={`${styles.checkbox} ${
              value.includes(checkbox.value) ? styles.selected : ""
            }`}
          >
            <label htmlFor={`checkbox-${checkbox.value}`}>
              {checkbox.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
