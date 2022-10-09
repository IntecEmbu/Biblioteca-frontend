import React from "react";
import { Bar, bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

function QtdEmprestimos() {
  const data = {
    labels: ["Março", "Abril", "Maio", "Junho"],
    datasets: [
      {
        label: "Livros emprestados",
        data: [3, 5, 2, 3],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 1,
  };

  return <Bar data={data} options={options} />;
}

export default QtdEmprestimos;
