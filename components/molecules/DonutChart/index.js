import { Doughnut } from "react-chartjs-2";

export const DonutChart = ({ numbers }) => {
  const data = {
    labels: ["New bugs", "Assigned bugs", "Done Bugs"],
    datasets: [
      {
        label: "Bugs in numbers",
        data: numbers,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};
