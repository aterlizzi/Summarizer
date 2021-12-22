import React from "react";

function AuthContainerComp({ handleAuth, name }) {
  return (
    <div>
      <button onClick={handleAuth}>Authenticate with {name}</button>
    </div>
  );
}

export default AuthContainerComp;
