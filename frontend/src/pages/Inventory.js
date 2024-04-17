import React, { useEffect, useState } from "react";
import useGroup from "../useGroup";
import InventoryDataTable from "./InventoryDataTable";

function Inventory() {
  var { group } = useGroup();

  return (
    <>
      <InventoryDataTable user_group_id={group.user_group_id ? group.user_group_id : null } />
    </>
  );
}

export default Inventory;
