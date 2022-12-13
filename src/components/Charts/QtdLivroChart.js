import React, { useState, useEffect } from "react";
import api from "../../service/api.js";
import { Spinner } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

function ChartQtd() {
  const [dataChart, setDataChart] = useState({
    labels: ["Biblioteca", "Emprestados"],
    datasets: [
      {
        id: 1,
        label: "",
        data: ["...", "..."],
        backgroundColor: ["#006494", "#1b98e0"],
        borderWidth: 0,
      },
    ],
  });
  const [optionsChart, setOptionsChart] = useState({
    responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: `Total de livros registrados: ...`,
            font: {
              size: 15,
            },
            position: "bottom",
          },
          legend: {
            onClick: (e) => e.stopPropagation(),
            display: true,
            position: "top",
            labels: {
              font: {
                size: 15,
              },
            },
          },
        },
        aspectRatio: 1,
    });
  
  const [chart, setChart] = useState(false);

  async function getDataChartPie() {
    try {
      const response = await (await api.get("/report/quantity-book")).data[0];

      setDataChart({
        ...dataChart,
        datasets: [
          {
            ...dataChart.datasets[0],
            data: [response.stopped, response.circulation]
          },
        ],
      });

      setOptionsChart({
        ...optionsChart,
        plugins: {
          ...optionsChart.plugins,
          title: {
            ...optionsChart.plugins.title,
            text: `Livros registrados: ${response.total}`,
          },
        },
      });

      setChart(true);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataChartPie();
  }, []);

  return (
    <>
      <Pie data={dataChart} options={optionsChart} />
    </>
  );
}

export default ChartQtd;
