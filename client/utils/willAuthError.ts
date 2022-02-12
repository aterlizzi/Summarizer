import { getAccessToken } from "./../accesstoken";
import jwt_decode from "jwt-decode";

export const willAuthError = ({ authState, operation }) => {
  if (!authState) {
    // Detect our login mutation and let this operation through:
    return !(
      operation.kind === "mutation" &&
      // Here we find any mutation definition with the "login" field
      operation.query.definitions.some((definition) => {
        return (
          definition.kind === "OperationDefinition" &&
          definition.selectionSet.selections.some((node) => {
            // The field name is just an example, since signup may also be an exception
            return (
              node.kind === "Field" &&
              (node.name.value === "verifyUser" ||
                node.name.value === "verifyGoogleUser")
            );
          })
        );
      })
    );
  } else if (getAccessToken()) {
    const token = getAccessToken();
    const { exp } = jwt_decode(token) as any;
    if (Date.now() >= exp * 1000) return true;
  }

  return false;
};
