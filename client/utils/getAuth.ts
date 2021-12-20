export const getAuth = async ({ authState, mutate }) => {
  if (!authState) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) return { accessToken };
    return null;
  }

  //   handle refresh token logic if access token becomes expired.
  const tokens = await handleRefreshToken();
  if (tokens) return tokens;

  //   handle logout if refresh token logic fails.
  localStorage.clear();
  //   log user out.
  await handleLogout();

  return null;
};

const handleRefreshToken = async () => {
  const url = "http://localhost:4000/refresh_token";
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
  });
  if (response) {
    const data = await response.json();
    if (data.ok) {
      localStorage.setItem("accessToken", data.accessToken);
      return { accessToken: data.accessToken };
    }
  }
  return false;
};

const handleLogout = async () => {
  const query = `mutation Logout() {
        logout()
      }`;
  const logoutBody = JSON.stringify({
    query,
  });
  await fetch("http://localhost:4000/graphql", {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: logoutBody,
  });
};
