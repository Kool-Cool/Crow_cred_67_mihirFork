import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Flame, Heart, Award, BookOpen, MapPin, Link as LinkIcon, Edit, Star } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground shrink-0">
              AS
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-display text-2xl font-bold">Aarav Sharma</h1>
                  <p className="text-muted-foreground text-sm">Full-Stack Developer & Open Source Enthusiast</p>
                </div>
                <Button variant="glass" size="sm"><Edit className="w-4 h-4 mr-1" /> Edit</Button>
              </div>
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Bangalore, India</span>
                <span className="flex items-center gap-1"><LinkIcon className="w-3 h-3" /> github.com/aarav</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {["React", "TypeScript", "Node.js", "AWS", "Python"].map(skill => (
                  <span key={skill} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            {[
              { icon: Heart, label: "Total Likes", value: "2,340", color: "text-primary" },
              { icon: Award, label: "Posts", value: "67", color: "text-accent" },
              { icon: Flame, label: "Day Streak", value: "45", color: "text-secondary" },
              { icon: BookOpen, label: "Courses", value: "8", color: "text-primary" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                <p className="font-display font-bold text-lg">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-display text-xl font-bold mb-4">Recent Achievements</h2>
          <div className="space-y-3">
            {[
              { title: "Won 1st at DevHacks 2026 🏆", date: "Feb 2026", likes: 234 },
              { title: "AWS Solutions Architect Certified ☁️", date: "Jan 2026", likes: 189 },
              { title: "Published React Animation Library 📦", date: "Dec 2025", likes: 456 },
            ].map((ach, i) => (
              <div key={i} className="glass-card rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold text-sm">{ach.title}</p>
                  <p className="text-xs text-muted-foreground">{ach.date}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-primary">
                  <Heart className="w-4 h-4" /> {ach.likes}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Enrolled Courses */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8">
          <h2 className="font-display text-xl font-bold mb-4">Enrolled Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "System Design Masterclass", progress: 72, rating: 4.9 },
              { title: "AI & ML Fundamentals", progress: 45, rating: 4.7 },
            ].map((course, i) => (
              <div key={i} className="glass-card rounded-xl p-4">
                <p className="font-display font-semibold text-sm mb-2">{course.title}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Star className="w-3 h-3 text-secondary" /> {course.rating}
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-primary rounded-full" style={{ width: `${course.progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{course.progress}% complete</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
