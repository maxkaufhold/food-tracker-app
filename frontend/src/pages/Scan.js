import React from "react";
import useUser from "../useUser";

function Scan({ group }) {
  const { user } = useUser();
  const url = `https://UrlToScanFrontend?user=${user}&user_group_id=${group}`;
  return <iframe title="embedded-scan" src={url} width="100%" height="90%" />;
}

export default Scan;
  