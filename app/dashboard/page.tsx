"use client";
import { useUser } from "@/app/context/user-context";

export default function Dashboard() {
  const { user, profile } = useUser();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {profile?.name ?? "Unknown User"}</p>
      <p>Email: {profile?.email ?? "Not available"}</p>
      <p>Is Company: {profile?.is_company ? "Yes" : "No"}</p>
    </div>
  );
}
