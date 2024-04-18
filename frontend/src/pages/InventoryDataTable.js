import React from "react";
import axios from "axios";
import { API_URL } from "../Constants";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "react-tabs/style/react-tabs.css";

function InventoryDataTable({ group }) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${API_URL}/api/data/inventory?user_group_id=${group}`)
      .then((response) => {
        setData(response.data);
      });
  }, [group]); // Hier den group hinzufügen, um sicherzustellen, dass das useEffect bei Änderungen von group neu ausgeführt wird

  if (!data || data.length === 0) return null;

  const handleDeleteItem = (inv_id) => {
    if (!inv_id) return; // Wenn keine inv_id ausgewählt wurde, tue nichts
    axios
      .post(`${API_URL}/api/data/inventory/delete`, { inv_id: inv_id })
      .then((response) => {
        // Nachdem das Element gelöscht wurde, aktualisieren wir den Datenzustand
        setData(data.filter((item) => item.inv_id !== inv_id));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Mhd</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.inv_id}>
            <td>{item.description}</td>
            <td>{item.mhd}</td>
            <td>
              <Button
                variant="outline-danger"
                onClick={() => handleDeleteItem(item.inv_id)}
              >
                X
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default InventoryDataTable;
