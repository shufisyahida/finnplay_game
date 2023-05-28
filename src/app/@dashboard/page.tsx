import React from "react";
import Dashboard from "@/components/Dashboard";
import { getUser } from "@/utils/utils";

export default async function DashboardPage() {
  const username = await getUser();

  return <Dashboard username={username} />;
}
