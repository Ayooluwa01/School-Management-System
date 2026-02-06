"use client";
import React, { useState, useMemo } from "react";
import { 
  DollarSign, TrendingUp, Users, Calendar, Plus, 
  Search, Filter, Download, CheckCircle2, AlertCircle,
  Clock, CreditCard, Wallet, PieChart, BarChart3,
  Receipt, Edit, Trash2, Eye, X, FileText, Inbox,
  TrendingDown, Activity, ArrowUpRight, ArrowDownRight,
  Hash, LayoutGrid, BookOpen
} from "lucide-react";

const mockFeeTypes = [
  { fee_type_id: 1, name: "Tuition Fee", amount: 150000, school_id: "SCH001" },
  { fee_type_id: 2, name: "Sport Levy", amount: 5000, school_id: "SCH001" },
  { fee_type_id: 3, name: "Laboratory Fee", amount: 10000, school_id: "SCH001" },
  { fee_type_id: 4, name: "Library Fee", amount: 3000, school_id: "SCH001" },
  { fee_type_id: 5, name: "ICT Fee", amount: 15000, school_id: "SCH001" },
];

const mockPayments = [
  { id: 1, student_name: "John Doe", student_id: "STU001", class: "JSS 1A", amount_paid: 150000, amount_due: 183000, status: "Partial", date: "2024-01-15" },
  { id: 2, student_name: "Jane Smith", student_id: "STU002", class: "JSS 2B", amount_paid: 183000, amount_due: 183000, status: "Paid", date: "2024-01-20" },
  { id: 3, student_name: "Mike Johnson", student_id: "STU003", class: "JSS 1A", amount_paid: 100000, amount_due: 183000, status: "Partial", date: "2024-01-18" },
  { id: 4, student_name: "Sarah Williams", student_id: "STU004", class: "JSS 3C", amount_paid: 0, amount_due: 183000, status: "Unpaid", date: "2024-01-10" },
  { id: 5, student_name: "David Brown", student_id: "STU005", class: "JSS 2A", amount_paid: 183000, amount_due: 183000, status: "Paid", date: "2024-01-25" },
];

// --- COMPONENTS ---

