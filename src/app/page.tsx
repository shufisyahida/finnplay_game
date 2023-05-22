"use client";
import Input from "@/components/Input";
import styles from "./page.module.css";
import React, { useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className={styles.main}>
      <Image
        src="/logo.svg"
        alt=""
        width={70}
        height={70}
        className={styles.logo}
      />
      <form className={styles.form} aria-label="Sign in">
        <fieldset>
          <Input
            label="Login"
            tabIndex={0}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <Button
            buttonSize="lg"
            buttonType="primary"
            className={styles.button}
            type="submit"
            full
            isLoading={isLoading}
          >
            Login
          </Button>
        </fieldset>
      </form>
    </main>
  );
}
