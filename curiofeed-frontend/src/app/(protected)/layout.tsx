import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import FeedTabs from "@/components/layout/FeedTabs";

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
  <Navbar />
  <FeedTabs />

  <main className="min-h-screen bg-white">
    {children}
  </main>
</>
  );
}