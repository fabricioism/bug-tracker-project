import { Bar } from "react-chartjs-2";

const getSummaryDataForChart = ({ data }) => {
  if (data && data.length) {
    const bugStates = data.map((item) => item.label);
    const bugData = data.map((item) => item.count);

    return {
      labels: bugStates,
      datasets: [
        {
          label: `Bugs summary`,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: bugData,
          borderCapStyle: "butt",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
        },
      ],
    };
  } else {
    return { labels: [], datasets: [] };
  }
};

export const BarChart = ({ data }) => {
  return (
    <Bar
      data={getSummaryDataForChart({
        data,
      })}
      options={{
        maintainAspectRatio: false,
      }}
    />
  );
};
