"use client";
import Input from "@/components/Input";
import styles from "./page.module.css";
import React, { useState } from "react";
import Button from "@/components/Button";
import CheckboxGroup from "@/components/CheckboxGroup";

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
      <input type="search" />
    </main>
  );
}
