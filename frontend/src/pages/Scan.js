import React from "react";
import useUser from "../useUser";

function Scan({ group }) {
  const { user } = useUser();
  const testToken = '95032845-a00b-4624-bf0d-1a1aa1d7d9da';
  console.log(user.token);
  const url = `http://pong123.online/?token=${testToken}`;
  
  return <iframe title="embedded-scan" src={url} width="100%" height="90%" />;
}

export default Scan;