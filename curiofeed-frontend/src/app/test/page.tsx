"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function TestPage() {
  const { user, loading, error } = useCurrentUser();

  return (
    <div style={{ padding: 20 }}>
      <h2>Current User Hook</h2>

      <pre>
        {JSON.stringify(
          {
            loading,
            error,
            user,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}