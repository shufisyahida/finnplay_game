"use client";
import Input from "@/components/Input";
import styles from "./page.module.css";
import React, { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  return (
    <main className={styles.main}>
      <Input
        label="Login"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </main>
  );
}
