import React from "react";
import axios from "axios";
import { API_URL } from "../Constants";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function List({ group }) {
  const [data, setData] = React.useState(null);
  const [newItem, setNewItem] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${API_URL}/api/data/list?user_group_id=${group}`)
      .then((response) => {
        setData(response.data);
      });
  }, [group]);

  const handleInsertItem = () => {
    if (!newItem) return;
    axios
      .post(`${API_URL}/api/data/list/insert`, { user_group_id: group, item: newItem })
      .then((response) => {
        // Nachdem das Element erstellt wurde, aktualisiere den datenzustand
        setData([...data, { list_id: response.data.list_id, item: response.data.item }]);
        setNewItem(""); // Setze das newItem-Feld zurück
      })
      .catch((error) => {
        console.error("Error inserting item:", error);
      });
  };

  const handleDeleteItem = (list_id) => {
    if (!list_id) return;
    axios
      .post(`${API_URL}/api/data/list/delete`, { list_id: list_id })
      .then((response) => {
        setData(data.filter((item) => item.list_id !== list_id));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInsertItem();
    }
  };

  return (
    <Card style={{ maxWidth: "800px", margin: "0 auto", fontSize: "20px" }}>
      <Card.Body>
        <div>
          <Table borderless>
            <tbody>
              <tr>
                <td style={{ width: "50px" }}>
                  <Button variant="outline-success" onClick={handleInsertItem}>+</Button>
                </td>
                <td>
                  <Form.Control 
                    type="text" 
                    id="newItem" 
                    value={newItem ? newItem : ""} 
                    onChange={(e) => setNewItem(e.target.value)} 
                    onKeyDown={handleKeyDown} // Hinzugefügter Event-Handler
                  />
                </td>
              </tr>
              {data && data.map((item) => (
                <tr key={item.list_id}>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Form>
                      <div className="">
                        <Form.Check type={"checkbox"} onChange={() => handleDeleteItem(item.list_id)} />
                      </div>
                    </Form>
                  </td>
                  <td>{item.item}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}

export default List;
