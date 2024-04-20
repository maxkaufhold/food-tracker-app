import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Image from "react-bootstrap/Image";
import LoginTab from "./LoginTab";
import RegisterTab from "./RegisterTab";

import { useMediaQuery } from "react-responsive";

function Login({ setUser }) {
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 1000px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  //console.log(isDesktopOrTablet, isMobile, isPortrait);

  return (
    <Card
      className={isMobile ? "mx-auto" : "my-5 mx-auto"}
      style={{
        borderRadius: "0.5rem",
        maxWidth: isMobile ? "100%" : "350px",
        height: isMobile ? "100%" : "50%",
      }}
    >
      <Card.Body className="p-0 d-flex flex-column">
        <Tabs
          id="formTabs"
          defaultActiveKey={"login"}
          className="mb-4"
          fill
          style={{ width: "100%" }}
        >
          <Tab
            key="login"
            eventKey="login"
            title={
              <>
                <Image src="../img/login.png" style={{ width: "1.5rem" }} />
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
                  style={{ width: "1.5rem" }}
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
