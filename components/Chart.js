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

export default function CoinChart(props) {
  const { coin } = props;
  const [historicalData, setHistoricalData] = React.useState([]);
  const [days, setDays] = React.useState(1);

  const fetchHistoricalData = async () => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`
    );

    const data = await res.json();

    setHistoricalData(data.prices);
  };

  React.useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const handleClick = (event, newDays) => {
    setDays(newDays);
  };

  function dayOrDays() {
    if (days === 1) {
      return "Day";
    } else {
      return "Days";
    }
  }

  if (historicalData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" marginTop="2rem">
        <CircularProgress size={250} thickness={1} />
      </Box>
    );
  }

  return (
    <Box marginLeft="1.5rem" marginBottom="7rem" marginRight="1.5rem">
      <Box>
        <Line
          data={{
            labels: historicalData.map((coin) => {
              let date = new Date(coin[0]);
              let time = date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });
              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historicalData.map((coin) => coin[1]),
                label: `Price (Past ${days} ${dayOrDays()}) in USD`,
                borderColor: "white",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center" marginTop="1.5rem">
        <ToggleButtonGroup
          value={days}
          exclusive
          onChange={handleClick}
          aria-label="Number of Days"
          color="info"
          spacing={2}
        >
          {chartDays.map((day) => (
            <ToggleButton
              variant="outlined"
              key={day.value}
              onClick={() => setDays(day.value)}
              value={day.value}
              aria-label={day.label}
              sx={{
                "&.MuiButton-root": { color: "#FFFFFF" },
                border: "2px white solid",
                color: "#FFFFFF",
                fontWeight: "bold",
              }}
            >
              {day.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}