const TabItem = React.memo(({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    type="button"
    className={`px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-sm font-bold transition-all duration-200 border-b-2 relative ${
      active ? "border-indigo-600 text-indigo-900" : "border-transparent text-zinc-400 hover:text-zinc-600"
    }`}
  >
    {label}
    {active && <span className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-indigo-600" />}
  </button>
));
TabItem.displayName = "TabItem";

const SectionHeader = React.memo(({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
  <div className="mb-6 md:mb-8">
    <div className="flex items-start gap-3 md:gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center text-indigo-600 border border-indigo-100/50 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-base md:text-lg font-bold text-zinc-900 mb-1">{title}</h2>
        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  </div>
));
SectionHeader.displayName = "SectionHeader";

const MetricCard = React.memo(({ icon, label, value, gradient, subtitle }: any) => (
  <div className="relative overflow-hidden bg-white p-4 md:p-5 rounded-2xl border border-zinc-200 hover:border-indigo-200 transition-all group">
    <div className={`absolute top-0 right-0 w-32 h-32 ${gradient} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity`}></div>
    <div className="relative flex items-center gap-3 md:gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-xl md:text-2xl font-bold text-zinc-900 leading-none mb-1">{value}</p>
        {subtitle && <p className="text-[10px] font-medium text-zinc-500">{subtitle}</p>}
      </div>
    </div>
  </div>
));
MetricCard.displayName = "MetricCard";

const InputGroup = React.memo(({ label, value, onChange, placeholder, type = "text", options }: any) => (
  <div className="space-y-1.5">
    <label className="text-[10px] md:text-xs font-semibold text-zinc-500 uppercase tracking-wide pl-0.5">
      {label}
    </label>
    <div className="relative group">
      {type === "select" ? (
        <select 
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg bg-zinc-50/50 border border-zinc-200 text-zinc-800 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer"
        >
          <option value="">Select {label}</option>
          {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input 
          type={type} 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder}
          className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg bg-zinc-50/50 border border-zinc-200 text-zinc-800 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all placeholder:text-zinc-300" 
        />
      )}
    </div>
  </div>
));
InputGroup.displayName = "InputGroup";

const EmptyState = React.memo(({ title, description, icon }: any) => (
  <div className="flex flex-col items-center justify-center py-16 md:py-20 px-4">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-indigo-100 rounded-full blur-2xl opacity-20"></div>
      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 flex items-center justify-center text-indigo-400">
        {icon}
      </div>
    </div>
    <h3 className="text-base md:text-lg font-bold text-zinc-900 mb-2">{title}</h3>
    <p className="text-xs md:text-sm text-zinc-500 mb-6 max-w-sm text-center leading-relaxed">{description}</p>
  </div>
));
EmptyState.displayName = "EmptyState";

export default function FeesPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Paid" | "Partial" | "Unpaid">("All");
  const [showAddFeeModal, setShowAddFeeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [feeFormData, setFeeFormData] = useState({ name: "", amount: "" });
  const [paymentFormData, setPaymentFormData] = useState({ student_id: "", amount: "", method: "", reference: "" });

  // Calculate statistics
  const stats = useMemo(() => {
    const totalFeeTypes = mockFeeTypes.reduce((sum, fee) => sum + fee.amount, 0);
    const totalCollected = mockPayments.reduce((sum, payment) => sum + payment.amount_paid, 0);
    const totalOutstanding = mockPayments.reduce((sum, payment) => sum + (payment.amount_due - payment.amount_paid), 0);
    const totalExpected = mockPayments.reduce((sum, payment) => sum + payment.amount_due, 0);
    const totalStudents = mockPayments.length;
    const paidStudents = mockPayments.filter(p => p.status === "Paid").length;
    const partialStudents = mockPayments.filter(p => p.status === "Partial").length;
    const unpaidStudents = mockPayments.filter(p => p.status === "Unpaid").length;
    const collectionRate = ((totalCollected / totalExpected) * 100).toFixed(1);
    const avgPaymentPerStudent = totalCollected / totalStudents;
    
    return {
      totalFeeTypes,
      totalCollected,
      totalOutstanding,
      totalExpected,
      totalStudents,
      paidStudents,
      partialStudents,
      unpaidStudents,
      collectionRate,
      avgPaymentPerStudent
    };
  }, []);

  // Filter payments
  const filteredPayments = useMemo(() => {
    return mockPayments.filter(payment => {
      const matchesSearch = payment.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.class.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || payment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const handleCreateFee = () => {
    // Add your API call here
    console.log("Creating fee:", feeFormData);
    setShowAddFeeModal(false);
    setFeeFormData({ name: "", amount: "" });
  };

  const handleRecordPayment = () => {
    // Add your API call here
    console.log("Recording payment:", paymentFormData);
    setShowPaymentModal(false);
    setPaymentFormData({ student_id: "", amount: "", method: "", reference: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20 text-zinc-900 font-sans selection:bg-indigo-100">
      
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-600 rounded-lg blur-md opacity-20"></div>
              <div className="relative w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-sm md:text-base">
                <DollarSign size={18} className="md:hidden" />
                <span className="hidden md:inline">FM</span>
              </div>
            </div>
            <div>
              <h1 className="text-sm md:text-base font-bold text-zinc-900 tracking-tight leading-none">Fee Manager</h1>
              <p className="text-[10px] md:text-xs font-medium text-zinc-500 pt-0.5 hidden sm:block">Financial Tracking</p>
            </div>
          </div>
          <button 
            onClick={() => setShowPaymentModal(true)}
            className="px-3 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-xs md:text-sm font-semibold hover:from-indigo-700 hover:to-indigo-800 active:scale-95 transition-all flex items-center gap-1.5 md:gap-2 rounded-lg"
          >
            <Plus size={16} /> <span className="hidden sm:inline">Quick Payment</span><span className="sm:hidden">Pay</span>
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide">
          <TabItem active={activeSection === "overview"} label="Overview" onClick={() => setActiveSection("overview")} />
          <TabItem active={activeSection === "create-fee"} label="Create Fee" onClick={() => setActiveSection("create-fee")} />
          <TabItem active={activeSection === "make-payment"} label="Make Payment" onClick={() => setActiveSection("make-payment")} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-10">
        <main className="min-h-[400px]">

          {/* SECTION: OVERVIEW */}
          {activeSection === 'overview' && (
            <section className="animate-in fade-in duration-500">
              <SectionHeader 
                icon={<LayoutGrid size={20}/>} 
                title="Financial Summary" 
                subtitle="Overview of fee collection, outstanding payments, and financial metrics." 
              />
              
              {mockFeeTypes.length === 0 ? (
                <EmptyState 
                  icon={<Wallet size={32} />}
                  title="No Fee Types Yet"
                  description="Start by creating fee types to track student payments effectively."
                />
              ) : (
                <div className="space-y-4 md:space-y-5">
                  {/* Primary Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    <MetricCard 
                      icon={<DollarSign size={18}/>} 
                      label="Total Expected" 
                      value={`₦${stats.totalExpected.toLocaleString()}`}
                      subtitle={`${stats.totalStudents} Students`}
                      gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
                    />
                    <MetricCard 
                      icon={<TrendingUp size={18}/>} 
                      label="Total Collected" 
                      value={`₦${stats.totalCollected.toLocaleString()}`}
                      subtitle={`${stats.collectionRate}% Collection Rate`}
                      gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
                    />
                    <MetricCard 
                      icon={<AlertCircle size={18}/>} 
                      label="Outstanding" 
                      value={`₦${stats.totalOutstanding.toLocaleString()}`}
                      subtitle={`${stats.partialStudents + stats.unpaidStudents} Students Owing`}
                      gradient="bg-gradient-to-br from-orange-500 to-red-500"
                    />
                    <MetricCard 
                      icon={<Users size={18}/>} 
                      label="Avg per Student" 
                      value={`₦${Math.round(stats.avgPaymentPerStudent).toLocaleString()}`}
                      subtitle={`${stats.paidStudents} Fully Paid`}
                      gradient="bg-gradient-to-br from-purple-500 to-pink-500"
                    />
                  </div>

                  {/* Secondary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                    <MetricCard 
                      icon={<CheckCircle2 size={18}/>} 
                      label="Fully Paid" 
                      value={`${stats.paidStudents} Students`}
                      subtitle={`${((stats.paidStudents / stats.totalStudents) * 100).toFixed(1)}% of total`}
                      gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
                    />
                    <MetricCard 
                      icon={<Clock size={18}/>} 
                      label="Partial Payment" 
                      value={`${stats.partialStudents} Students`}
                      subtitle={`${((stats.partialStudents / stats.totalStudents) * 100).toFixed(1)}% of total`}
                      gradient="bg-gradient-to-br from-amber-500 to-orange-500"
                    />
                    <MetricCard 
                      icon={<AlertCircle size={18}/>} 
                      label="Not Paid" 
                      value={`${stats.unpaidStudents} Students`}
                      subtitle={`${((stats.unpaidStudents / stats.totalStudents) * 100).toFixed(1)}% of total`}
                      gradient="bg-gradient-to-br from-red-500 to-rose-500"
                    />
                  </div>

                  {/* Fee Types List */}
                  <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden mt-6">
                    <div className="p-4 md:p-5 border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-slate-50">
                      <h3 className="font-bold text-sm text-zinc-900">Active Fee Types</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">Current fee structure per student</p>
                    </div>
                    <div className="divide-y divide-zinc-100">
                      {mockFeeTypes.map((fee, index) => (
                        <div key={fee.fee_type_id} className="p-4 md:p-5 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xs">
                              {index + 1}
                            </div>
                            <span className="font-bold text-sm text-zinc-800">{fee.name}</span>
                          </div>
                          <span className="font-bold text-sm text-indigo-600">₦{fee.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 md:p-5 bg-indigo-50 border-t-2 border-indigo-200 flex items-center justify-between">
                      <span className="font-bold text-sm text-zinc-900 uppercase">Total Fees Per Student</span>
                      <span className="font-bold text-lg text-indigo-600">₦{stats.totalFeeTypes.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* SECTION: CREATE FEE */}
          {activeSection === 'create-fee' && (
            <section className="animate-in fade-in duration-500">
              <SectionHeader 
                icon={<Wallet size={20}/>} 
                title="Create Fee Type" 
                subtitle="Define new fee categories for student billing." 
              />
              
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 max-w-2xl">
                <div className="space-y-4 md:space-y-5">
                  <InputGroup 
                    label="Fee Name" 
                    value={feeFormData.name}
                    onChange={(e: any) => setFeeFormData({...feeFormData, name: e.target.value})}
                    placeholder="e.g., Tuition Fee, Sport Levy" 
                  />
                  <InputGroup 
                    label="Amount (₦)" 
                    type="number"
                    value={feeFormData.amount}
                    onChange={(e: any) => setFeeFormData({...feeFormData, amount: e.target.value})}
                    placeholder="0.00" 
                  />
                  
                  {/* Fee Types List */}
                  {mockFeeTypes.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-zinc-200">
                      <h3 className="font-bold text-sm text-zinc-900 mb-4">Existing Fee Types</h3>
                      <div className="space-y-2">
                        {mockFeeTypes.map((fee) => (
                          <div key={fee.fee_type_id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                            <span className="text-sm font-medium text-zinc-700">{fee.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-sm text-indigo-600">₦{fee.amount.toLocaleString()}</span>
                              <div className="flex gap-1">
                                <button className="p-1.5 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-all">
                                  <Edit size={14} />
                                </button>
                                <button className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded transition-all">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={handleCreateFee}
                    disabled={!feeFormData.name || !feeFormData.amount}
                    className="w-full py-3 md:py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-bold text-xs md:text-sm hover:from-indigo-700 hover:to-indigo-800 transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    Create Fee Type <Plus size={16} />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* SECTION: MAKE PAYMENT */}
          {activeSection === 'make-payment' && (
            <section className="animate-in fade-in duration-500">
              <SectionHeader 
                icon={<CreditCard size={20}/>} 
                title="Record Payment" 
                subtitle="Record student fee payments and track transactions." 
              />
              
              {/* Search Student */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 max-w-2xl mb-6">
                <h3 className="font-bold text-sm text-zinc-900 mb-4">Find Student</h3>
                <div className="mb-5 md:mb-6 relative">
                  <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by student name, ID, or class..." 
                    className="w-full pl-9 md:pl-11 pr-3 md:pr-4 py-2.5 md:py-3 bg-zinc-50/50 border border-zinc-200 rounded-lg text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2 mb-4 overflow-x-auto">
                  {["All", "Paid", "Partial", "Unpaid"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status as any)}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all rounded-lg whitespace-nowrap ${
                        statusFilter === status
                          ? 'bg-indigo-600 text-white'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                {/* Student List */}
                {filteredPayments.length === 0 ? (
                  <EmptyState 
                    icon={<Users size={32} />}
                    title="No Students Found"
                    description="Try adjusting your search or filter criteria."
                  />
                ) : (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {filteredPayments.map((payment) => {
                      const balance = payment.amount_due - payment.amount_paid;
                      return (
                        <div 
                          key={payment.id} 
                          onClick={() => {
                            setSelectedStudent(payment);
                            setShowPaymentModal(true);
                          }}
                          className="p-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl cursor-pointer transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-bold text-sm text-zinc-800">{payment.student_name}</p>
                              <p className="text-[10px] font-medium text-zinc-500">{payment.student_id} • {payment.class}</p>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold text-sm ${balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                ₦{balance.toLocaleString()}
                              </p>
                              <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                                payment.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                                payment.status === 'Partial' ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {payment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          )}

        </main>
      </div>

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 md:p-8 border border-zinc-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <div>
                <h2 className="text-base md:text-lg font-bold text-zinc-900">Record Payment</h2>
                <p className="text-[10px] text-zinc-500 mt-0.5">Process student fee payment</p>
              </div>
              <button 
                onClick={() => setShowPaymentModal(false)} 
                className="text-zinc-400 hover:text-zinc-900 bg-zinc-50 p-1.5 rounded-lg transition-colors"
              >
                <X size={18}/>
              </button>
            </div>

            {selectedStudent && (
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-5">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Student Information</p>
                <p className="font-bold text-sm text-zinc-900">{selectedStudent.student_name}</p>
                <p className="text-[10px] font-medium text-zinc-500">{selectedStudent.student_id} • {selectedStudent.class}</p>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-[9px] font-bold text-red-600 uppercase tracking-wider mb-1">Outstanding</p>
                    <p className="font-bold text-lg text-red-700">₦{(selectedStudent.amount_due - selectedStudent.amount_paid).toLocaleString()}</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Already Paid</p>
                    <p className="font-bold text-lg text-emerald-700">₦{selectedStudent.amount_paid.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4 md:space-y-5">
              <InputGroup 
                label="Amount Paying (₦)" 
                type="number"
                value={paymentFormData.amount}
                onChange={(e: any) => setPaymentFormData({...paymentFormData, amount: e.target.value})}
                placeholder="0.00" 
              />
              <InputGroup 
                label="Payment Method" 
                type="select"
                options={["Cash", "Bank Transfer", "POS", "Online"]}
                value={paymentFormData.method}
                onChange={(e: any) => setPaymentFormData({...paymentFormData, method: e.target.value})}
              />
              <InputGroup 
                label="Reference Number" 
                value={paymentFormData.reference}
                onChange={(e: any) => setPaymentFormData({...paymentFormData, reference: e.target.value})}
                placeholder="Optional" 
              />
              
              <button 
                onClick={handleRecordPayment}
                disabled={!paymentFormData.amount || !paymentFormData.method}
                className="w-full py-3 md:py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-bold text-xs md:text-sm hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                Record Payment <CreditCard size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}