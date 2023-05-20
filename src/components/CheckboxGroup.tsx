import React, { useState } from "react";
import styles from "./CheckboxGroup.module.css";

interface CheckboxOptions {
  label: string;
  value: string;
}

const CheckboxGroup: React.FC<{
  label: React.ReactNode;
  options: CheckboxOptions[];
}> = ({ label, options }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    if (selectedCheckboxes.includes(value)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((checkbox) => checkbox !== value)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    value: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCheckboxChange(value);
    }
  };

  return (
    <div>
      <span className={styles.label}>{label}</span>
      <div className={styles.checkboxWrapper}>
        {options.map((checkbox) => (
          <div
            role="checkbox"
            id={`checkbox-${checkbox.value}`}
            key={`checkbox-${checkbox.value}`}
            aria-checked={selectedCheckboxes.includes(checkbox.value)}
            onClick={() => handleCheckboxChange(checkbox.value)}
            onKeyDown={(event) => handleKeyDown(event, checkbox.value)}
            tabIndex={0}
            className={`${styles.checkbox} ${
              selectedCheckboxes.includes(checkbox.value) ? styles.selected : ""
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
