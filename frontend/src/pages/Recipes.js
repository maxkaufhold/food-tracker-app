import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { API_URL } from "../Constants";
import Stack from "react-bootstrap/Stack";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

async function searchRecipes(credentials) {

  const options = {
    method: "POST",
    url: "https://gustar-io-deutsche-rezepte.p.rapidapi.com/generateRecipe",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "d9e40347acmshd780b802db69f46p18e511jsnea69e1009cbd",
      "X-RapidAPI-Host": "gustar-io-deutsche-rezepte.p.rapidapi.com",
    },
    data: {
      text: "Ein zuckerfreier Kuchen mit Cashews",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

function Recipes({ group }) {
  const [data, setData] = useState(null);
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const options = {
    method: "POST",
    url: "https://gustar-io-deutsche-rezepte.p.rapidapi.com/generateRecipe",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "d9e40347acmshd780b802db69f46p18e511jsnea69e1009cbd",
      "X-RapidAPI-Host": "gustar-io-deutsche-rezepte.p.rapidapi.com",
    },
    data: {
      text: "Ein zuckerfreier Kuchen mit Cashews",
    },
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/data/inventory/lowestmhd?user_group_id=${group}`)
      .then((response) => {
        setData(response.data);
      });
  }, [group]);

  if (!data) return null;

  return (
    <div>
      <Stack
        direction="horizontal"
        gap={2}
        wrap="wrap" // Flex-Elemente werden auf mobilen Geräten in die nächste Zeile umgebrochen
      >
        {data.map((item, index) => (
          <ToggleButtonGroup type="checkbox" className="mb-2">
            <ToggleButton variant={`outline-secondary`} id={index}>
              {item.description}
            </ToggleButton>
          </ToggleButtonGroup>
        ))}
      </Stack>
    </div>
  );
}

export default Recipes;
