import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function Statistics() {
  // Testdaten
  const data = [
    { name: "Jan", gekaufteArtikel: 39 },
    { name: "Feb", gekaufteArtikel: 42 },
    { name: "Mar", gekaufteArtikel: 63 },
    { name: "Apr", gekaufteArtikel: 52 },
    { name: "May", gekaufteArtikel: 57 },
    { name: "Jun", gekaufteArtikel: 42 },
  ];

  return (
    <div style={{ marginTop: '2%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Statistics</h1>
      <p></p>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="gekaufteArtikel" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default Statistics;
