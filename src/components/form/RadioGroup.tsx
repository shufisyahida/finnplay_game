import React from "react";
import styles from "./RadioGroup.module.css";

interface RadioGroupProps {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  value?: string;
  onSelect?: (value: string) => void;
  onKeyDown?: () => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  value,
  onSelect,
  onKeyDown,
}) => {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    currentValue: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (onSelect) {
        onSelect(currentValue);
      }
    }
  };

  return (
    <div>
      <div className={styles.label} role="label">
        {label}
      </div>
      <div className={styles.radioWrapper} role="radiogroup">
        {options.map((option) => (
          <div
            role="radio"
            key={option.value}
            aria-checked={value === option.value}
            onClick={() => onSelect && onSelect(option.value)}
            onKeyDown={(event) => handleKeyDown(event, option.value)}
            tabIndex={0}
            className={`${styles.radio} ${
              value === option.value ? styles.selected : ""
            }`}
          >
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
