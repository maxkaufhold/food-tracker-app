import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Login from "./Login";
import Signup from "./Signup";

function AuthForm({ setUser }) {
  const [activeTab, setActiveTab] = useState("login");
  const [submit, setSubmit] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  //const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 1000px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  //const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  const handleClick = (tab) => {
    setSubmit(false);
    setActiveTab(tab);
    setTriggerAnimation(true);
    setInitialLoad(false);
  };

  useEffect(() => {
    if (triggerAnimation) {
      setTimeout(() => {
        setTriggerAnimation(false);
      }, 400); // Adjust delay as needed
    }
  }, [triggerAnimation]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        setSubmit(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <Card
          className={isMobile ? "mx-auto" : "my-5 mx-auto"}
          style={{
            borderRadius: "0.5rem",
            maxWidth: isMobile ? "100%" : "350px",
            height: isMobile ? "100%" : "500px",
            overflow: "hidden", // Ensure content is clipped within the card
          }}
        >
          <Card.Body className="p-0 d-flex flex-column">
            <div className="d-flex flex-column align-items-center">
              <div
                className="mb-0 mt-4 d-flex justify-content-between"
                style={{ width: "80%" }}
              >
                <div
                  className={`tab ${
                    activeTab === "login" ? "active" : "passive"
                  }`}
                  onClick={() => handleClick("login")}
                >
                  LOGIN
                  <div
                    className={`underline ${triggerAnimation && "trigger"}`}
                  />
                </div>
                <div
                  className={`tab ${
                    activeTab === "signup" ? "active" : "passive"
                  }`}
                  onClick={() => handleClick("signup")}
                >
                  SIGNUP
                  <div
                    className={`underline ${triggerAnimation && "trigger"}`}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${
                !initialLoad ? (activeTab === "signup" ? "slide-right" : "slide-left") : ""
              }`}
            >
              {activeTab === "login" && (
                <Login
                  setUser={setUser}
                  submit={submit}
                  setSubmit={setSubmit}
                />
              )}
              {activeTab === "signup" && (
                <Signup
                  setUser={setUser}
                  submit={submit}
                  setSubmit={setSubmit}
                />
              )}
            </div>
            <div className="d-flex flex-column align-items-center">
              <Button
                type="submit"
                variant="outline-secondary"
                size="lg"
                style={{
                  width: "80%",
                  position: "absolute",
                  bottom: "10%",
                  transition: "all 1s",
                }}
                onClick={() => setSubmit(true)}
              >
                Submit
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <style>
        {`
        .underline {
            width: 80%;
            height: 3px;
            background-color: rgb(222, 226, 230, .7);
            transition: width 0.3s;
            transform-origin: left;
        }
        
        .tab {
            font-size: 27px;
            font-family: "Raleway", sans-serif;
            font-optical-sizing: auto;
            font-style: normal;
            cursor: pointer;
            position: relative; /* Keeping relative positioning */
        }

        .trigger {
          width: 0 !important;
        }

        .active .underline {
            width: 80%;
        }

        .passive .underline {
            width: 0;
        }

        .active {
            font-weight: 0;
        }

        .passive {
            font-weight: 100;
        }

        .slide-right {
          animation: 1s slide-right;
        }

        @keyframes slide-right {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .slide-left {
          animation: 1s slide-left;
        }

        @keyframes slide-left {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}
      </style>
    </>
  );
}

export default AuthForm;
