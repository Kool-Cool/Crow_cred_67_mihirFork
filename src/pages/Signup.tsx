import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { api } from "../lib/api";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.register({ name: `${firstName} ${lastName}`.trim(), email, password });
      if (data.token) {
        localStorage.setItem("crowdcred_token", data.token);
        navigate("/"); 
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden noise-bg">
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md glass-card rounded-2xl p-8 relative z-10">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">CrowdCred</span>
        </Link>

        <h1 className="font-display text-2xl font-bold text-center mb-2">Create your account</h1>
        <p className="text-center text-muted-foreground text-sm mb-6">Start building your credibility today</p>

        <form className="space-y-4" onSubmit={handleSignup}>
          {error && <div className="text-destructive text-sm text-center">{error}</div>}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Aarav" className="bg-muted border-border" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Sharma" className="bg-muted border-border" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="bg-muted border-border" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-muted border-border" required />
          </div>
          <Button variant="hero" className="w-full" size="lg" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
