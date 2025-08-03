import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import API from "../services/api";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!fullName || !email || !contact || !password || !confirmPassword || !role) {
      return alert("All fields are required");
    }
    if (password !== confirmPassword) return alert("Passwords do not match");

    setLoading(true);
    try {
      await API.post("/auth/signup", {
        fullname: fullName,
        email,
        contact,
        password,
        confirmPassword,
        role,
      });

      alert("Signup successful! Please log in.");
      navigate("/login"); // ✅ Redirect to login only
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-300 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-xl animate-fade-in">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Sign Up</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Contact Information" value={contact} onChange={(e) => setContact(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          <Select onValueChange={(value) => setRole(value)}>
            <SelectTrigger className="w-full h-10 rounded-md border px-3 py-2 text-sm shadow-sm">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fisherman">Fisherman</SelectItem>
              <SelectItem value="agent">Agent</SelectItem>
              <SelectItem value="admin">Cooperative Admin</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>

        <CardFooter>
          <Button onClick={handleSignup} className="w-full" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </CardFooter>

        <p className="text-sm text-center text-zinc-600 dark:text-zinc-300 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </Card>
    </div>
  );
}
