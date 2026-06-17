import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="p-10">
      <SignInButton />
      <UserButton />
    </main>
  );
} 