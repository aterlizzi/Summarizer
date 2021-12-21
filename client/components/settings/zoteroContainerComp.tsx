import React from "react";

function ZoteroContainerComp({ handleZoteroAuth }) {
  return (
    <div>
      <button onClick={handleZoteroAuth}>Authenticate with Zotero</button>
    </div>
  );
}

export default ZoteroContainerComp;
