export const didAuthError = ({ error }) => {
  return error.graphQLErrors.some((e) => e.message === "Not authenticated.");
};
