"use client";
import Input from "@/components/form/Input";
import styles from "./Login.module.css";
import React, { useState } from "react";
import Button from "@/components/form/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (!res.ok) {
        setIsLoading(false);
      } else {
        router.refresh();
      }
    } catch (error: unknown) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <Image
        src="/logo.svg"
        alt=""
        width={70}
        height={70}
        className={styles.logo}
      />
      <form
        className={styles.form}
        aria-label="Sign in"
        onSubmit={handleSubmit}
      >
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
            role="submit"
          >
            Login
          </Button>
        </fieldset>
      </form>
    </main>
  );
}
