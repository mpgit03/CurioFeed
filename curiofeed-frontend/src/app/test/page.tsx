"use client";

import { useAuth, SignInButton } from "@clerk/nextjs";

export default function TestPage() {
  const { getToken, userId, isSignedIn } = useAuth();

  const handleClick = async () => {
    const token = await getToken();

    console.log("isSignedIn:", isSignedIn);
    console.log("User:", userId);
    console.log("Token:", token);
  };

  return (
    <div className="p-10">
      <SignInButton />

      <button
        onClick={handleClick}
        className="border p-4 ml-4"
      >
        Get Token
      </button>
    </div>
  );
}