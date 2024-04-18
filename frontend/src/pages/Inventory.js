import React, { useEffect, useState } from "react";
import InventoryDataTable from "./InventoryDataTable";

function Inventory({ group }) {

  return (
    <>
      <InventoryDataTable group={group} />
    </>
  );
}

export default Inventory;
