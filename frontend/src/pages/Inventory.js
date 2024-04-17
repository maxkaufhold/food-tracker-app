import React, { useEffect, useState } from "react";
import InventoryDataTable from "./InventoryDataTable";

function Inventory({ group }) {

  return (
    <>
      <InventoryDataTable user_group_id={group ? group.user_group_id : null } />
    </>
  );
}

export default Inventory;
