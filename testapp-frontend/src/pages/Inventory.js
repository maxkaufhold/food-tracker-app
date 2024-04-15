import React from "react";
import axios from "axios";
import InventoryDataTable from "./InventoryDataTable";
import { API_URL } from '../Constants';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Inventory() {
  const user_id = 2;
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${API_URL}/data/groups?user_id=${user_id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  if (!data) return <h1>Keine Daten</h1>;
  return (
    <div>
        <Tabs
          id="inventoryTabs"
          defaultActiveKey={data[0].user_group_id}
          fill
        >
          {data.map((item) => (
            <Tab key={item.user_group_id} eventKey={item.user_group_id} title={item.name}>
              <InventoryDataTable user_group_id={item.user_group_id} />
            </Tab>
          ))}
        </Tabs>
    </div>
  );
};

export default Inventory;
