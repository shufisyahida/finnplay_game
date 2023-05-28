import { Session } from "@/interfaces/session";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

const users: Session[] = [];

createUser({
  username: process.env.PLAYER_1 as string,
  password: process.env.PLAYER_1_PASS as string,
});
createUser({
  username: process.env.PLAYER_2 as string,
  password: process.env.PLAYER_2_PASS as string,
});

export async function createUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    username,
    hash,
    salt,
  };

  users.push(user);
}

export async function findUser({
  username,
}: {
  username: string;
}): Promise<Session | undefined> {
  return users.find((user) => user.username === username);
}

export function validatePassword(user: Session, inputPassword: string) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
