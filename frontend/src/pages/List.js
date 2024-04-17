import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function List() {
  return (
    <div style={{ width: "800px", margin: "0 auto", fontSize: "20px" }}>
      <Table striped borderless hover>
        <tbody>
          <tr>
            <td style={{ width: "50px" }}>
              <Button variant="outline-success">+</Button>
            </td>
            <td>
              <Form.Control type="text" id="newItem" />
            </td>
          </tr>
          <tr>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Form>
                <div className="">
                  <Form.Check type={"checkbox"} />
                </div>
              </Form>
            </td>
            <td>Eier</td>
          </tr>
          <tr>
            <td
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Form>
                <div className="">
                  <Form.Check type={"checkbox"} />
                </div>
              </Form>
            </td>
            <td>Milch</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default List;
