"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
} from "chart.js";
import { hslToHex, hexToRGB } from "@/lib/utils";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
export interface iOptions {
  responsive: boolean;
  plugins: object;
  maintainAspectRatio: boolean;
}
const PieChart = ({ height = 350, data, options }: {height?: number, data?: ChartData<"pie", number[], string>, options?: iOptions}) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  const hslPrimary = `hsla(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`;
  const hslInfo = `hsla(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info})`;
  const hslWarning = `hsla(${theme?.cssVars[mode === "dark" ? "dark" : "light"].warning})`;
  const hslSuccess = `hsla(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success})`;

  const rgbPrimay = hexToRGB(hslToHex(hslPrimary), 0.5);
  const rgbInfo = hexToRGB(hslToHex(hslInfo), 0.5);
  const rgbWarning = hexToRGB(hslToHex(hslWarning), 0.5);
  const rgbSuccess = hexToRGB(hslToHex(hslSuccess), 0.5);

  const defaultData: ChartData<"pie", number[], string> = {
    labels: ["Primary", "Info", "Warning", "Success"],
    datasets: [
      {
        label: "Dataset 1",
        data: [20, 50, 60, 70],
        backgroundColor: [rgbPrimay, rgbInfo, rgbWarning, rgbSuccess],
      },
    ],
  };
  const defaultOptions: iOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: `hsl(${theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
            })`,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Pie
        options={options || defaultOptions}
        data={data || defaultData}
        height={height}
      />
    </div>
  );
};

export default PieChart;
