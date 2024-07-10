"use client"

import BasicBar from "@/components/(chart)/(chart-js)/charts-chartjs-bar/basic-bar";
import PieChart from "@/components/(chart)/(chart-js)/charts-chartjs-other/pie-chart";
import DashboardSelect from "@/components/dasboard-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { themes } from "@/config/thems";
import { cn, hexToRGB, hslToHex } from "@/lib/utils";
import { useThemeStore } from "@/store";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChartData } from "chart.js";
import { useTheme } from "next-themes";

export default function Dashboard() {
    const { theme: config, setTheme: setConfig } = useThemeStore();
    const { theme: mode } = useTheme();
  
    const theme = themes.find((theme) => theme.name === config);
  
    const hslColor1 = `hsla(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info
      })`;
    const hslColor2 = `hsla(${theme?.cssVars[mode === "dark" ? "dark" : "light"].warning
      })`;
  
    const hexColor1 = hslToHex(hslColor1);
    const hexColor2 = hslToHex(hslColor2);
    const data:ChartData<"bar", number[], string> = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Active Users",
            data: [35, 59, 80, 81, 56, 55, 40],
            backgroundColor: hexToRGB(hexColor1, 0.3),
            borderColor: hexToRGB(hexColor1, .3),
            borderWidth: 1,
            borderRadius: 0,
            borderSkipped: "bottom",
            barThickness: 25,
          },
          {
            label: "Online Users",
            data: [24, 42, 40, 19, 86, 27, 90],
            backgroundColor: hexToRGB(hexColor1, 1),
            borderColor: hexToRGB(hexColor1, 1),
    
            borderWidth: 1,
            borderRadius:0,
            borderSkipped: "bottom",
            barThickness: 25,
          },
        ],
      };
    const usersStats = [
    {
        value: "all",
        text: "all user",
        total: "10,234",
        color: "primary",
    },
    {
        value: "onlineUsers",
        text: "Online Users",
        total: "536",
        color: "warning",
    },
    {
        value: "activeUsers",
        text: "Active Users",
        total: "21",
        color: "success",
    },
    {
        value: "expiredUsers",
        text: "Expired Users",
        total: "3321",
        color: "info",
    },
    {
        value: "expiringToday",
        text: "Expiring Today",
        total: "10,234",
        color: "primary",
    },
    {
        value: "aboutToExpire",
        text: "About to Expire",
        total: "536",
        color: "warning",
    },
    {
        value: "onlinefup",
        text: "Online FUP",
        total: "21",
        color: "success",
    },
    {
        value: "managers",
        text: "Managers",
        total: "3321",
        color: "info",
    },
    ];
    const financeStats = [
    {
        value: "balance",
        text: "Balance",
        total: "$ -2,011,721.00",
        color: "primary",
    },
    {
        value: "rewardPoints",
        text: "Reward Points",
        total: "536",
        color: "warning",
    },
    {
        value: "activationsToday",
        text: "Activations Today",
        total: "21",
        color: "success",
    },
    {
        value: "registrationsToday",
        text: "Registrations Today",
        total: "3321",
        color: "info",
    },
    {
        value: "outstandingDebts",
        text: "Outstanding Debts",
        total: "$10,234",
        color: "primary",
    },
    {
        value: "outstandingClaims",
        text: "Outstanding Claims",
        total: "$536",
        color: "warning",
    },
    ];
    const healthStats = [
    {
        value: "uptime",
        text: "Uptime",
        total: "885 days 16 hours 31 min",
        color: "primary",
    },
    {
        value: "backupDisk",
        text: "Backup Disk",
        total: "None, using system disk",
        color: "warning",
    },
    {
        value: "networkStatus",
        text: "Network Status",
        total: "Internet Reachable",
        color: "success",
    },
    {
        value: "databaseTime",
        text: "Database Time",
        total: "2024-07-09 15:42:50",
        color: "info",
    },
    {
        value: "outstandingDebts",
        text: "Time Zone",
        total: "Asia/Baghdad ",
        color: "primary",
    },
    {
        value: "outstandingClaims",
        text: "Outstanding Claims",
        total: "$536",
        color: "warning",
    },
    {
        value: "outstandingClaims",
        text: "Outstanding Claims",
        total: "$536",
        color: "warning",
    },
    ];
    const piesData = [
        {
            labels: ["CPU Load"],
            datasets: [
                {
                    label: "CPU Load",
                    data: [10, 90],
                    backgroundColor: [hexColor1, hexToRGB(hexColor1, .1)],
                },
            ],
        },
        {
        labels: ["Memory Usage"],
        datasets: [
          {
            label: "Memory Usage",
            data: [70, 30],
            backgroundColor: [hexColor2, hexToRGB(hexColor2, .1)],
          },
        ],
        },
        {
        labels: ["Disk Usage"],
        datasets: [
          {
            label: "Disk Usage",
            data: [30, 70],
            backgroundColor: [hexColor1, hexToRGB(hexColor1, .1)],
          },
        ],
      },
    ];
    return (
    <div>
        <div className="grid xl:grid-cols-2  grid-cols-1 gap-6">
            <Card>
                <CardHeader className="border-none pb-0">
                    <div className="flex items-center gap-2 flex-wrap ">
                    <div className="flex-1">
                        <div className="text-xl font-semibold text-default-900 whitespace-nowrap">
                        Subscribers
                        </div>
                    </div>
                    <div className="flex-none">
                        <DashboardSelect />
                    </div>
                    </div>
                </CardHeader>
                <CardContent className="p-1 md:p-5">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 justify-start w-full bg-transparent h-full">
                        {usersStats.map((item, index) => (
                        <div
                            key={`report-trigger-${index}`}
                            className={cn(
                            "flex flex-col gap-1.5 p-4 overflow-hidden   items-start  relative before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-1 before:h-[2px] before:w-9 before:bg-primary/50 dark:before:bg-primary-foreground before:hidden data-[state=active]:shadow-none data-[state=active]:before:block",
                            {
                                "bg-primary/30 data-[state=active]:bg-primary/30 dark:bg-primary/70": item.color === "primary",
                                "bg-orange-50 data-[state=active]:bg-orange-50 dark:bg-orange-500": item.color === "warning",
                                "bg-green-50 data-[state=active]:bg-green-50 dark:bg-green-500": item.color === "success",
                                "bg-cyan-50 data-[state=active]:bg-cyan-50 dark:bg-cyan-500 ": item.color === "info",
                            }
                            )}
                        >
                            <span
                            className={cn(
                                "h-10 w-10 rounded-full bg-primary/40 absolute -top-3 -right-3 ring-8 ring-primary/30",
                                {
                                "bg-primary/50  ring-primary/20 dark:bg-primary dark:ring-primary/40": item.color === "primary",
                                "bg-orange-200 ring-orange-100 dark:bg-orange-300 dark:ring-orange-400": item.color === "warning",
                                "bg-green-200 ring-green-100 dark:bg-green-300 dark:ring-green-400": item.color === "success",
                                "bg-cyan-200 ring-cyan-100 dark:bg-cyan-300 dark:ring-cyan-400": item.color === "info",
                                }
                            )}
                            ></span>
                            <span className="text-sm text-default-800 dark:text-primary-foreground font-semibold capitalize relative z-10">
                            {" "}
                            {item.text}
                            </span>
                            <span className={`text-lg font-semibold text-${item.color}/80 dark:text-primary-foreground`}>
                            {item.total}
                            </span>
                        </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Online Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <BasicBar data={data} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="mb-0">
                <div className="flex flex-wrap items-center gap-3">
                    <CardTitle className="flex-1 whitespace-nowrap">
                    Finance & Sales
                    </CardTitle>
                    <div className="flex-none">
                    <DashboardSelect />
                    </div>
                </div>
                </CardHeader>
                <CardContent className="px-0 pt-0 h-full pb-2">
                    <ScrollArea className="h-full">
                    {
                        financeStats.map((item, index) => (
                        <li
                            className={`flex justify-between items-center gap-2  py-3 px-6 hover:bg-default-50 
                                ${index < financeStats.length - 1 ? "border-b border-default-300" : ""}`}
                            key={`top-sell-${index}`}
                        >
                            <div className="flex items-center gap-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium text-default-700"> {item.text}</span>
                            </div>
                            </div>
                            <span className="text-xs text-default-600">{item.total}</span>
                        </li>
                        ))
                    }
                    </ScrollArea>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="mb-0">
                <div className="flex flex-wrap items-center gap-3">
                    <CardTitle className="flex-1 whitespace-nowrap">
                    System Health
                    </CardTitle>
                    <div className="flex-none">
                    <DashboardSelect />
                    </div>
                </div>
                </CardHeader>
                <CardContent className="px-0 pt-0 h-full pb-2">
                    <ScrollArea className="h-full">
                    {
                        healthStats.map((item, index) => (
                        <li
                            className={`flex justify-between items-center gap-2  py-3 px-6 hover:bg-default-50 
                                ${index < healthStats.length - 1 ? "border-b border-default-300" : ""}`}
                            key={`top-sell-${index}`}
                        >
                            <div className="flex items-center gap-3">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium text-default-700"> {item.text}</span>
                            </div>
                            </div>
                            <span className="text-xs text-default-600">{item.total}</span>
                        </li>
                        ))
                    }
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
        <div className="grid xl:grid-cols-3  grid-cols-1 gap-6">
            {
                piesData.map((item, index) => (
                    <Card key={`pie-${index}`} className="mt-6">
                        <PieChart data={item} />
                    </Card>
                ))
            }
        </div>
    </div>
    );
}