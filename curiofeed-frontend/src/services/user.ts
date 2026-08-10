import { CurrentUser } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log("BACKEND_URL =", API_URL);

interface CurrentUserResponse {
  success: boolean;
  data: CurrentUser;
}

export async function fetchCurrentUser(token: string): Promise<CurrentUser> {
  console.log("fetchCurrentUser request", {
    url: `${API_URL}/api/v1/users/me`,
    hasToken: !!token,
    tokenSample: token?.slice(0, 16),
  });

  const response = await fetch(`${API_URL}/api/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("fetchCurrentUser response status", response.status);

  const data: CurrentUserResponse = await response.json();

  console.log("fetchCurrentUser response body", data);

  if (!response.ok) {
    throw new Error(data?.data ? "Failed to fetch current user" : "Failed to fetch current user");
  }

  return data.data;
}
