import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-700 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-blue mb-6">
          About Fish Market for Cooperatives
        </h1>

        <p className="text-center text-gray-700 mb-10">
          Empowering local fishermen with tools to manage, market, and grow their fish businesses.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md bg-white">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We aim to streamline operations for fish cooperatives by providing a digital platform
                that helps manage inventory, track sales, and improve transparency in the fish supply chain.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md bg-white">
            <CardHeader>
              <CardTitle>Why We Exist</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Many lakeside cooperatives struggle with manual records and lack of access to real-time data.
                Our platform bridges that gap through simple, accessible technology.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md bg-white">
            <CardHeader>
              <CardTitle>Who We Help</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Fishermen, cooperative managers, suppliers, and buyers — all benefit from more accurate
                records, smarter decisions, and better access to market data.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md bg-white">
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                A connected ecosystem of fish cooperatives across Kenya and beyond, thriving through
                data, collaboration, and technology.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
