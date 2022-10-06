import React from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Faz o grafico aparecer na tela

function PieChart(props) {
  return (
    <div className="grafico">
      <Pie options={props.options} data={props.data} />
    </div>
  );
}

export default PieChart;
