import React from "react";
import { Bar, bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

function QtdEmprestimos() {
  const data = {
    labels: ["Março", "Abril", "Maio", "Junho"],
    datasets: [
      {
        label: "Livros devolvidos",
        data: [3, 5, 2, 3],
        backgroundColor: "#1b98e0",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Livros devolvidos",
        font: {
          size: 20,
          color: "#192039",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default QtdEmprestimos;
