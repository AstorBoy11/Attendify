"use client"; 

import React, { useState } from "react";
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const AttendifyDashboard: React.FC = () => {
  // State untuk mengontrol visibilitas sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-[#101922] font-sans text-white antialiased selection:bg-[#137fec]/30 min-h-screen">
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Main Content Area */}
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 lg:px-8">
          <div className="w-full max-w-4xl space-y-12">
            {/* Clock Section */}
            <div className="flex flex-col items-center text-center animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#283039] bg-[#1c2632] px-3 py-1 text-xs font-medium text-gray-400 shadow-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                </span>
                Live Time
              </div>
              <h1 className="mt-8 font-mono text-6xl font-bold tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-[7rem] leading-none variant-numeric:tabular-nums">
                12:00:01{" "}
                <span className="text-3xl sm:text-4xl md:text-5xl text-gray-400 font-normal align-top mt-2 sm:mt-4 inline-block">
                  A M
                </span>
              </h1>
              <h2 className="mt-4 text-lg font-medium text-gray-400">
                Thursday, 1 January 2026
              </h2>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-center w-full max-w-2xl mx-auto">
              <button className="group relative flex h-24 sm:h-20 w-full flex-1 items-center justify-center gap-5 sm:gap-4 overflow-hidden rounded-2xl bg-[#137fec] px-10 sm:px-8 shadow-xl shadow-[#137fec]/20 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#137fec]/30 active:scale-95">
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <span className="material-symbols-outlined text-5xl sm:text-4xl text-white">
                  login
                </span>
                <span className="text-xl pb-2 pt-2 sm:text-2xl font-bold text-white">Check In</span>
              </button>

              <button className="group relative flex h-24 sm:h-20 w-full flex-1 items-center justify-center gap-5 sm:gap-4 overflow-hidden rounded-2xl border border-[#283039] bg-[#1c2632] px-10 sm:px-8 transition-all hover:bg-[#232d3b] hover:border-gray-600 active:scale-95">
                <span className="material-symbols-outlined text-5xl sm:text-4xl text-gray-500">
                  logout
                </span>
                <span className="text-xl pb-2 pt-2 sm:text-2xl font-bold text-gray-200">
                  Check Out
                </span>
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {/* Monthly Summary Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-[#283039] bg-[#1c2632] p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#137fec]/10 text-[#137fec]">
                      <span className="material-symbols-outlined">
                        calendar_month
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">
                        Monthly Summary
                      </p>
                      <p className="text-xs text-gray-500">October 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-semibold text-green-400">
                    <span className="material-symbols-outlined text-[14px]">
                      trending_up
                    </span>
                    12%
                  </div>
                </div>
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">1,320</span>
                  <span className="text-sm font-medium text-gray-500">
                    / 1,600 mins
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-800">
                  <div className="absolute left-0 top-0 h-full w-[82.5%] rounded-full bg-[#137fec] transition-all duration-1000 ease-out"></div>
                </div>
                <div className="mt-2 flex justify-between text-xs font-medium text-gray-400">
                  <span>82.5% Complete</span>
                  <span>Target: 1,600</span>
                </div>
              </div>

              {/* Yearly Summary Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-[#283039] bg-[#1c2632] p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                      <span className="material-symbols-outlined">
                        donut_large
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">
                        Yearly Summary
                      </p>
                      <p className="text-xs text-gray-500">FY 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-semibold text-green-400">
                    <span className="material-symbols-outlined text-[14px]">
                      trending_up
                    </span>
                    5%
                  </div>
                </div>
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">15,400</span>
                  <span className="text-sm font-medium text-gray-500">
                    / 19,200 mins
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-800">
                  <div className="absolute left-0 top-0 h-full w-[80%] rounded-full bg-indigo-500 transition-all duration-1000 ease-out"></div>
                </div>
                <div className="mt-2 flex justify-between text-xs font-medium text-gray-400">
                  <span>80.2% Complete</span>
                  <span>Target: 19,200</span>
                </div>
              </div>
            </div>

            {/* Recent Activity (Bonus Section) */}
            <div className="rounded-2xl border border-[#283039] bg-[#1c2632]/50 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-gray-300">
                      Checked In
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">Today, 08:30 AM</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-gray-400"></div>
                    <span className="text-sm font-medium text-gray-300">
                      Checked Out
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    Yesterday, 05:45 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendifyDashboard;
