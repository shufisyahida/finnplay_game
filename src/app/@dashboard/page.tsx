import React from "react";
import Dashboard from "@/components/Dashboard";
import { getUser } from "@/utils/utils";

export default async function DashboardPage() {
  const username = await getUser();
  const res = await import("../api/data/route");
  const data = await (await res.GET()).json();

  return <Dashboard username={username} data={data} />;
}
