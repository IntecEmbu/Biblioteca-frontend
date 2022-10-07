import React, { useState, useEffect } from "react";
import api from "../service/api.js";
import { Spinner } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

function ChartQtd() {
  const [dataChart, setDataChart] = useState([]);
  const [optionsChart, setOptionsChart] = useState({});
  const [chart, setChart] = useState(false);

  async function getDataChartPie() {
    try {
      const response = await (await api.get("/report/quantity-book")).data[0];

      setDataChart({
        labels: ["Livros na biblioteca", "Livros emprestados"],
        datasets: [
          {
            id: 1,
            label: "",
            data: [response.stopped, response.circulation],
            backgroundColor: ["#FF6384", "#36A2EB"],
            borderWidth: 0,
          },
        ],
      });

      setOptionsChart({
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: `Total de livros na biblioteca: ${response.total}`,
            font: {
              size: 15,
            },
            position: "bottom",
          },
          legend: {
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
      {chart ? (
        <Pie data={dataChart} options={optionsChart} />
      ) : (
        <div className="loading-chart">
          <Spinner id="loading" animation="border" />
        </div>
      )}
    </>
  );
}

export default ChartQtd;
