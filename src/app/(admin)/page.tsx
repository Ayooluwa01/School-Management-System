import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/common/Financialchart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import ComponentCard from "@/components/common/ComponentCard";

export const metadata: Metadata = {
  title:
    "School Management System",
  description: "Dashboard",
};



export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
  <ComponentCard title={"Welcome"} children={<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quis numquam ducimus voluptatum error voluptas vitae. Temporibus ducimus suscipit, ut maiores dolores rem consequatur sunt impedit saepe possimus id minima?</div>} />
    </div>
  );
}
