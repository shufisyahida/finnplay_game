import React, { useState } from "react";
import styles from "./RadioGroup.module.css";

interface RadioGroupProps {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, options }) => {
  const [selectedOption, setSelectedOption] = useState<string>();

  const handleClick = (value: string) => {
    setSelectedOption(value);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    value: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick(value);
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
            aria-checked={selectedOption === option.value}
            onClick={() => handleClick(option.value)}
            onKeyDown={(event) => handleKeyDown(event, option.value)}
            tabIndex={0}
            className={`${styles.radio} ${
              selectedOption === option.value ? styles.selected : ""
            }`}
          >
            <label>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
