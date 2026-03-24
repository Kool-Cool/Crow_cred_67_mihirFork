import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Users, Trophy, Flame } from "lucide-react";

const stats = [
  { icon: Users, value: "10K+", label: "Creators" },
  { icon: Trophy, value: "5K+", label: "Achievements" },
  { icon: Flame, value: "1.2M", label: "Interactions" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-secondary/8 rounded-full blur-[80px] animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(190 100% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(190 100% 50% / 0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Build your credibility. Stand out from the crowd.</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Your{" "}
            <span className="text-gradient-primary">Achievements</span>
            <br />
            Deserve a{" "}
            <span className="text-gradient-warm">Stage</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Showcase projects, earn credibility, upskill with courses, land jobs, and compete in hackathons — all in one platform built for builders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/signup">
              <Button variant="hero" size="lg" className="text-base px-8 py-6">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Link to="/feed">
              <Button variant="glass" size="lg" className="text-base px-8 py-6">
                Explore Feed
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex justify-center gap-8 sm:gap-16 mt-16"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <span className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                    {stat.value}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
