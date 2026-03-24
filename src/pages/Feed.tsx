import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, Plus, TrendingUp, Clock, Star } from "lucide-react";
import { useState } from "react";

const mockPosts = [
  {
    id: 1,
    author: "Aarav Sharma",
    avatar: "AS",
    time: "2h ago",
    title: "Won 1st place at DevHacks 2026! 🏆",
    content: "Incredible experience building an AI-powered accessibility tool with my team. 48 hours of pure adrenaline. Huge thanks to the organizers!",
    likes: 234,
    comments: 42,
    tags: ["hackathon", "ai", "accessibility"],
  },
  {
    id: 2,
    author: "Priya Patel",
    avatar: "PP",
    time: "5h ago",
    title: "Just completed AWS Solutions Architect cert ☁️",
    content: "After 3 months of preparation, finally passed! Here's my study roadmap for anyone interested.",
    likes: 189,
    comments: 31,
    tags: ["aws", "cloud", "certification"],
  },
  {
    id: 3,
    author: "Ravi Kumar",
    avatar: "RK",
    time: "1d ago",
    title: "Shipped my first open-source library 📦",
    content: "Published a React animation library with 500+ stars in the first week. Check it out on GitHub!",
    likes: 456,
    comments: 67,
    tags: ["opensource", "react", "animation"],
  },
];

const Feed = () => {
  const [activeTab, setActiveTab] = useState<"trending" | "latest">("trending");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
            <h1 className="font-display text-3xl font-bold">Feed</h1>
            <Button variant="hero" size="sm">
              <Plus className="w-4 h-4 mr-1" /> Post
            </Button>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeTab === "trending" ? "default" : "glass"}
              size="sm"
              onClick={() => setActiveTab("trending")}
            >
              <TrendingUp className="w-4 h-4 mr-1" /> Trending
            </Button>
            <Button
              variant={activeTab === "latest" ? "default" : "glass"}
              size="sm"
              onClick={() => setActiveTab("latest")}
            >
              <Clock className="w-4 h-4 mr-1" /> Latest
            </Button>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {mockPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {post.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>

                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.content}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <button className="flex items-center gap-1 text-sm hover:text-primary transition-colors">
                    <Heart className="w-4 h-4" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1 text-sm hover:text-primary transition-colors">
                    <MessageSquare className="w-4 h-4" /> {post.comments}
                  </button>
                  <button className="flex items-center gap-1 text-sm hover:text-primary transition-colors ml-auto">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-1 text-sm hover:text-secondary transition-colors">
                    <Star className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Feed;
