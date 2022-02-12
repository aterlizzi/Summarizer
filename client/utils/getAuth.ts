import { getAccessToken, setAccessToken } from "../accesstoken";

export const getAuth = async ({ authState }) => {
  if (!authState) {
    let accessToken = getAccessToken();
    if (accessToken) return { accessToken };

    // if you have a cookie but not an accessToken
    if (!accessToken) {
      const token = await handleRefreshToken();
      if (token) {
        return token;
      }
    }
    return null;
  }

  //   handle refresh token logic if access token becomes expired.
  const tokens = await handleRefreshToken();
  if (tokens) return tokens;

  //   handle logout if refresh token logic fails.
  setAccessToken("");
  //   log user out.
  await handleLogout();

  return null;
};

const handleRefreshToken = async () => {
  const url =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3000/api/refresh_token"
      : "/api/refresh_token";
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
  });
  if (response) {
    const data = await response.json();
    if (data.ok) {
      setAccessToken(data.accessToken);
      return { accessToken: data.accessToken };
    }
  }
  return false;
};

const handleLogout = async () => {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/graphql"
      : "/graphql";
  const query = `mutation Logout() {
        logout()
      }`;
  const logoutBody = JSON.stringify({
    query,
  });
  await fetch(url, {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: logoutBody,
  });
  setAccessToken("");
};
