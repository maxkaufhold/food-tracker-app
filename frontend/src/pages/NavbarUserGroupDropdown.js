import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../Constants";
import useUser from "../useUser";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavbarUserGroupDropDown({ group, setGroup }) {
  const { user } = useUser();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/data/groups?user_id=${user.user_id}`).then((response) => {
      setData(response.data);
      if (response.data[0] && !group) {
        setGroup(response.data[0]); // Hier wird die Gruppe beim Laden der Daten automatisch ausgewählt
      }
    });
  }, []); // Der leere Array als zweites Argument sorgt dafür, dass dieser Effekt nur einmalig ausgeführt wird

  const handleGroupSelect = (selectedUserGroupId) => {
    // in actionKey kann kein Objekt übergeben werden, deshalb wird die ID übergeben und in data nach dem Objekt gesucht
    setGroup(data.find((item) => item.user_group_id == selectedUserGroupId));
  };

  return (
    <>
      <NavDropdown
        id="nav-dropdown-dark-example"
        title={group ? group.name : "Select Group"}
        onSelect={(evtKey) => handleGroupSelect(evtKey)}
      >
        {data &&
          data.map((item, index) => (
            <NavDropdown.Item key={index} eventKey={item.user_group_id}>
              {item.name}
            </NavDropdown.Item>
          ))}
      </NavDropdown>
    </>
  );
}

export default NavbarUserGroupDropDown;
