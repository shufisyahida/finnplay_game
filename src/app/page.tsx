"use client";
import Input from "@/components/Input";
import styles from "./page.module.css";
import React, { useState } from "react";
import Button from "@/components/Button";
import CheckboxGroup from "@/components/CheckboxGroup";
import RadioGroup from "@/components/RadioGroup";
import InputRange from "@/components/InputRange";

export default function Home() {
  const [text, setText] = useState("");
  return (
    <main className={styles.main}>
      <Input
        label="Login"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button>Login</Button>
      <CheckboxGroup
        label="Options"
        options={[{ value: "1", label: "Checkbox 1" }]}
      />
      <RadioGroup
        label="Sort"
        options={[
          { value: "1", label: "A-Z" },
          { value: "2", label: "Z-A" },
        ]}
      />
      <div style={{ padding: 8, width: "100%" }}>
        <InputRange label="Column size" min="2" max="4" step="1" />
      </div>
    </main>
  );
}
