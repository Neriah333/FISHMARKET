import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Footer from "../components/footer";
import Menu from "../components/Side";

export default function Dashboard() {
  return (
    <div>
      <div className="flex min-h-screen bg-gray-300">
        {/* Sidebar */}
        <Menu />

        {/* Right side: navbar, main, footer */}
        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="flex-1 p-4 ml-4 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Welcome to Fish Market for Cooperatives
            </h1>

            <h2 className="text-2xl font-bold mt-2 mb-2">Overview</h2>

            {/* Key Statistics Section - BELOW FIRST H2 */}
            <div className="grid grid-cols-4 gap-6 mb-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Fish Traded</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-teal-600">18,920 kg</p>
                  <p className="text-sm text-gray-500">Tracked over the past 12 months</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Market Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-teal-600">KES 410/kg</p>
                  <p className="text-sm text-gray-500">Across all fish types</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Most Traded Species</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-teal-600">Nile Perch</p>
                  <p className="text-sm text-gray-500">Represents 38% of volume</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Peak Trading Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-teal-600">6:00 AM – 10:00 AM</p>
                  <p className="text-sm text-gray-500">Based on transaction patterns</p>
                </CardContent>
              </Card>
            </div>

            {/* Second H2 stays below the cards */}
            <h2 className="text-2xl font-bold mb-4">Explore other fishermens work</h2>
            <Card className="w-100 h-50">
              <CardContent>
                
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
