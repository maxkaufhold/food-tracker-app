import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Image from "react-bootstrap/Image";
import LoginTab from "./LoginTab";
import RegisterTab from "./RegisterTab";

function Login({ setUser }) {
  return (
    <Card
      className="my-5 mx-auto"
      style={{ borderRadius: "1rem", maxWidth: "400px", height: "500px" }}
    >
      <Card.Body className="p-0 d-flex flex-column align-items-center">
        <Tabs
          id="formTabs"
          defaultActiveKey={"login"}
          className="mb-4"
          fill
          style={{ width: "400px" }}
        >
          <Tab
            key="login"
            eventKey="login"
            title={
              <>
                <Image src="../img/login.png" style={{ width: "30px" }} />
              </>
            }
          >
            <LoginTab setUser={setUser} />
          </Tab>
          <Tab
            key="register"
            eventKey="register"
            title={
              <>
                <Image
                  src="../img/registration.png"
                  style={{ width: "30px" }}
                />
              </>
            }
          >
            <RegisterTab setUser={setUser} />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
}

export default Login;
