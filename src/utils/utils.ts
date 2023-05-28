import { getLoginSession } from "@/lib/auth";
import { findUser } from "@/lib/user";

export const getUser = async (): Promise<string | undefined> => {
  const session = await getLoginSession();
  const { username } = (session && (await findUser(session))) ?? {};

  return username;
};
