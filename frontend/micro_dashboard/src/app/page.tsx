"use client";
import React from "react";
import AllChart from "@/components/charts/all-chart";
import DateRangeSelect from "@/components/date-range/date-range-select";
import ToggleDataChart from "@/components/toggle/toggle-data-chart";

export default function Home() {
  return (
    <div>
      <DateRangeSelect />
      <ToggleDataChart />
      <AllChart />
    </div>
  );
}
