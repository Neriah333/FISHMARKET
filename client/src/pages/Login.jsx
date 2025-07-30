import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // New: role selection
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password || !role) return alert("All fields required");

    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password, role });

      if (!res.data?.token) {
        alert("Login failed: No token received");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);

      // Redirect based on role
      if (role === "fisherman") {
        navigate("/dashboard");
      } else if (role === "admin") {
        navigate("/admin");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-xl animate-fade">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Log In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Select onValueChange={(value) => setRole(value)}>
            <SelectTrigger className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fisherman">Fisherman</SelectItem>
              <SelectItem value="admin">Cooperative Admin</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button onClick={handleLogin} disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </CardFooter>

        <p className="text-sm text-center text-zinc-600 dark:text-zinc-300 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </Card>
    </div>
  );
}
