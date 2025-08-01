import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import API from "../services/api";
import Footer from "../components/Footer"; 


export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/contact", form); 
      alert("Message sent!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 px-4">
      {/* Static Info */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Contact Info:</h1>
        <div className="text-gray-600">
          <p>Email: <a href="mailto:fishmarket@gmail.com" className="text-blue-600">fishmarket@gmail.com</a></p>
          <p>Call us at: +254 940 409 80</p>
        </div>
      </div>

      {/* Contact Card Form */}
      <Card className="w-full max-w-md shadow-md bg-white">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <Textarea className="h-20"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Your message..."
                required
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Footer className="mt-10" />
    </div>
  );
}
