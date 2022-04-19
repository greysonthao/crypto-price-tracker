import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "../components/CircularProgress";
import Typography from "@mui/material/Typography";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "7 Days",
    value: 7,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

export default function SmallCoinChart(props) {
  const { coinId, price_change_percentage } = props;
  const [historicalData, setHistoricalData] = React.useState([]);
  const [days, setDays] = React.useState(1);

  const fetchHistoricalData = async () => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );

    const data = await res.json();

    setHistoricalData(data.prices);
  };

  React.useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  if (historicalData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" marginTop="2rem">
        <CircularProgress size={250} thickness={1} />
      </Box>
    );
  }

  return (
    <Box width={150} display="block" marginLeft="auto" marginRight="auto">
      <Box>
        <Line
          data={{
            labels: historicalData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;

              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicalData.map((coin) => coin[1]),
                label: `Price (Past ${days} Days) in USD`,
                borderColor: `${
                  price_change_percentage >= 0 ? "green" : "red"
                }`,
                borderWidth: 0.85,
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 0.1,
              },
            },
            scales: {
              x: {
                display: false,
              },
              y: {
                display: false,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },

            datalabels: {
              display: false,
            },
            events: [],
          }}
        />
      </Box>
    </Box>
  );
}
