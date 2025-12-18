"use client";
import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function GenderDonutChart() {
  const options: ApexOptions = {
    chart: {
      type: "donut",
      height: 180,
      fontFamily: "Outfit, sans-serif",
    },
    labels: ["Boys", "Girls"],
    colors: ["#3B82F6", "#EC4899"],
    legend: {
      show: true,
      position: "bottom",
      fontSize: "12px",
      markers: {
      size: 10,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "64%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Students",
              fontSize: "12px",
              color: "white",
              formatter: () => "100%",
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
    stroke: {
      width: 0,
    },
  };

  const series = [55, 45]; 

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      height={300}
    />
  );
}
