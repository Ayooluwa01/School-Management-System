import Calendar from "@/components/calendar/Calendar";
import GenderDonutChart from "@/components/charts/bar/BarChartOne";
import GenderPercentageChart from "@/components/charts/bar/BarChartOne";
import ComponentCard from "@/components/common/ComponentCard";
import FinancialOverview from "@/components/common/FinancialOverview";
import NotificationsPanel from "@/components/common/Notification";
import TopStudentsList from "@/components/common/Topstudents";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-3">

      {/* ===== TOP ROW ===== */}
      <div className="col-span-12 grid grid-cols-12 gap-2">

        {/* Welcome + Gender Split */}
        <div className="col-span-12 xl:col-span-5 space-y-3 dark:bg-gray">
          <ComponentCard title="Welcome">
            <p className="text-sm text-gray-600 dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </ComponentCard>
          
{/* Notification */}
          <div>
<NotificationsPanel />
          </div>
        </div>

        {/* Population KPIs */}
        <div className="col-span-12 xl:col-span-3 grid grid-cols-1 gap-2">

          <div className="flex justify-between items-center bg-blue-50 px-3 py-2 rounded-lg min-h-[52px]">
            <span className="text-xs font-medium text-blue-700">Students</span>
            <span className="text-lg font-semibold text-blue-900">5,909</span>
          </div>

          <div className="flex justify-between items-center bg-green-50 px-3 py-2 rounded-lg min-h-[52px]">
            <span className="text-xs font-medium text-green-700">Teachers</span>
            <span className="text-lg font-semibold text-green-900">60</span>
          </div>

          <div className="flex justify-between items-center bg-purple-50 px-3 py-2 rounded-lg min-h-[52px]">
            <span className="text-xs font-medium text-purple-700">Staffs</span>
            <span className="text-lg font-semibold text-purple-900">65</span>
          </div>

        </div>

  {/* Students Gender Split */}
            <div className="mt-4 col-span-12 xl:col-span-4">
              <p className="text-xs font-medium text-gray-500 mb-2 text-center">
                Population
              </p>

              <div >
    <GenderDonutChart />

              </div>
            </div>
  
      </div>


      {/* Second Row */}
<div className="col-span-12 grid grid-cols-12 gap-2 ">
        <div className="col-span-12 xl:col-span-7 space-y-3">
  <TopStudentsList />
</div>
<div className="col-span-12 xl:col-span-5"><FinancialOverview /></div>
</div>
 
    </div>
  );
}
